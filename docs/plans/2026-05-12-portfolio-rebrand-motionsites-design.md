# Portfolio Rebrand — Motionsites pattern

Date : 2026-05-12
Branche : `feature/portfolio-rebrand-motionsites`

## Objectif

Refondre la home `/` du portfolio cinematic-lab en grille dense type motionsites.ai, chaque carte projet jouant une boucle vidéo silencieuse en autoplay. Conserver le branding `#0C0C0C` deep black, unifier l'accent sur `#F27D26` (orange Kleo).

## Décisions validées par Antoine

1. **Single accent orange `#F27D26`** — abandon des 10 accents par projet.
2. **Capture Playwright auto** — chaque route enregistrée 7-8s en WebM via Playwright headless, exposée dans `public/portfolio-previews/{slug}.webm`.

## Layout cible

- Background `#0C0C0C` inchangé
- Container `max-w-[1600px]` (élargi vs 1400px actuel pour densité accrue)
- Grille `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` avec gap hairline 1px (`bg-white/10` border between)
- Card : ratio 16:10, `<video autoplay muted loop playsInline preload="metadata">`
- Overlay (toujours visible, bas-gauche) : `[NN] / 10` en mono blanc 40%
- Overlay (révélé au hover) : nom projet en serif italique + tagline courte + slug en mono orange
- Border hover : `ring-1 ring-[#F27D26]/40 + accent corner orange`
- Stagger entry : 80ms entre cartes au mount

## Performance

- IntersectionObserver : video commence à charger à 200px avant viewport
- `preload="metadata"` par défaut, `preload="auto"` une fois en viewport
- Tailles cibles : WebM VP8 1280×720@24fps 8s → 400-800 KB par fichier, total ~6-8 MB pour 10 cartes
- LCP : la première vidéo en viewport doit être prête sous 2.5s ; sinon poster PNG fallback

## Capture pipeline

Script `scripts/capture-previews.mjs` :
1. Lance Playwright Chromium 1280×720
2. Pour chaque slug `['/atlas','/aurum','/grenier-bio','/jack','/orbis','/pureflow','/microvisuals','/automation-machines','/slam-dunk','/stratus','/zenith','/tanli']` : navigue avec `?preview=1` (skip preloader), attend 2s pour le settle initial, enregistre 8s, ferme la page.
3. Renomme `video.webm` → `public/portfolio-previews/{slug}.webm`

Modif Preloader : skip aussi quand `?preview=1` dans la query.

## Hors scope

- Pas de page de détail projet refondue (les `/atlas`, `/pureflow` etc. restent telles quelles)
- Pas de migration des couleurs sur les pages projet individuelles (chaque projet garde son hero comme défini)
- Pas de deploy production avant validation visuelle Antoine

## Plan d'exécution

1. Skip preloader sur `?preview=1`
2. `npm i -D playwright` + `npx playwright install chromium`
3. Script capture + run sur les 12 routes
4. Refonte `app/page.tsx` avec nouvelle grille
5. Verif preview screenshot
6. Commit sur la branche, attendre go d'Antoine pour PR/merge/deploy
