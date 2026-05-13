# Technique — Texte caché derrière le sujet d'une vidéo

## Le cas d'usage

Hero plein écran avec :
- Une vidéo de fond (object-cover) qui contient un sujet "détouré naturellement" sur fond uni (voiture sur fond sombre, produit sur fond blanc, etc.)
- Un grand texte décoratif (NEW ERA, type Bebas Neue) qui doit donner l'impression de passer **derrière le sujet** : visible autour du sujet, invisible où le sujet est, et **visible à travers les trous topologiques** du sujet (sous un aileron, entre les rayons d'une jante, à travers une anse de tasse, etc.).

Exemple de référence dans le repo : [/new-era](../../app/new-era/page.tsx). Premier essai = matinée perdue à tester des dual-videos, des mix-blend-modes, et des masques en gradient. La solution propre est documentée ici.

## Le piège à éviter

**Ne pas** essayer de :
- Dupliquer la vidéo avec un mask-image gradient (les bords sont mous, le texte bave)
- Utiliser `mix-blend-mode` (aucun mode CSS ne fait "cache exactement la couleur du sujet")
- Faire un `clip-path` géométrique grossier (ne suit pas la silhouette)
- Générer un PNG transparent du sujet via IA (Antoine refuse "ne génère rien de plus")
- Combler les trous internes par fermeture morphologique (closing) sans discriminer : ça bouche aussi les vrais espaces traversants du sujet (sous l'aileron, etc.)

## La solution en une phrase

**Capturer une frame de la vidéo, la binariser, puis faire un flood fill depuis les bords de l'image** : les pixels de fond connectés aux bords restent fond ; les pixels de fond piégés à l'intérieur du sujet (pare-brise, intérieur d'un O typo, etc.) sont bouchés. Le résultat est un PNG noir-et-blanc utilisé comme `mask-image` luminance sur le texte.

## La pipeline complète

### 1. Script de capture (Node + Playwright)

Voir [/scripts/capture-new-era-mask.mjs](../../scripts/capture-new-era-mask.mjs) pour le template fonctionnel. Adapter :

- `URL` : la route locale qui rend la vidéo (e.g. `http://localhost:3001/<slug>?preview=1`)
- `OUT` : où sauver le PNG (e.g. `public/<slug>-mask.png`)
- `currentTime = 1.2` : à quelle seconde de la vidéo capturer (choisir une frame représentative où le sujet est bien positionné)
- `LUMA_THRESHOLD` : seuil de luminance pour marquer un pixel comme sujet (55-100 selon la luminosité du sujet vs fond)
- `isOrange` : règle de détection couleur. À adapter : pour un sujet bleu, remplacer par `b > r AND b > g`. Pour un sujet noir, baisser le LUMA_THRESHOLD.
- `R` (closing radius) : 6 par défaut. Suffisant pour lisser le contour. Ne PAS monter haut (la moitié de la plus petite ouverture traversante du sujet).

Le script :
1. Lance Chromium headless
2. Ouvre l'URL, attend 2.5s que la vidéo se charge
3. Cible `t=1.2s` via `video.currentTime`
4. Dessine la frame sur un canvas à la résolution native de la vidéo (1764×1176 pour Higgs Field)
5. **Threshold binaire** par pixel (luma + couleur dominante) → noir (sujet) / blanc (fond)
6. **Closing R=6** (dilate + erode séparables) → lisse le contour
7. **Flood fill** : BFS itératif depuis les 4 bords de l'image, marque tous les pixels blancs atteignables
8. Tout pixel blanc **non atteint** = trou interne isolé → on le bouche (passe à noir)
9. Sauvegarde le PNG (~50 KB compressé)

### 2. Côté composant

```tsx
<section className="relative">
  {/* Couche 1 : vidéo de fond */}
  <video src={VIDEO_SRC} autoPlay muted loop playsInline
         className="absolute inset-0 w-full h-full object-cover z-0" />

  {/* Couche 2 : wrapper avec le masque, contient le texte */}
  <div
    className="absolute inset-0 z-10 pointer-events-none"
    style={{
      maskImage: 'url(/<slug>-mask.png)',
      maskMode: 'luminance',
      maskSize: 'cover',         /* CRITIQUE : matche object-cover de la vidéo */
      maskPosition: 'center',
      maskRepeat: 'no-repeat',
      WebkitMaskImage: 'url(/<slug>-mask.png)',
      WebkitMaskSize: 'cover',
      WebkitMaskPosition: 'center',
      WebkitMaskRepeat: 'no-repeat',
    }}
  >
    <h1 className="...">NEW ERA</h1>
  </div>
</section>
```

**Indispensable** : `mask-size: cover` + `mask-position: center` doivent matcher EXACTEMENT le `object-fit: cover` + `object-position: center` de la vidéo, sinon le masque dérive. Si la vidéo a un `object-position` custom (e.g. `bottom`), le masque doit avoir le même.

## Les limites à connaître

- **Vidéo quasi-statique requise** : le masque est figé sur une frame. Si le sujet bouge significativement pendant la boucle, le détourage dérive. OK pour beauty shots de produit, trackings serrés. PAS OK pour panoramiques larges.
- **Viewport responsive** : le masque est à la résolution native de la vidéo. Avec `cover` sur les deux, le crop s'aligne tant que les aspect ratios des deux containers sont les mêmes (c'est garanti : ils sont sur le même container).
- **Tuning du threshold** : à inspecter visuellement après chaque capture. Si le sujet a des reflets sombres (vitre, ombre), ils peuvent être marqués comme fond et créer des trous traités par le flood fill (= bouchés, OK). Si le fond a des highlights (lumière), ils peuvent être marqués comme sujet et créer du faux-masque (à corriger en montant le threshold).
- **Closing radius** : doit rester PETIT (6 par défaut). Le but n'est pas de boucher les trous, c'est le flood fill qui fait ça. Le closing sert juste à lisser le bruit de seuillage. Trop grand → il scelle les fines connexions au fond et le flood fill ne peut plus atteindre la zone (= elle est bouchée par erreur).

## Checklist d'application — 5 minutes chrono

1. **Créer la page** `app/<slug>/page.tsx` + composant Hero (5 min)
2. **Lancer le dev server** : `npm run dev`
3. **Copier le script** : `cp scripts/capture-new-era-mask.mjs scripts/capture-<slug>-mask.mjs`
4. **Adapter** `URL`, `OUT`, éventuellement `LUMA_THRESHOLD` et `isOrange` (1 min)
5. **Run** : `node scripts/capture-<slug>-mask.mjs` (15-30 sec)
6. **Inspecter** le PNG produit : ouvrir `public/<slug>-mask.png`, vérifier que le sujet est bien en noir massif sans trous parasites
7. **Câbler** le `<div>` wrapper avec `mask-image` autour du `<h1>` (1 min)
8. **Vérif visuelle** dans le navigateur, ajuster `letter-spacing` du heading si besoin

Si le résultat n'est pas net du premier coup, les leviers à actionner dans l'ordre :
1. Le threshold `LUMA_THRESHOLD` (le sujet est-il bien capturé en noir solide ?)
2. Le `currentTime` de la frame (choisir une frame où le sujet est plus "lisible")
3. La règle de couleur `isOrange` (adapter à la teinte du sujet)
4. Le closing `R` (toujours rester ≤ 10)

Ne jamais monter `R` au-delà de 15 pour "boucher manuellement" un trou : c'est ce qui a coûté la matinée la première fois. Le flood fill s'en charge.
