/**
 * data/projects.ts — SOURCE DE VÉRITÉ UNIQUE des projets cinematic-lab.
 *
 * Cette liste alimente :
 *  - le portfolio (/portfolio) via le mapping dans app/portfolio/page.tsx
 *  - le lab (/lab) via le mapping dans data/prompts.ts
 *
 * Ajouter un nouveau projet = ajouter UNE entrée ici (en position 4,
 * juste après new-era, selon la règle CLAUDE.md "ordre figé sur la
 * 1re ligne du portfolio : toonhub, weblex, new-era").
 *
 * Ne JAMAIS éditer directement data/prompts.ts ou app/portfolio/page.tsx
 * pour ajouter un projet — ils dérivent automatiquement de ce fichier.
 */

export type ProjectCategory =
  | 'Hero'
  | 'SaaS'
  | 'Agency'
  | 'Portfolio'
  | 'E-commerce'
  | 'Local Business'
  | 'Component';

export type ProjectType =
  | 'Hero section'
  | 'Landing page'
  | 'Footer'
  | 'CTA section'
  | 'Pricing section'
  | 'Composant';

export type Project = {
  /** Identifiant unique, sans slash de tête. Ex: 'tanli' */
  slug: string;
  /** Nom affiché sur les cartes. Ex: 'Tanli Elec' */
  name: string;
  /** Description courte (1 phrase). Sert au hover des cartes + alt SEO */
  tagline: string;
  /** Description du client/contexte. Affichée sur la carte portfolio. */
  client: string;
  /** Catégorie (drives le 2e dropdown du lab) */
  category: ProjectCategory;
  /** Type de page (drives le 1er dropdown du lab) */
  type: ProjectType;
  /** Chemin de la preview WebM dans /public */
  video: string;
  /** Tags techniques (affichés en modal lab, peu visibles ailleurs) */
  stack: string[];
  /** free = prompt visible sans login, premium = gated derrière abonnement */
  tier: 'free' | 'premium';
  /** Numéro d'ordre historique (ne sert qu'à un usage interne/tri) */
  number: string;
  /** Texte du prompt complet (null = à fournir, vit en DB Supabase) */
  promptText?: string | null;
  /** Si true, le projet est caché du portfolio public ET du lab.
   *  Sa page `/{slug}` reste accessible directement par URL (pour partage privé). */
  hidden?: boolean;
};

/**
 * Ordre = ordre d'affichage du portfolio.
 * Position 1-3 figées (toonhub, weblex, new-era).
 * Nouvelle création = insérer en position 4.
 *
 * Liste interne complète (visible + cachés).
 * Pour ne montrer qu'un projet en cours de finition aux clients,
 * passer `hidden: true` sur son entrée.
 */
const _ALL_PROJECTS: Project[] = [
  {
    slug: 'toonhub',
    name: 'TOONHUB',
    tagline: 'Boutique figurines 3D, carrousel role-based + crossfade fond 650ms + ghost type Anton',
    client: 'Concept e-commerce character toys',
    category: 'E-commerce',
    type: 'Hero section',
    video: '/portfolio-previews/toonhub.webm',
    stack: ['Next 16', 'Crossfade 650ms', 'Anton ghost text', 'Carrousel role-based'],
    tier: 'premium',
    number: '14',
  },
  {
    slug: 'weblex',
    name: 'Weblex',
    tagline: 'Smart website builder, hero vidéo dark + boucle seamless RAF + accent lime',
    client: 'Concept SaaS site builder',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/weblex.webm',
    stack: ['Next 16', 'requestAnimationFrame', 'Lime green accent', 'Lucide'],
    tier: 'free',
    number: '11',
  },
  {
    slug: 'new-era',
    name: 'New Era',
    tagline: 'Concession auto, vidéo plein écran + NEW ERA Bebas Neue gradient + dual-CTA bottom',
    client: 'Concept marketplace automobile',
    category: 'E-commerce',
    type: 'Hero section',
    video: '/portfolio-previews/new-era.webm',
    stack: ['Next 16', 'Mask-image PNG', 'Bebas Neue gradient', 'Playwright capture'],
    tier: 'free',
    number: '12',
  },
  {
    slug: 'tanli',
    name: 'Tanli Elec',
    tagline: 'Électricité & domotique haut de gamme, hero vidéo + sections services / processus / about + footer · Sora font',
    client: 'Électricien & domotique, Marignier (74)',
    category: 'Local Business',
    type: 'Landing page',
    video: '/portfolio-previews/tanli.webm',
    stack: ['Next 16', 'Sora font', 'Sections services / process / about', 'Schema LocalBusiness'],
    tier: 'premium',
    number: '36',
    hidden: true, // en cours de finition — pas encore montré au public
  },
  {
    slug: 'era',
    name: 'Design Era',
    tagline: 'Bootcamp design, vidéo isométrique 3D + heading Rubik bold + CTA chamfered SVG + card glass info',
    client: 'Concept tech bootcamp',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/era.webm',
    stack: ['Next 16', 'Rubik bold', 'CTA chamfered SVG', 'Vidéo isométrique 3D'],
    tier: 'premium',
    number: '34',
  },
  {
    slug: 'nexa',
    name: 'Nexa AI',
    tagline: 'AI SaaS, hero HLS Mux + heading SplitWords stagger framer-motion + nav center logo LGPSM',
    client: 'Concept AI automation',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/nexa.webm',
    stack: ['Next 16', 'HLS.js Mux', 'Framer Motion SplitWords', 'Nav center logo'],
    tier: 'premium',
    number: '33',
  },
  {
    slug: 'aethera',
    name: 'Aethera®',
    tagline: 'Studio digital éditorial, hero Instrument Serif + vidéo paysage fade-loop custom RAF',
    client: 'Concept studio digital premium',
    category: 'Agency',
    type: 'Hero section',
    video: '/portfolio-previews/aethera.webm',
    stack: ['Next 16', 'Instrument Serif', 'requestAnimationFrame fade-loop', 'Vidéo paysage'],
    tier: 'premium',
    number: '32',
  },
  {
    slug: 'nexus',
    name: 'nexus',
    tagline: 'Talent GenAI, hero HLS Mux code-rain + heading inline-video circulaires + CTA glow vert',
    client: 'Concept GenAI workforce',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/nexus.webm',
    stack: ['Next 16', 'HLS.js Mux', 'Inline-video circulaires', 'CTA glow vert'],
    tier: 'premium',
    number: '31',
  },
  {
    slug: 'velorix',
    name: 'velorix',
    tagline: 'AI defense SaaS, vidéo voxel néon + heading Inter + subtitle mono Courier + nav pill dark',
    client: 'Concept AI security',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/velorix.webm',
    stack: ['Next 16', 'Inter + Courier mono', 'Vidéo voxel néon', 'Nav pill dark'],
    tier: 'premium',
    number: '30',
  },
  {
    slug: 'launchex',
    name: 'Launchex Awards',
    tagline: 'Awards platform, hero vidéo chrome + nav pill fixed + cards chamfered + stats clipPath géométrique',
    client: 'Concept prize/awards ventures',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/launchex.webm',
    stack: ['Next 16', 'Chrome video', 'Cards chamfered', 'ClipPath stats'],
    tier: 'premium',
    number: '29',
  },
  {
    slug: 'spd',
    name: 'S.P.D',
    tagline: 'Automation B2B, vidéo renaissance AI + section rouge + parallax cloud + signature Marck Script',
    client: 'Concept operations automation',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/spd.webm',
    stack: ['Next 16', 'Parallax cloud', 'Marck Script signature', 'Section transitions'],
    tier: 'premium',
    number: '28',
  },
  {
    slug: 'linkflow',
    name: 'LinkFlow',
    tagline: 'SaaS workflows, boomerang canvas frames forward/backward + heading two-tone green + nav pill',
    client: 'Concept automation AI',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/linkflow.webm',
    stack: ['Next 16', 'Canvas boomerang', 'Two-tone heading', 'Nav pill'],
    tier: 'premium',
    number: '27',
  },
  {
    slug: 'vex',
    name: 'VEX',
    tagline: 'Fonds VC, vidéo skyline urbain + navbar liquid-glass + heading char-by-char animation',
    client: 'Concept investing/building/advisory',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/vex.webm',
    stack: ['Next 16', 'Liquid glass navbar', 'Char-by-char reveal', 'Skyline video'],
    tier: 'premium',
    number: '26',
  },
  {
    slug: 'tribe',
    name: 'Fearless Vision',
    tagline: 'Studio créatif, vidéo orbital 3D + stats inline accent purple + heading clip reveal framer-motion',
    client: 'Concept studio creative',
    category: 'Agency',
    type: 'Hero section',
    video: '/portfolio-previews/tribe.webm',
    stack: ['Next 16', 'Framer Motion clip reveal', 'Orbital 3D video', 'Stats inline'],
    tier: 'premium',
    number: '25',
  },
  {
    slug: 'ember',
    name: 'EMBER.dsgn',
    tagline: 'Studio digital, split-panel HLS Mux mirrored 0.7x + EMBER cutout SVG mask frosted glass',
    client: 'Concept design studio agency',
    category: 'Agency',
    type: 'Hero section',
    video: '/portfolio-previews/ember.webm',
    stack: ['Next 16', 'HLS.js Mux', 'SVG cutout mask', 'Frosted glass'],
    tier: 'premium',
    number: '24',
  },
  {
    slug: 'powerai',
    name: 'Power AI',
    tagline: 'SaaS AI talent acq, hero gradient indigo→purple→amber + vidéo dark organique + marquee logos',
    client: 'Concept AI recruiting platform',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/powerai.webm',
    stack: ['Next 16', 'Gradient triple-stop', 'Marquee logos', 'Vidéo dark organique'],
    tier: 'premium',
    number: '23',
  },
  {
    slug: 'neovision',
    name: 'NeoVision',
    tagline: 'Landing futuriste VR, hero light + diagonal SVG divider + sections dark + tabs insights',
    client: 'Concept VR/AR platform',
    category: 'SaaS',
    type: 'Landing page',
    video: '/portfolio-previews/neovision.webm',
    stack: ['Next 16', 'SVG diagonal divider', 'Tabs insights', 'Dark / light sections'],
    tier: 'premium',
    number: '22',
  },
  {
    slug: 'equilibrium',
    name: 'Equilibrium',
    tagline: 'Wellness app, vidéo orbe lumineux + liquid-glass pill nav + Geist + chrome minimaliste',
    client: 'Concept wellness companion',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/equilibrium.webm',
    stack: ['Next 16', 'Liquid glass pill', 'Geist font', 'Vidéo orbe'],
    tier: 'free',
    number: '21',
  },
  {
    slug: 'veloce',
    name: 'veloce',
    tagline: 'Fintech app, hero vidéo cartes 3D + BlurIn framer-motion + scroll-driven gradient fill text',
    client: 'Concept paiements mobiles',
    category: 'SaaS',
    type: 'Landing page',
    video: '/portfolio-previews/veloce.webm',
    stack: ['Next 16', 'Framer Motion BlurIn', 'Scroll gradient text', 'Cartes 3D'],
    tier: 'premium',
    number: '20',
  },
  {
    slug: 'framelix',
    name: 'Framelix 3D',
    tagline: 'Studio motion design, hero vidéo libellule 3D + marquee lavender + section shipping rounded-bottom',
    client: 'Concept studio motion design',
    category: 'Agency',
    type: 'Landing page',
    video: '/portfolio-previews/framelix.webm',
    stack: ['Next 16', 'Marquee lavender', 'Rounded-bottom section', 'Libellule 3D'],
    tier: 'premium',
    number: '19',
  },
  {
    slug: 'railroad',
    name: 'Railroad.ai',
    tagline: 'SaaS focus, vidéo train plein écran + liquid-glass pills + BlurText word-by-word framer-motion',
    client: 'Concept productivity tool',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/railroad.webm',
    stack: ['Next 16', 'Framer Motion BlurText', 'Liquid glass pills', 'Vidéo train'],
    tier: 'premium',
    number: '18',
  },
  {
    slug: 'guardnet',
    name: 'guardnet',
    tagline: 'Sécurité B2B, mots géants diagonaux + stats angled dividers + 3 sections vidéos lava-lamp',
    client: 'Concept cybersécurité enterprise',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/guardnet.webm',
    stack: ['Next 16', 'Mots diagonaux', 'Angled dividers', 'Vidéos lava-lamp'],
    tier: 'premium',
    number: '17',
  },
  {
    slug: 'targo',
    name: 'targo',
    tagline: 'Logistics premium, vidéo F1 plein écran + CTAs clip-path corners + glass card transparente bottom-left',
    client: 'Concept transport B2B',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/targo.webm',
    stack: ['Next 16', 'Clip-path corners', 'Glass card', 'Vidéo F1'],
    tier: 'premium',
    number: '16',
  },
  {
    slug: 'reposit',
    name: 'reposit',
    tagline: 'Solaire B2C, pull-down crossfade jour/nuit + toggle bounce + photo arrière-plan blur 40px',
    client: 'Concept énergie solaire résidentiel',
    category: 'Local Business',
    type: 'Hero section',
    video: '/portfolio-previews/reposit.webm',
    stack: ['Next 16', 'Crossfade jour / nuit', 'Toggle bounce', 'Photo blur 40px'],
    tier: 'free',
    number: '15',
  },
  {
    slug: 'vaultshield',
    name: 'VaultShield',
    tagline: 'Password manager, vidéo 3D plein écran + heading inline-icons Lucide + sheet mobile right-slide',
    client: 'Concept password manager B2C',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/vaultshield.webm',
    stack: ['Next 16', 'Lucide inline-icons', 'Sheet mobile', 'Vidéo 3D'],
    tier: 'premium',
    number: '13',
  },
  {
    slug: 'automation-machines',
    name: 'Automation Machines',
    tagline: 'Landing futuriste, Spline 3D background + gradient Orbitron + technical specs card',
    client: 'Concept automation, dev tool',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/automation-machines.webm',
    stack: ['Next 16', 'Spline 3D scene', 'Motion stagger', 'Orbitron + JetBrains Mono'],
    tier: 'premium',
    number: '10',
  },
  {
    slug: 'microvisuals',
    name: 'MicroVisuals',
    tagline: 'AI image tool, vidéo boomerang canvas + parallax GSAP + liquid glass nav',
    client: 'Concept AI image generation',
    category: 'SaaS',
    type: 'Hero section',
    video: '/portfolio-previews/microvisuals.webm',
    stack: ['Next 16', 'GSAP parallax', 'requestVideoFrameCallback', 'Liquid glass'],
    tier: 'premium',
    number: '09',
  },
  {
    slug: 'pureflow',
    name: 'PureFlow One',
    tagline: 'Concept produit, spotlight reveal canvas + grille animée + masque cursor-driven',
    client: 'Concept device respiration premium',
    category: 'E-commerce',
    type: 'Hero section',
    video: '/portfolio-previews/pureflow.webm',
    stack: ['Next 16', 'Canvas radial gradient mask', 'RAF lerp', 'Lucide'],
    tier: 'premium',
    number: '08',
  },
  {
    slug: 'grenier-bio',
    name: "Le Grenier Bio d'Emberbail",
    tagline: 'Ferme bio, hero vidéo doré + scène 3D produits + scroll cinematic terroir',
    client: 'Ferme bio, Nailloux (31)',
    category: 'Local Business',
    type: 'Landing page',
    video: '/portfolio-previews/grenier-bio.webm',
    stack: ['Next 16', 'GSAP + Lenis', 'Three.js + R3F', 'Schema LocalBusiness'],
    tier: 'premium',
    number: '07',
  },
  {
    slug: 'slam-dunk',
    name: 'Slam Dunk Store',
    tagline: 'E-commerce premium, ballon 3D photoréaliste + scroll narratif 6 actes',
    client: 'Concept e-commerce sport haut de gamme',
    category: 'E-commerce',
    type: 'Hero section',
    video: '/portfolio-previews/slam-dunk.webm',
    stack: ['Next 16', 'Three.js + R3F', 'GSAP', 'Audio procédural'],
    tier: 'premium',
    number: '06',
  },
  {
    slug: 'zenith',
    name: 'FT Design',
    tagline: 'Architecte résidentiel, scroll-driven blueprint + parallax projets',
    client: "Cabinet d'architecture, Cluses (HS)",
    category: 'Agency',
    type: 'Landing page',
    video: '/portfolio-previews/zenith.webm',
    stack: ['Next 16', 'GSAP ScrollTrigger', 'Framer Motion', 'SVG draw-on'],
    tier: 'premium',
    number: '05',
  },
  {
    slug: 'orbis',
    name: 'Orbis.NFT',
    tagline: 'Landing NFT space, liquid glass + vidéos CloudFront sur planète',
    client: 'Concept NFT collection',
    category: 'SaaS',
    type: 'Landing page',
    video: '/portfolio-previews/orbis.webm',
    stack: ['Next 16', 'CSS liquid glass', 'Framer Motion', 'CloudFront video'],
    tier: 'premium',
    number: '04',
  },
  {
    slug: 'jack',
    name: 'Jack 3D Creator',
    tagline: 'Portfolio 3D creator, marquee scroll + cards sticky-stack + magnet hover',
    client: 'Template 3D artist',
    category: 'Portfolio',
    type: 'Landing page',
    video: '/portfolio-previews/jack.webm',
    stack: ['Next 16', 'Framer Motion useScroll', 'Magnet hover', 'Kanit'],
    tier: 'premium',
    number: '03',
  },
  {
    slug: 'stratus',
    name: 'Stratus Agency',
    tagline: 'Liquid glass agency, HLS video + char-by-char text reveal',
    client: 'Agence digitale premium',
    category: 'Agency',
    type: 'Landing page',
    video: '/portfolio-previews/stratus.webm',
    stack: ['Next 16', 'HLS.js Mux', 'Liquid glass CSS', 'Char reveal GSAP'],
    tier: 'premium',
    number: '02',
  },
  {
    slug: 'atlas',
    name: 'Atlas Studio',
    tagline: 'Studio créatif, WordsPullUp char-by-char + Instrument Serif italique',
    client: 'Studio design',
    category: 'Agency',
    type: 'Landing page',
    video: '/portfolio-previews/atlas.webm',
    stack: ['Next 16', 'Framer Motion', 'WordsPullUp', 'Instrument Serif'],
    tier: 'premium',
    number: '01',
  },
];

/**
 * Liste publique = tous les projets sauf ceux marqués `hidden`.
 * C'est cette liste qu'utilisent le portfolio (/portfolio) et le lab (/lab).
 */
export const PROJECTS: Project[] = _ALL_PROJECTS.filter((p) => !p.hidden);

/**
 * Helper : retrouve un projet par son slug (visibles + cachés).
 * Utilisé par l'API du lab — un projet caché ne doit pas leak son prompt,
 * donc on cherche dans la liste publique uniquement.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
