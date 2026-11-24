/**
 * data/prompts.ts — couche de transformation pour le lab.
 *
 * Les données viennent de data/projects.ts (source de vérité unique).
 * Ce fichier expose :
 *  - les types historiques (`Prompt`, `PromptCategory`, `PromptType`) pour
 *    ne pas casser les imports existants
 *  - le tableau `PROMPTS` qui ajoute `livePreviewUrl` et applique
 *    l'interleave free/premium
 *  - `TIERS` (config pricing, indépendant des projets)
 */

import { PROJECTS, type Project } from './projects';

// Ré-exports avec les noms historiques pour compat
export type PromptCategory = Project['category'];
export type PromptType = Project['type'];

export type Prompt = {
  slug: string;
  name: string;
  tagline: string;
  type: PromptType;
  category: PromptCategory;
  video: string;
  /** URL de la page rendue (toujours `/${slug}`) */
  livePreviewUrl: string;
  stack: string[];
  tier: 'free' | 'premium';
  promptText: string | null;
  number: string;
};

function projectToPrompt(p: Project): Prompt {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    type: p.type,
    category: p.category,
    video: p.video,
    livePreviewUrl: `/${p.slug}`,
    stack: p.stack,
    tier: p.tier,
    promptText: p.promptText ?? null,
    number: p.number,
  };
}

/**
 * Mélange free/premium dès le début : un gratuit toutes les 3 cartes,
 * pour que les visiteurs ne croient pas que tout est verrouillé.
 */
function interleaveByTier(items: Prompt[]): Prompt[] {
  const free = items.filter((p) => p.tier === 'free');
  const premium = items.filter((p) => p.tier === 'premium');
  const result: Prompt[] = [];
  const total = items.length;
  let fi = 0;
  let pi = 0;
  for (let i = 0; i < total; i++) {
    const wantFree = i % 3 === 0 && fi < free.length;
    if (wantFree) {
      result.push(free[fi++]);
    } else if (pi < premium.length) {
      result.push(premium[pi++]);
    } else if (fi < free.length) {
      result.push(free[fi++]);
    }
  }
  return result;
}

const _RAW: Prompt[] = PROJECTS.map(projectToPrompt);

export const PROMPTS: Prompt[] = interleaveByTier(_RAW);

export const FREE_PROMPTS = PROMPTS.filter((p) => p.tier === 'free');
export const PREMIUM_PROMPTS = PROMPTS.filter((p) => p.tier === 'premium');

export function getPromptBySlug(slug: string): Prompt | undefined {
  return PROMPTS.find((p) => p.slug === slug);
}

/**
 * Configuration des tiers de pricing.
 * Indépendant des projets — ne touche pas à data/projects.ts.
 */
export const TIERS = {
  monthly: {
    name: 'Pro',
    price: 27,
    priceSuffix: '/mois',
    description: 'Toute la bibliothèque, mois par mois',
    features: [
      'Toute la bibliothèque actuelle',
      'Tous les futurs prompts inclus',
      'Licence usage personnel + 1 projet client',
      'Annulable à tout moment',
    ],
    cta: 'Commencer',
    stanUrl: 'https://stan.store/your-handle/pro-monthly',
  },
  lifetime: {
    name: 'Pro Lifetime',
    price: 199,
    anchorPrice: 399,
    description: 'Toute la bibliothèque, une seule fois',
    features: [
      'Toute la bibliothèque actuelle',
      'Tous les futurs prompts inclus à vie',
      'Licence usage personnel + 1 projet client',
      'Achat unique, aucun renouvellement',
    ],
    cta: 'Acheter à vie',
    badge: 'Le plus choisi',
    stanUrl: 'https://stan.store/your-handle/pro-lifetime',
  },
  agency: {
    name: 'Agency',
    price: 499,
    anchorPrice: 999,
    description: 'Pour les studios et agences',
    features: [
      'Tout Pro Lifetime',
      'Licence commerciale · sites client illimités',
      'Support prioritaire',
    ],
    cta: 'Passer en Agency',
    stanUrl: 'https://stan.store/your-handle/agency',
  },
} as const;
