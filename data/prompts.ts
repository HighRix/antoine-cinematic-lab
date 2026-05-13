// Bibliothèque de prompts cinematic.lab/lab
// Chaque entrée correspond à un hero/composant déployé dans le portfolio.
// `promptText` est null tant qu'Antoine n'a pas fourni le prompt source ou
// que je ne l'ai pas reconstruit depuis le code.

export type PromptCategory =
  | 'Hero'
  | 'SaaS'
  | 'Agency'
  | 'Portfolio'
  | 'E-commerce'
  | 'Local Business'
  | 'Component';

export type Prompt = {
  slug: string;
  name: string;
  tagline: string;
  category: PromptCategory;
  /** Path inside /public to the autoplay WebM preview */
  video: string;
  /** Link to the live deployed hero inside the portfolio */
  livePreviewUrl: string;
  /** Tech / framework tags */
  stack: string[];
  /** Free = full prompt visible without paywall.
   *  Premium = first lines teased, full prompt behind Lab Pass. */
  tier: 'free' | 'premium';
  /** Full prompt text. Null = à fournir/reconstruire. */
  promptText: string | null;
  /** Optional short pitch shown on the gallery card hover */
  number: string;
};

export const PROMPTS: Prompt[] = [
  // ─── FREE (5) ─── plus simples, démontrent la qualité du code ──────────
  {
    slug: 'atlas',
    name: 'Atlas Studio',
    tagline: 'Studio créatif · WordsPullUp char-by-char + Instrument Serif italique',
    category: 'Agency',
    video: '/portfolio-previews/atlas.webm',
    livePreviewUrl: '/atlas',
    stack: ['Next 16', 'Framer Motion', 'WordsPullUp', 'Instrument Serif'],
    tier: 'free',
    promptText: null, // TODO_PROMPT
    number: '01',
  },
  {
    slug: 'stratus',
    name: 'Stratus Agency',
    tagline: 'Agence digitale · liquid glass utility + HLS streaming + char reveal',
    category: 'Agency',
    video: '/portfolio-previews/stratus.webm',
    livePreviewUrl: '/stratus',
    stack: ['Next 16', 'HLS.js Mux', 'Liquid glass CSS', 'Char reveal GSAP'],
    tier: 'free',
    promptText: null, // TODO_PROMPT
    number: '02',
  },
  {
    slug: 'jack',
    name: 'Jack 3D Creator',
    tagline: 'Portfolio 3D · marquee scroll + cards sticky-stack + magnet hover',
    category: 'Portfolio',
    video: '/portfolio-previews/jack.webm',
    livePreviewUrl: '/jack',
    stack: ['Next 16', 'Framer Motion useScroll', 'Magnet hover', 'Kanit'],
    tier: 'free',
    promptText: null, // TODO_PROMPT
    number: '03',
  },
  {
    slug: 'grenier-bio',
    name: "Le Grenier Bio d'Emberbail",
    tagline: 'Ferme bio · hero vidéo doré + scène 3D produits + scroll terroir',
    category: 'Local Business',
    video: '/portfolio-previews/grenier-bio.webm',
    livePreviewUrl: '/grenier-bio',
    stack: ['Next 16', 'GSAP + Lenis', 'Three.js + R3F', 'Schema LocalBusiness'],
    tier: 'free',
    promptText: null, // TODO_PROMPT
    number: '04',
  },
  {
    slug: 'zenith',
    name: 'FT Design',
    tagline: 'Architecte résidentiel · scroll-driven blueprint + parallax projets',
    category: 'Agency',
    video: '/portfolio-previews/zenith.webm',
    livePreviewUrl: '/zenith',
    stack: ['Next 16', 'GSAP ScrollTrigger', 'Framer Motion', 'SVG draw-on'],
    tier: 'free',
    promptText: null, // TODO_PROMPT
    number: '05',
  },

  // ─── PREMIUM (7) ─── les pièces les plus impressionnantes ──────────────
  {
    slug: 'new-era',
    name: 'New Era',
    tagline: 'Concession auto · texte derrière la voiture via masque silhouette',
    category: 'E-commerce',
    video: '/portfolio-previews/new-era.webm',
    livePreviewUrl: '/new-era',
    stack: ['Next 16', 'Mask-image PNG', 'Bebas Neue gradient', 'Playwright capture'],
    tier: 'premium',
    promptText: null, // J'ai le brief Antoine, à fournir
    number: '06',
  },
  {
    slug: 'weblex',
    name: 'Weblex',
    tagline: 'Smart website builder · vidéo background loop seamless via RAF',
    category: 'SaaS',
    video: '/portfolio-previews/weblex.webm',
    livePreviewUrl: '/weblex',
    stack: ['Next 16', 'requestAnimationFrame', 'Lime green accent', 'Lucide'],
    tier: 'premium',
    promptText: null,
    number: '07',
  },
  {
    slug: 'automation-machines',
    name: 'Automation Machines',
    tagline: 'Landing futuriste · Spline 3D background + gradient Orbitron',
    category: 'SaaS',
    video: '/portfolio-previews/automation-machines.webm',
    livePreviewUrl: '/automation-machines',
    stack: ['Next 16', 'Spline 3D scene', 'Motion stagger', 'Orbitron + JetBrains Mono'],
    tier: 'premium',
    promptText: null,
    number: '08',
  },
  {
    slug: 'microvisuals',
    name: 'MicroVisuals',
    tagline: 'AI image tool · vidéo boomerang canvas + parallax GSAP + liquid glass',
    category: 'SaaS',
    video: '/portfolio-previews/microvisuals.webm',
    livePreviewUrl: '/microvisuals',
    stack: ['Next 16', 'GSAP parallax', 'requestVideoFrameCallback', 'Liquid glass'],
    tier: 'premium',
    promptText: null,
    number: '09',
  },
  {
    slug: 'pureflow',
    name: 'PureFlow One',
    tagline: 'Concept produit · spotlight reveal canvas + grille animée curseur',
    category: 'E-commerce',
    video: '/portfolio-previews/pureflow.webm',
    livePreviewUrl: '/pureflow',
    stack: ['Next 16', 'Canvas radial gradient mask', 'RAF lerp', 'Lucide'],
    tier: 'premium',
    promptText: null,
    number: '10',
  },
  {
    slug: 'slam-dunk',
    name: 'Slam Dunk Store',
    tagline: 'E-commerce premium · ballon 3D photoréaliste + scroll narratif 6 actes',
    category: 'E-commerce',
    video: '/portfolio-previews/slam-dunk.webm',
    livePreviewUrl: '/slam-dunk',
    stack: ['Next 16', 'Three.js + R3F', 'GSAP', 'Audio procédural'],
    tier: 'premium',
    promptText: null,
    number: '11',
  },
  {
    slug: 'orbis',
    name: 'Orbis.NFT',
    tagline: 'Landing NFT space · liquid glass + vidéos CloudFront sur planète',
    category: 'SaaS',
    video: '/portfolio-previews/orbis.webm',
    livePreviewUrl: '/orbis',
    stack: ['Next 16', 'CSS liquid glass', 'Framer Motion', 'CloudFront video'],
    tier: 'premium',
    promptText: null,
    number: '12',
  },
];

export const TIERS = {
  starter: {
    name: 'Starter',
    price: 79,
    description: '10 prompts au choix, accès lifetime',
    features: [
      '10 prompts à choisir dans la bibliothèque',
      'Mises à jour lifetime des prompts choisis',
      'Licence usage personnel',
      'Support email',
    ],
    cta: 'Choisir 10 prompts',
    stanUrl: 'https://stan.store/your-handle/starter', // TODO: vraie URL Stan
  },
  lab: {
    name: 'Lab Pass',
    price: 199,
    anchorPrice: 399,
    description: 'Toute la bibliothèque + tous les futurs prompts à vie',
    features: [
      'Toute la bibliothèque actuelle (12+ prompts, 100+ visé)',
      'Tous les futurs prompts inclus à vie',
      'Mises à jour lifetime',
      'Licence usage personnel + 1 projet client',
      'Support prioritaire',
    ],
    cta: 'Tout débloquer',
    badge: 'Le plus choisi',
    stanUrl: 'https://stan.store/your-handle/lab-pass',
  },
  agency: {
    name: 'Agency',
    price: 499,
    description: 'Lab Pass + licence agence + Slack privé',
    features: [
      'Tout le Lab Pass',
      'Licence commerciale agence · sites client illimités',
      'Accès Slack privé Lab membres',
      'Support prioritaire',
    ],
    cta: 'Passer en Agency',
    stanUrl: 'https://stan.store/your-handle/agency',
  },
  drop: {
    name: 'Drop hebdo',
    price: 19,
    priceSuffix: '/mois',
    description: '1 nouveau prompt premium par semaine, annulable',
    features: [
      '1 nouveau prompt premium chaque semaine',
      'Accès maintenu tant que tu paies',
      'Annulable à tout moment',
      'Pas d\'archive (lifetime des prompts reçus uniquement)',
    ],
    cta: 'S\'abonner au Drop',
    stripeUrl: 'https://buy.stripe.com/your-stripe-link', // TODO: vraie URL Stripe
  },
} as const;

export const FREE_PROMPTS = PROMPTS.filter((p) => p.tier === 'free');
export const PREMIUM_PROMPTS = PROMPTS.filter((p) => p.tier === 'premium');

export function getPromptBySlug(slug: string): Prompt | undefined {
  return PROMPTS.find((p) => p.slug === slug);
}
