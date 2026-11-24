# cinematic.lab — guide d'activation paiements + abonnés

Tout le code est en place. Il reste 4 actions manuelles (~30 min total).

## Étape 1 — Supabase (5 min)

1. Va sur https://supabase.com/dashboard et crée un compte (gratuit, pas de carte).
2. **New project** → nom : `cinematic-lab` → région : Europe (Paris/Frankfurt) → choisis un mot de passe DB (à conserver mais non utilisé directement).
3. Une fois le projet créé : **Project Settings → API**, copie ces 3 valeurs.
4. Crée le fichier `.env.local` à la racine de `cinematic-lab/` :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

5. Toujours dans Supabase : **SQL Editor → New query**, copie-colle le contenu de `supabase/migrations/0001_subscribers.sql`, puis **Run**. Recommence avec `0002_prompts.sql`.
6. **Authentication → URL Configuration** :
   - Site URL : `http://localhost:3001` (dev) ou ton domaine de prod
   - Redirect URLs : ajoute `http://localhost:3001/auth/callback` et `https://ton-domaine.com/auth/callback`

→ Login magic link opérationnel.

## Étape 2 — Stripe (10-30 min)

1. Va sur https://dashboard.stripe.com/register et crée un compte.
2. Stripe te demandera : identité, RIB pour les virements, statut juridique (auto-entrepreneur OK).
3. Tu peux commencer en mode **TEST** sans KYC complet pour valider le flow.
4. **Developers → API keys** → copie la **Secret key** (`sk_test_...`) dans `.env.local` :

```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
```

## Étape 3 — Génération auto des produits Stripe (1 min, je le fais pour toi)

Une fois `STRIPE_SECRET_KEY` ajoutée :

```bash
npm run setup:stripe
```

Le script crée les 3 produits (Pro Mensuel €27/mois, Lifetime €199, Agency €499) + leurs prix, et affiche les 3 `price_id` à coller dans `.env.local`.

## Étape 4 — Webhook Stripe (2 min)

En dev local, lance le forwarding Stripe CLI :

```bash
brew install stripe/stripe-cli/stripe   # une fois
stripe login                            # une fois
stripe listen --forward-to localhost:3001/api/webhook/stripe
```

Le CLI affiche un `whsec_...` à coller dans `.env.local` comme `STRIPE_WEBHOOK_SECRET`.

**En prod (Netlify)** :

```bash
npm run setup:stripe:webhook -- https://ton-domaine.com/api/webhook/stripe
```

Le script crée le webhook côté Stripe et te donne le `STRIPE_WEBHOOK_SECRET` à ajouter dans les variables d'environnement Netlify.

## Étape 5 — Tester le flow complet

1. Démarre le dev : `npm run dev`
2. Va sur `http://localhost:3001/lab/pricing`
3. Clic "Acheter à vie" → checkout Stripe (mode test)
4. Utilise la carte test Stripe : `4242 4242 4242 4242`, n'importe quelle date future, n'importe quel CVC
5. Redirection sur `/lab/account?success=1`
6. Saisis ton email → tu reçois un magic link
7. Clic → connecté, tous les prompts déverrouillés

## Quand tu seras prêt à vendre pour de vrai

- Active ton compte Stripe (KYC complet)
- Bascule en clés `sk_live_...`
- Relance `npm run setup:stripe` en LIVE (les produits seront re-créés en mode live)
- Configure le webhook live via `npm run setup:stripe:webhook -- https://ton-domaine.com/...`
- Mets les vrais prompts en DB (table `prompts`, colonne `text`)

## Architecture en 1 coup d'œil

```
Utilisateur clique "Acheter à vie"
        ↓
POST /api/checkout {tier}
        ↓
Stripe Checkout (page hébergée)
        ↓
Paiement validé
        ↓
Stripe envoie événement → POST /api/webhook/stripe
        ↓
Insert dans subscribers (status=active)
        ↓
Stripe redirige → /lab/account?success=1
        ↓
Login magic link → cookie session
        ↓
Server Component voit subscriber.status=active
        ↓
Toutes les cartes affichent "Copier" au lieu de "Débloquer"
        ↓
Clic Copier → GET /api/prompts/[slug] (sert le texte depuis Supabase)
```

## Sécurité

- Le texte des prompts premium n'est JAMAIS dans le bundle client
- L'API route `/api/prompts/[slug]` vérifie la session ET l'abonnement actif avant de servir
- Row Level Security activée sur `subscribers` : un user ne peut lire que SA ligne
- Le webhook Stripe utilise la `service_role` key (bypass RLS) qui n'est jamais exposée au navigateur
- La signature du webhook est vérifiée à chaque appel pour empêcher les faux POST
