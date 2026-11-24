import { NextResponse, type NextRequest } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 15;

type Tier = 'monthly' | 'lifetime' | 'agency';

function isTier(value: unknown): value is Tier {
  return value === 'monthly' || value === 'lifetime' || value === 'agency';
}

/**
 * Récupère current_period_end de manière robuste.
 * Stripe a migré ce champ de subscription top-level vers subscription.items[0].
 * On essaie les deux pour rester compatible avec les versions d'API futures.
 */
function getPeriodEnd(sub: Stripe.Subscription): number | null {
  const itemPeriodEnd = sub.items?.data?.[0] as
    | { current_period_end?: number }
    | undefined;
  if (itemPeriodEnd?.current_period_end) {
    return itemPeriodEnd.current_period_end;
  }
  const topLevel = sub as unknown as { current_period_end?: number };
  return topLevel.current_period_end ?? null;
}

function logErr(eventId: string, msg: string) {
  console.error(`[stripe-webhook] event=${eventId} ${msg}`);
}

function logInfo(eventId: string, msg: string) {
  console.log(`[stripe-webhook] event=${eventId} ${msg}`);
}

/**
 * Webhook Stripe — point d'entrée unique pour tous les événements.
 *
 * Sécurité :
 *  - Signature vérifiée avant toute action DB
 *  - Déduplication via table stripe_events (Stripe retry possible jusqu'à 3 jours)
 *  - purchased_at jamais réécrit sur upsert
 *  - subscription.updated filtré par tier='monthly' pour ne pas écraser lifetime
 *  - charge.refunded ignoré si refund partiel
 */
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json(
      { error: 'Signature ou secret manquant.' },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'signature error';
    console.error(`[stripe-webhook] signature invalide : ${msg}`);
    return NextResponse.json({ error: 'Signature invalide.' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Déduplication : si l'event a déjà été traité, on no-op
  const { error: dupeErr } = await admin
    .from('stripe_events')
    .insert({ id: event.id, type: event.type });

  if (dupeErr) {
    if (dupeErr.code === '23505') {
      logInfo(event.id, `duplicate ignoré (${event.type})`);
      return NextResponse.json({ received: true, duplicate: true });
    }
    logErr(event.id, `insert stripe_events : ${dupeErr.message}`);
    // On continue quand même — mieux double-traiter que ne pas traiter
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        const tier = isTier(s.metadata?.tier) ? s.metadata!.tier : null;
        const rawEmail = s.customer_details?.email ?? s.customer_email;
        const email = rawEmail?.trim().toLowerCase();
        const customerId =
          typeof s.customer === 'string' ? s.customer : s.customer?.id ?? null;
        const subscriptionId =
          typeof s.subscription === 'string'
            ? s.subscription
            : s.subscription?.id ?? null;

        if (!email || !tier) {
          logErr(event.id, `email ou tier manquant (email=${email}, tier=${tier})`);
          return NextResponse.json(
            { error: 'Données session incomplètes.' },
            { status: 400 }
          );
        }

        let expiresAt: string | null = null;
        if (tier === 'monthly' && subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId);
          const periodEnd = getPeriodEnd(sub);
          if (periodEnd) {
            expiresAt = new Date(periodEnd * 1000).toISOString();
          }
        }

        // Upsert SANS réécrire purchased_at si la ligne existe déjà
        const { data: existing } = await admin
          .from('subscribers')
          .select('id, purchased_at')
          .eq('email', email)
          .maybeSingle();

        if (existing) {
          await admin
            .from('subscribers')
            .update({
              tier,
              status: 'active',
              expires_at: expiresAt,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              stripe_session_id: s.id,
            })
            .eq('id', existing.id);
          logInfo(event.id, `subscriber updated email=${email} tier=${tier}`);
        } else {
          await admin.from('subscribers').insert({
            email,
            tier,
            status: 'active',
            purchased_at: new Date().toISOString(),
            expires_at: expiresAt,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            stripe_session_id: s.id,
          });
          logInfo(event.id, `subscriber created email=${email} tier=${tier}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const periodEnd = getPeriodEnd(sub);
        const expiresAt = periodEnd
          ? new Date(periodEnd * 1000).toISOString()
          : null;
        const status =
          sub.status === 'active' || sub.status === 'trialing'
            ? 'active'
            : 'expired';

        // IMPORTANT : ne toucher QUE les mensuels — protège les lifetime/agency
        // d'un éventuel update qui matcherait par stripe_subscription_id
        const { error } = await admin
          .from('subscribers')
          .update({ expires_at: expiresAt, status })
          .eq('stripe_subscription_id', sub.id)
          .eq('tier', 'monthly');
        if (error) logErr(event.id, `subscription.updated : ${error.message}`);
        else logInfo(event.id, `subscription updated sub=${sub.id} status=${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const { error } = await admin
          .from('subscribers')
          .update({ status: 'expired' })
          .eq('stripe_subscription_id', sub.id)
          .eq('tier', 'monthly');
        if (error) logErr(event.id, `subscription.deleted : ${error.message}`);
        else logInfo(event.id, `subscription expired sub=${sub.id}`);
        break;
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        const subId = (inv as unknown as { subscription?: string }).subscription;
        if (subId) {
          const { error } = await admin
            .from('subscribers')
            .update({ status: 'expired' })
            .eq('stripe_subscription_id', subId)
            .eq('tier', 'monthly');
          if (error) logErr(event.id, `invoice.payment_failed : ${error.message}`);
          else logInfo(event.id, `payment failed sub=${subId}`);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        // Ignore les refunds partiels — n'affecte pas l'accès
        if (charge.amount_refunded < charge.amount) {
          logInfo(
            event.id,
            `refund partiel ignoré charge=${charge.id} (${charge.amount_refunded}/${charge.amount})`
          );
          break;
        }
        const customerId =
          typeof charge.customer === 'string'
            ? charge.customer
            : charge.customer?.id ?? null;
        if (customerId) {
          const { error } = await admin
            .from('subscribers')
            .update({ status: 'refunded' })
            .eq('stripe_customer_id', customerId);
          if (error) logErr(event.id, `charge.refunded : ${error.message}`);
          else logInfo(event.id, `refund full customer=${customerId}`);
        }
        break;
      }

      default:
        logInfo(event.id, `événement ignoré : ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur inconnue';
    logErr(event.id, `traitement échoué : ${msg}`);
    return NextResponse.json(
      { error: 'Traitement webhook échoué.' },
      { status: 500 }
    );
  }
}
