<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Techniques documentées

Avant de partir explorer une approche sur un effet visuel non-trivial, vérifier `docs/techniques/` :

- [Texte caché derrière le sujet d'une vidéo](docs/techniques/text-behind-subject-mask.md) — capture frame Playwright + binarisation + flood fill depuis les bords. Sert dès qu'un grand texte doit passer "derrière" un sujet d'une vidéo (voiture, produit, personnage). Premier essai = matinée perdue, la technique propre prend 5 minutes.
