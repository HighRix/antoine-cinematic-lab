import Stripe from 'stripe';

let _stripe: Stripe | null = null;

/**
 * Singleton Stripe côté serveur.
 * À n'utiliser QUE dans les API routes / Server Components.
 */
export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY manquant dans .env');
  }
  // apiVersion pinné explicitement plutôt que "latest" pour éviter qu'un
  // changement breaking côté Stripe casse silencieusement le webhook
  // (notamment getPeriodEnd() qui a déjà migré de top-level vers items[]).
  // À bumper manuellement après test sur staging quand une nouvelle version sort,
  // en alignant ce string avec la version exposée par le SDK installé.
  _stripe = new Stripe(key, {
    apiVersion: '2026-04-22.dahlia',
    typescript: true,
  });
  return _stripe;
}

/**
 * Mapping tier → price_id Stripe.
 * Les price_id sont créés par scripts/setup-stripe.ts.
 */
export const TIER_TO_PRICE: Record<'monthly' | 'lifetime' | 'agency', string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  lifetime: process.env.STRIPE_PRICE_LIFETIME,
  agency: process.env.STRIPE_PRICE_AGENCY,
};

export const TIER_MODE: Record<'monthly' | 'lifetime' | 'agency', 'subscription' | 'payment'> = {
  monthly: 'subscription',
  lifetime: 'payment',
  agency: 'payment',
};
