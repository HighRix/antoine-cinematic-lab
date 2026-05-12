import type { Metadata } from 'next';
import { ProjectCard, type Project } from '@/components/cinematic/ProjectCard';

export const metadata: Metadata = {
  title: 'Antoine · Cinematic Web Design',
  description:
    "Sites cinematic premium animés au scroll, conçus pour founders et agences qui veulent un site qui claque autant que leur produit.",
};

const TEMPLATES: Project[] = [
  {
    slug: '/automation-machines',
    name: 'Automation Machines',
    tagline: 'Landing futuriste, Spline 3D background + gradient Orbitron + technical specs card',
    client: 'Concept automation, dev tool',
    number: '10',
    video: '/portfolio-previews/automation-machines.webm',
  },
  {
    slug: '/microvisuals',
    name: 'MicroVisuals',
    tagline: 'AI image tool, vidéo boomerang frame-par-frame canvas + parallax GSAP + liquid glass nav',
    client: 'Concept AI image generation',
    number: '09',
    video: '/portfolio-previews/microvisuals.webm',
  },
  {
    slug: '/pureflow',
    name: 'PureFlow One',
    tagline: 'Concept produit, spotlight reveal canvas + grille animée + masque cursor-driven',
    client: 'Concept device respiration premium',
    number: '08',
    video: '/portfolio-previews/pureflow.webm',
  },
  {
    slug: '/grenier-bio',
    name: "Le Grenier Bio d'Emberbail",
    tagline: 'Ferme bio, hero vidéo doré + scène 3D produits + scroll cinematic terroir',
    client: 'Ferme bio, Nailloux (31)',
    number: '07',
    video: '/portfolio-previews/grenier-bio.webm',
  },
  {
    slug: '/slam-dunk',
    name: 'Slam Dunk Store',
    tagline: 'E-commerce premium, ballon 3D photoréaliste + scroll narratif 6 actes',
    client: 'Concept e-commerce sport haut de gamme',
    number: '06',
    video: '/portfolio-previews/slam-dunk.webm',
  },
  {
    slug: '/zenith',
    name: 'FT Design',
    tagline: 'Architecte résidentiel, scroll-driven blueprint + parallax projets',
    client: "Cabinet d'architecture, Cluses (HS)",
    number: '05',
    video: '/portfolio-previews/zenith.webm',
  },
  {
    slug: '/orbis',
    name: 'Orbis.NFT',
    tagline: 'Landing NFT space, liquid glass + vidéos CloudFront',
    client: 'Concept NFT collection',
    number: '04',
    video: '/portfolio-previews/orbis.webm',
  },
  {
    slug: '/jack',
    name: 'Jack 3D Creator',
    tagline: 'Portfolio 3D creator, marquee scroll + cards sticky-stack',
    client: 'Template 3D artist',
    number: '03',
    video: '/portfolio-previews/jack.webm',
  },
  {
    slug: '/stratus',
    name: 'Stratus Agency',
    tagline: 'Liquid glass agency, HLS video + char-by-char text reveal',
    client: 'Agence digitale premium',
    number: '02',
    video: '/portfolio-previews/stratus.webm',
  },
  {
    slug: '/atlas',
    name: 'Atlas Studio',
    tagline: 'Studio créatif, WordsPullUp + animated letter reveal',
    client: 'Studio design',
    number: '01',
    video: '/portfolio-previews/atlas.webm',
  },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <header className="pt-10 md:pt-14 pb-16 md:pb-24 flex items-center justify-between gap-8">
          <a href="/" className="group inline-flex items-center gap-3" aria-label="Antoine — Studio">
            <svg
              width="34"
              height="34"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              className="transition-transform duration-500 group-hover:rotate-180"
            >
              <circle cx="20" cy="20" r="19" stroke="#F5F5F5" strokeWidth="1.2" />
              <line x1="6" y1="34" x2="34" y2="6" stroke="#F5F5F5" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="20" cy="20" r="1.6" fill="#F27D26" />
            </svg>
            <span className="font-serif italic text-[22px] md:text-[24px] tracking-[-0.02em] leading-none text-white">
              cinematic<span className="text-[#F27D26]">.</span>lab
            </span>
          </a>

          <div className="hidden md:flex flex-col items-end gap-1 text-[11px] font-mono tracking-[0.22em] uppercase text-white/45">
            <span>2026</span>
            <span>
              <span className="text-[#F27D26]">●</span> {TEMPLATES.length} sites
            </span>
          </div>
        </header>

        {/* Pitch */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="md:col-span-8">
            <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.15] text-white">
              Sites cinematic animés au scroll, pensés comme des courts-métrages.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-[320px]">
              Chaque carte, une scène. Chaque scroll, un plan séquence. Bougez le curseur, regardez tourner.
            </p>
          </div>
        </section>

        {/* Templates grid — motionsites pattern, dense, video-first */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8"
          aria-label="Projets"
        >
          {TEMPLATES.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} total={TEMPLATES.length} />
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-24 md:pt-32 pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="font-serif italic text-xl md:text-2xl tracking-[-0.02em] leading-[1.3] text-white max-w-[560px]">
              Vous voulez un site qui claque autant que votre produit ?
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8">
              <a
                href="mailto:antoine.scie@gmail.com"
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.18em] uppercase text-white border-b border-[#F27D26]/60 pb-1 hover:border-[#F27D26] transition-colors"
              >
                antoine.scie@gmail.com
                <span aria-hidden className="text-[#F27D26]">→</span>
              </a>
              <a
                href="tel:+33681949021"
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.18em] uppercase text-white border-b border-[#F27D26]/60 pb-1 hover:border-[#F27D26] transition-colors"
              >
                +33 6 81 94 90 21
                <span aria-hidden className="text-[#F27D26]">→</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex md:justify-end items-end">
            <span className="text-[11px] tracking-[0.18em] uppercase text-white/35 font-mono">
              © 2026 · tous droits réservés
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
