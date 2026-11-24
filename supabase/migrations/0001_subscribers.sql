-- cinematic.lab — table abonnés
-- Une ligne par abonné, identifié par email. Supabase Auth gère les sessions
-- via sa propre table auth.users ; on lie en matchant les emails.

create extension if not exists "pgcrypto";

create table if not exists public.subscribers (
  id                     uuid primary key default gen_random_uuid(),
  email                  text unique not null,
  tier                   text not null check (tier in ('monthly', 'lifetime', 'agency')),
  status                 text not null check (status in ('active', 'expired', 'refunded')),
  purchased_at           timestamptz not null default now(),
  expires_at             timestamptz,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  stripe_session_id      text,
  notes                  text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists subscribers_email_idx on public.subscribers (email);
create index if not exists subscribers_status_idx on public.subscribers (status);
create index if not exists subscribers_expires_at_idx on public.subscribers (expires_at) where status = 'active';

-- Trigger pour maintenir updated_at à jour
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscribers_set_updated_at on public.subscribers;
create trigger subscribers_set_updated_at
  before update on public.subscribers
  for each row
  execute function public.set_updated_at();

-- Row Level Security : un utilisateur peut lire SA ligne uniquement.
-- Le webhook Stripe utilise la service_role key qui bypass RLS.
alter table public.subscribers enable row level security;

drop policy if exists "subscribers_self_read" on public.subscribers;
create policy "subscribers_self_read"
  on public.subscribers
  for select
  using (auth.jwt() ->> 'email' = email);

-- Vue pratique pour vérifier rapidement si un email a un abonnement actif
create or replace view public.active_subscribers as
select email, tier, expires_at
from public.subscribers
where status = 'active'
  and (expires_at is null or expires_at > now());
