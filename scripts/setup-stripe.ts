/**
 * scripts/setup-stripe.ts
 *
 * Crée automatiquement les 3 produits Stripe + prices + endpoint webhook
 * pour cinematic.lab. À lancer une seule fois après avoir créé ton compte
 * Stripe et ajouté STRIPE_SECRET_KEY dans .env.local.
 *
 * Usage :
 *   npx tsx scripts/setup-stripe.ts                  → crée en mode TEST
 *   npx tsx scripts/setup-stripe.ts --live           → crée en mode LIVE
 *   npx tsx scripts/setup-stripe.ts --webhook URL    → enregistre l'endpoint webhook
 *
 * Sortie : copie-colle les 3 price_id + le webhook_secret dans .env.local
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import Stripe from 'stripe';

type TierConfig = {
  tier: 'monthly' | 'lifetime' | 'agency';
  name: string;
  description: string;
  amount: number; // en centimes
  currency: 'eur';
  recurring?: { interval: 'month' };
};

const TIERS: TierConfig[] = [
  {
    tier: 'monthly',
    name: 'cinematic.lab — Pro Mensuel',
    description: 'Toute la bibliothèque, mensuel renouvelable.',
    amount: 2700,
    currency: 'eur',
    recurring: { interval: 'month' },
  },
  {
    tier: 'lifetime',
    name: 'cinematic.lab — Pro Lifetime',
    description: 'Toute la bibliothèque, à vie, un seul paiement.',
    amount: 19900,
    currency: 'eur',
  },
  {
    tier: 'agency',
    name: 'cinematic.lab — Agency',
    description: 'Licence commerciale illimitée pour studios et agences.',
    amount: 49900,
    currency: 'eur',
  },
];

async function main() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('❌ STRIPE_SECRET_KEY manquant dans .env.local');
    process.exit(1);
  }

  const stripe = new Stripe(key, { apiVersion: '2026-04-22.dahlia' });
  const args = process.argv.slice(2);
  const webhookUrlArg = args.indexOf('--webhook');
  const webhookUrl = webhookUrlArg >= 0 ? args[webhookUrlArg + 1] : null;

  const created: Record<string, { product: string; price: string }> = {};

  // 1. Produits + prices
  for (const t of TIERS) {
    process.stdout.write(`→ Création produit "${t.name}"... `);

    const product = await stripe.products.create({
      name: t.name,
      description: t.description,
      metadata: { tier: t.tier },
    });

    const price = await stripe.prices.create({
      product: product.id,
      currency: t.currency,
      unit_amount: t.amount,
      ...(t.recurring ? { recurring: t.recurring } : {}),
      metadata: { tier: t.tier },
    });

    created[t.tier] = { product: product.id, price: price.id };
    console.log('✓');
  }

  // 2. Webhook endpoint (si URL fournie)
  let webhookSecret: string | null = null;
  if (webhookUrl) {
    process.stdout.write(`→ Création webhook ${webhookUrl}... `);
    const endpoint = await stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.payment_failed',
        'charge.refunded',
      ],
    });
    webhookSecret = endpoint.secret ?? null;
    console.log('✓');
  }

  console.log('\n──────────────────────────────────────────────────');
  console.log('À copier-coller dans .env.local :\n');
  console.log(`STRIPE_PRICE_MONTHLY=${created.monthly.price}`);
  console.log(`STRIPE_PRICE_LIFETIME=${created.lifetime.price}`);
  console.log(`STRIPE_PRICE_AGENCY=${created.agency.price}`);
  if (webhookSecret) {
    console.log(`STRIPE_WEBHOOK_SECRET=${webhookSecret}`);
  } else {
    console.log(
      '\n(STRIPE_WEBHOOK_SECRET — relance avec --webhook https://ton-site.com/api/webhook/stripe)'
    );
  }
  console.log('──────────────────────────────────────────────────\n');
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
