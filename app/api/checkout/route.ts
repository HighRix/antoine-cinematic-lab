import { NextResponse, type NextRequest } from 'next/server';
import { getStripe, TIER_TO_PRICE, TIER_MODE } from '@/lib/stripe/server';
import { getSession } from '@/lib/supabase/session';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 15;

type Tier = 'monthly' | 'lifetime' | 'agency';

function isTier(value: unknown): value is Tier {
  return value === 'monthly' || value === 'lifetime' || value === 'agency';
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Crée une session Stripe Checkout.
 *
 * Sécurité :
 *  - Email pris depuis la session connectée si possible. Sinon, accepté du body
 *    mais validé strictement. Empêche le spoofing qui corromprait la ligne
 *    d'un abonné légitime (cas où Bob paie avec carte X mais déclare email
 *    "alice@x.com" → la ligne d'Alice serait écrasée).
 *  - tier validé contre une liste blanche stricte
 *  - Email normalisé en lowercase pour matcher le storage côté webhook
 */
export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  const body = payload as { tier?: unknown; email?: unknown };

  if (!isTier(body.tier)) {
    return NextResponse.json({ error: 'Tier invalide.' }, { status: 400 });
  }
  const tier: Tier = body.tier;

  // Email : 1) session si connecté, 2) body validé, 3) Stripe fera saisir
  const session = await getSession();
  let email: string | undefined = session?.email;
  if (!email) {
    if (body.email !== undefined && !isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }
    email = isValidEmail(body.email) ? body.email : undefined;
  }
  if (email) email = email.trim().toLowerCase();

  const priceId = TIER_TO_PRICE[tier];
  if (!priceId) {
    console.error(`[checkout] price_id manquant pour tier=${tier}`);
    return NextResponse.json(
      { error: 'Produit non configuré.' },
      { status: 500 }
    );
  }

  try {
    const stripe = getStripe();
    const origin = request.headers.get('origin') ?? request.nextUrl.origin;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: TIER_MODE[tier],
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${origin}/lab/account?success=1`,
      cancel_url: `${origin}/lab/pricing?cancelled=1`,
      metadata: { tier },
      ...(TIER_MODE[tier] === 'subscription'
        ? { subscription_data: { metadata: { tier } } }
        : {
            customer_creation: 'always',
            payment_intent_data: { metadata: { tier } },
          }),
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown';
    console.error(`[checkout] Stripe error : ${msg}`);
    return NextResponse.json(
      { error: 'Impossible de créer la session de paiement.' },
      { status: 500 }
    );
  }
}
