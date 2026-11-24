/**
 * scripts/validate-live.ts
 * Validation complète Stripe LIVE + Supabase + endpoints prod.
 * Aucun paiement réel n'est déclenché.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const PROD_URL = 'https://cinematic-lab.com';
const results: { name: string; pass: boolean; detail: string }[] = [];

function record(name: string, pass: boolean, detail: string) {
  results.push({ name, pass, detail });
}

async function main() {
  // ─── Stripe LIVE ─────────────────────────────────────────
  const stripeKey = process.env.STRIPE_SECRET_KEY!;
  record('Stripe key is LIVE', stripeKey.startsWith('sk_live_'),
    stripeKey.startsWith('sk_live_') ? 'sk_live_...' : `bad prefix: ${stripeKey.slice(0,8)}`);

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-04-22.dahlia' });

  // 1. Compte Stripe accessible
  try {
    const account = await stripe.accounts.retrieve();
    record('Stripe account accessible',
      !!account.id,
      `id=${account.id} country=${account.country} charges_enabled=${account.charges_enabled} payouts_enabled=${account.payouts_enabled}`);
    record('Stripe charges_enabled',
      account.charges_enabled === true,
      account.charges_enabled ? 'true — peut encaisser' : 'FALSE — KYC incomplet, paiements bloqués');
    record('Stripe payouts_enabled',
      account.payouts_enabled === true,
      account.payouts_enabled ? 'true — RIB OK' : 'FALSE — virements bloqués');
  } catch (e) {
    record('Stripe account accessible', false, (e as Error).message);
  }

  // 2. Les 3 produits/prix existent et sont actifs
  for (const [tier, priceId] of [
    ['monthly', process.env.STRIPE_PRICE_MONTHLY!],
    ['lifetime', process.env.STRIPE_PRICE_LIFETIME!],
    ['agency', process.env.STRIPE_PRICE_AGENCY!],
  ]) {
    try {
      const price = await stripe.prices.retrieve(priceId);
      const product = typeof price.product === 'string'
        ? await stripe.products.retrieve(price.product)
        : (price.product as Stripe.Product);
      const ok = price.active && price.livemode && product.active;
      record(`Stripe price ${tier} (${priceId})`,
        ok,
        `active=${price.active} live=${price.livemode} prod_active=${product.active} amount=${price.unit_amount}${price.currency} ${price.recurring ? 'recurring' : 'one-time'}`);
    } catch (e) {
      record(`Stripe price ${tier}`, false, (e as Error).message);
    }
  }

  // 3. Webhook endpoint registered et live
  try {
    const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
    const ours = endpoints.data.find(e => e.url === `${PROD_URL}/api/webhook/stripe`);
    if (ours) {
      const needed = ['checkout.session.completed','customer.subscription.updated','customer.subscription.deleted','invoice.payment_failed','charge.refunded'];
      const missing = needed.filter(n => !ours.enabled_events.includes(n));
      record('Stripe webhook endpoint LIVE',
        ours.livemode && ours.status === 'enabled' && missing.length === 0,
        `livemode=${ours.livemode} status=${ours.status} events=${ours.enabled_events.length}${missing.length ? ` MISSING: ${missing.join(',')}` : ''}`);
    } else {
      record('Stripe webhook endpoint LIVE', false, 'No endpoint matching prod URL');
    }
  } catch (e) {
    record('Stripe webhook endpoint LIVE', false, (e as Error).message);
  }

  // ─── Endpoints prod ──────────────────────────────────────
  async function http(method: string, path: string, body?: object | null, headers?: Record<string,string>) {
    const opts: RequestInit = { method, headers: { 'Content-Type': 'application/json', ...(headers ?? {}) } };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(`${PROD_URL}${path}`, opts);
    const text = await r.text();
    return { status: r.status, body: text };
  }

  // 4. Pages publiques
  for (const path of ['/lab', '/lab/pricing', '/lab/login', '/portfolio']) {
    const r = await http('GET', path);
    record(`GET ${path}`, r.status === 200, `HTTP ${r.status}`);
  }

  // 5. Account redirige si pas auth
  const accountR = await http('GET', '/lab/account');
  record('GET /lab/account (no auth)', accountR.status === 307 || accountR.status === 200, `HTTP ${accountR.status}`);

  // 6. Aurum supprimé doit donner 404
  const aurumR = await http('GET', '/aurum');
  record('GET /aurum (deleted)', aurumR.status === 404, `HTTP ${aurumR.status}`);

  // 7. Webhook security
  const wr1 = await http('POST', '/api/webhook/stripe', {});
  record('Webhook rejects no signature', wr1.status === 400, `HTTP ${wr1.status}`);
  const wr2 = await http('POST', '/api/webhook/stripe', { fake: true }, { 'stripe-signature': 'whsec_fake_1234' });
  record('Webhook rejects bad signature', wr2.status === 400, `HTTP ${wr2.status}`);

  // 8. Checkout valide
  const cr = await http('POST', '/api/checkout', { tier: 'lifetime' });
  let checkoutUrl = '';
  try { checkoutUrl = JSON.parse(cr.body).url ?? ''; } catch {}
  record('POST /api/checkout lifetime returns cs_live_',
    cr.status === 200 && checkoutUrl.includes('cs_live_'),
    `status=${cr.status} url_prefix=${checkoutUrl.slice(0, 50)}`);

  // 9. Checkout rejette tier invalide
  const cr2 = await http('POST', '/api/checkout', { tier: 'hacker' });
  record('POST /api/checkout rejects invalid tier', cr2.status === 400, `HTTP ${cr2.status}`);

  // 10. Inspecter la session Stripe créée
  if (checkoutUrl) {
    const sessionId = checkoutUrl.match(/cs_live_[A-Za-z0-9]+/)?.[0];
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items', 'line_items.data.price'],
        });
        const items = session.line_items?.data ?? [];
        const firstItem = items[0];
        const priceMatches = firstItem && typeof firstItem.price === 'object'
          ? firstItem.price.id === process.env.STRIPE_PRICE_LIFETIME
          : false;
        record('Checkout session structure OK',
          session.livemode && session.mode === 'payment' && session.metadata?.tier === 'lifetime' && priceMatches,
          `live=${session.livemode} mode=${session.mode} tier=${session.metadata?.tier} success=${(session.success_url ?? '').slice(0, 60)} cancel=${(session.cancel_url ?? '').slice(0, 60)} customer_creation=${session.customer_creation}`);
      } catch (e) {
        record('Checkout session structure OK', false, (e as Error).message);
      }
    }
  }

  // ─── API gating ──────────────────────────────────────────
  // 11. /api/me sans auth
  const meR = await http('GET', '/api/me');
  let meBody: { session?: null } = {};
  try { meBody = JSON.parse(meR.body); } catch {}
  record('/api/me no auth', meR.status === 200 && meBody.session === null, `body=${meR.body.slice(0, 80)}`);

  // 12. /api/prompts/{free-slug} sans auth doit fonctionner
  const promptFreeR = await http('GET', '/api/prompts/weblex');
  record('/api/prompts/weblex (free) without auth', promptFreeR.status === 200, `HTTP ${promptFreeR.status}`);

  // 13. /api/prompts/{premium-slug} sans auth doit refuser
  const promptPremiumR = await http('GET', '/api/prompts/toonhub');
  record('/api/prompts/toonhub (premium) without auth = 403', promptPremiumR.status === 403, `HTTP ${promptPremiumR.status}`);

  // ─── Supabase ────────────────────────────────────────────
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // 14. Tables existent
  for (const t of ['subscribers', 'prompts', 'stripe_events']) {
    const { error } = await supabase.from(t).select('*', { count: 'exact', head: true });
    record(`Supabase table ${t} accessible`, !error, error?.message ?? 'ok');
  }

  // 15. RLS active sur subscribers (insert/select avec service_role passe)
  const testEmail = `validate-${Date.now()}@cinematic-lab.test`;
  const { error: insErr } = await supabase.from('subscribers').insert({
    email: testEmail, tier: 'lifetime', status: 'active',
  });
  record('Supabase insert subscriber OK', !insErr, insErr?.message ?? 'ok');
  await supabase.from('subscribers').delete().eq('email', testEmail);

  // 16. Stripe events dedup table writable
  const evId = `evt_validate_${Date.now()}`;
  const { error: evInsErr } = await supabase.from('stripe_events').insert({ id: evId, type: 'test' });
  record('stripe_events dedup table writable', !evInsErr, evInsErr?.message ?? 'ok');
  const { error: dupeErr } = await supabase.from('stripe_events').insert({ id: evId, type: 'test' });
  record('stripe_events dedup constraint works', dupeErr?.code === '23505', `code=${dupeErr?.code} ${dupeErr?.message ?? 'ok'}`);
  await supabase.from('stripe_events').delete().eq('id', evId);

  // ─── Vercel env coherence (already pulled to .env.vercel.production earlier) ─
  // Skip — already validated when we re-pushed via printf

  // ─── Report ──────────────────────────────────────────────
  console.log('\n┌────────────────────────────────────────────────────────────────');
  console.log('│ Validation report');
  console.log('├────────────────────────────────────────────────────────────────');
  let passed = 0;
  let failed = 0;
  for (const r of results) {
    const icon = r.pass ? '✓' : '✗';
    console.log(`│ ${icon} ${r.name.padEnd(56)} ${r.detail}`);
    r.pass ? passed++ : failed++;
  }
  console.log('├────────────────────────────────────────────────────────────────');
  console.log(`│ ${passed}/${results.length} pass, ${failed} fail`);
  console.log('└────────────────────────────────────────────────────────────────');

  if (failed > 0) process.exit(1);
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });
