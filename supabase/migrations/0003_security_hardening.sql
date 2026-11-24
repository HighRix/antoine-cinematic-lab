-- Migration 0003 — durcissement sécurité
-- Adresse les findings #3, #4, #5, #24 de la review.

-- ─── Fix #3 : déduplication des événements Stripe ──────────────
-- Stripe retry les webhooks jusqu'à 3 jours. Sans dédup, chaque retry
-- ré-exécute la logique et corrompt purchased_at / expires_at.
create table if not exists public.stripe_events (
  id           text primary key,
  type         text not null,
  processed_at timestamptz not null default now()
);

create index if not exists stripe_events_processed_at_idx
  on public.stripe_events (processed_at desc);

-- ─── Fix #4 : RLS case-insensitive ─────────────────────────────
-- Le webhook stocke en lowercase, mais le JWT contient l'email tel
-- que tapé par le user. Sans lower(), la policy échoue silencieusement.
drop policy if exists "subscribers_self_read" on public.subscribers;
create policy "subscribers_self_read" on public.subscribers
  for select
  using (lower(auth.jwt() ->> 'email') = lower(email));

-- ─── Fix #5 : vue active_subscribers protégée par security_invoker ─
-- Sans ça, une vue Postgres bypass le RLS de la table sous-jacente.
-- security_invoker force la vue à utiliser les permissions du caller.
drop view if exists public.active_subscribers;
create view public.active_subscribers
  with (security_invoker = true) as
select email, tier, expires_at
from public.subscribers
where status = 'active'
  and (expires_at is null or expires_at > now());

-- Bloque explicitement la lecture par les rôles publics
revoke all on public.active_subscribers from anon, authenticated;

-- ─── Fix #24 : colonne notes morte ─────────────────────────────
alter table public.subscribers drop column if exists notes;

-- Force PostgREST schema reload
notify pgrst, 'reload schema';
