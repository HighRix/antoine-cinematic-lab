import { NextResponse, type NextRequest } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { getSession } from '@/lib/supabase/session';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 15;

/**
 * Crée une session du Stripe Customer Portal pour l'utilisateur connecté.
 *
 * Sécurité :
 *  - Check Origin pour bloquer CSRF (un site malveillant ne peut pas
 *    déclencher l'ouverture du portail via un form cross-origin)
 *  - Requiert un stripe_customer_id en DB
 *  - Si abonnement refundé, on autorise quand même l'accès au portail
 *    (utile pour récupérer une facture par exemple)
 */
export async function POST(request: NextRequest) {
  // CSRF guard : refuse les POST cross-origin
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return NextResponse.json({ error: 'Origine refusée.' }, { status: 403 });
  }

  const session = await getSession();
  if (!session?.subscriber?.stripe_customer_id) {
    return NextResponse.json(
      { error: 'Aucun client Stripe associé.' },
      { status: 403 }
    );
  }

  try {
    const stripe = getStripe();
    const returnHost = request.headers.get('origin') ?? request.nextUrl.origin;

    const portal = await stripe.billingPortal.sessions.create({
      customer: session.subscriber.stripe_customer_id,
      return_url: `${returnHost}/lab/account`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown';
    console.error(`[portal] Stripe error : ${msg}`);
    return NextResponse.json(
      { error: 'Impossible d\'ouvrir le portail.' },
      { status: 500 }
    );
  }
}
