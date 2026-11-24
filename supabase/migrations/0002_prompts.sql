-- cinematic.lab — contenu des prompts gardé en DB
-- Permet d'éditer un prompt sans redéployer le site.
-- Les métadonnées (nom, vidéo, tier, etc.) restent dans data/prompts.ts.

create table if not exists public.prompts (
  slug       text primary key,
  text       text not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists prompts_set_updated_at on public.prompts;
create trigger prompts_set_updated_at
  before update on public.prompts
  for each row
  execute function public.set_updated_at();

-- RLS désactivé : le serveur Next.js (API route) sert le texte après
-- vérification du tier + session. Le client ne touche jamais cette table
-- directement avec l'anon key.
alter table public.prompts enable row level security;

-- Aucune policy de lecture publique. Seule la service_role key (utilisée
-- côté serveur dans les API routes) peut lire. Le navigateur est bloqué.
