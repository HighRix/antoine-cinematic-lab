import type { Metadata } from 'next';
import { ProjectCard, type Project } from '@/components/cinematic/ProjectCard';
import { FooterWatermark } from '@/components/cinematic/FooterWatermark';
import { Logo } from '@/components/cinematic/Logo';

export const metadata: Metadata = {
  title: 'cinematic.lab — portfolio',
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
    slug: '/grenier-bio',
    name: 'Le Grenier Bio d’Emberbail',
    tagline: 'Ferme bio · hero vidéo doré + scène 3D produits + scroll cinematic terroir',
    client: 'Ferme bio, Nailloux (31)',
    stack: ['Next 16', 'GSAP + Lenis smooth scroll', 'Three.js + R3F', 'Schema LocalBusiness'],
    accent: '#0E7824',
    number: '07',
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
    slug: '/slam-dunk',
    name: 'Slam Dunk Store',
    tagline: 'E-commerce premium · ballon 3D photoréaliste + scroll narratif 6 actes',
    client: 'Concept e-commerce sport haut de gamme',
    stack: ['Next 16', 'Three.js + R3F', 'GSAP', 'Audio procédural'],
    accent: '#FF5500',
    number: '06',
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
          <a
            href="/"
            className="group inline-flex items-center transition-opacity hover:opacity-80"
            aria-label="cinematic.lab — Antoine Scie"
          >
            <Logo
              size={34}
              gap={11}
              wordmarkClassName="text-[22px] md:text-[24px] text-white"
            />
          </a>
        </header>

        {/* Pitch */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14 md:mb-20">
          <div className="md:col-span-8">
            <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.15] text-white">
              Sites cinematic animés au scroll, pensés comme des courts-métrages.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-[340px]">
              Du sur-mesure codé à la main : chaque site est un exemplaire unique, livré à un seul client. Cliquez pour entrer.
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

      </div>

      {/* Footer — adapted from Kresna 2-card split + giant wordmark watermark */}
      <PortfolioFooter />
    </main>
  );
}

function PortfolioFooter() {
  return (
    <section className="relative mt-24 md:mt-32 px-5 sm:px-8 md:px-12 lg:px-16 pb-20">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4">
        {/* Left card — video */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#141414] min-h-[360px] lg:min-h-[440px] p-7 md:p-8 flex flex-col justify-between shadow-[0_18px_50px_rgba(242,125,38,0.18)] ring-1 ring-white/8">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover opacity-95 pointer-events-none"
            aria-hidden
          />
          {/* dark gradient bottom for legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none"
          />

          <div className="relative z-10">
            <Logo size={32} gap={11} wordmarkClassName="text-[22px] text-white" />
          </div>

          <div className="relative z-10">
            <p className="font-serif italic text-[26px] md:text-[30px] tracking-[-0.02em] leading-[1.1] text-white max-w-[340px]">
              Un site qui claque autant que votre produit.
            </p>
            <p className="mt-4 text-[13px] text-white/65 leading-relaxed max-w-[300px]">
              Livré en 2 semaines. Devis offert, premier appel sous 24h.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-white/65">
              Antoine, freelance front-end
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/antoinescie/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-[10px] bg-black/60 ring-1 ring-white/15 grid place-items-center hover:bg-[#F27D26] hover:ring-[#F27D26] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
              <a
                href="mailto:antoine.scie@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-[10px] bg-black/60 ring-1 ring-white/15 grid place-items-center hover:bg-[#F27D26] hover:ring-[#F27D26] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
              <a
                href="tel:+33681949021"
                aria-label="Téléphone"
                className="w-9 h-9 rounded-[10px] bg-black/60 ring-1 ring-white/15 grid place-items-center hover:bg-[#F27D26] hover:ring-[#F27D26] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right card — content */}
        <div className="relative bg-[#141414] rounded-[28px] p-8 md:p-10 ring-1 ring-white/8 overflow-visible">
          {/* Floating orange badge — code-bracket mark + "on tourne" handwritten tag */}
          <div
            aria-hidden
            className="hidden md:flex absolute -top-7 right-8 lg:right-10 z-10 flex-col items-end gap-1"
          >
            <div className="relative w-[88px] h-[88px] rounded-[20px] rotate-[-8deg] grid place-items-center"
                 style={{
                   background: 'linear-gradient(135deg, #F9B27D 0%, #F27D26 55%, #C7501B 100%)',
                   boxShadow: 'inset 3px 3px 8px rgba(255,255,255,0.35), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(242,125,38,0.35)'
                 }}>
              <svg
                viewBox="0 0 24 24"
                width="42"
                height="42"
                fill="none"
                stroke="#0c0c0c"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: 'rotate(8deg)' }}
              >
                <path d="m9 8-5 4 5 4" />
                <path d="m15 8 5 4-5 4" />
              </svg>
            </div>
            <span className="font-serif italic text-[18px] text-white/45 -rotate-[6deg] mt-1">on tourne</span>
          </div>

          {/* Top — nav cols */}
          <div className="flex flex-wrap gap-x-16 gap-y-10 pt-2">
            <div>
              <p className="font-serif italic text-[20px] text-white/40 mb-5">Navigation</p>
              <ul className="flex flex-col gap-[14px]">
                <li><a href="#projets" className="text-[14px] font-medium text-white hover:text-[#F27D26] transition-colors">Voir les sites</a></li>
                <li><a href="/devis" className="text-[14px] font-medium text-white hover:text-[#F27D26] transition-colors">Demander un devis</a></li>
                <li><a href="mailto:antoine.scie@gmail.com?subject=Process%20cinematic-lab" className="text-[14px] font-medium text-white hover:text-[#F27D26] transition-colors">Comprendre le process</a></li>
              </ul>
            </div>

            <div>
              <p className="font-serif italic text-[20px] text-white/40 mb-5">Profil</p>
              <ul className="flex flex-col gap-[14px]">
                <li><a href="https://www.linkedin.com/in/antoinescie/" target="_blank" rel="noreferrer" className="text-[14px] font-medium text-white hover:text-[#F27D26] transition-colors">LinkedIn</a></li>
                <li><a href="mailto:antoine.scie@gmail.com" className="text-[14px] font-medium text-white hover:text-[#F27D26] transition-colors">antoine.scie@gmail.com</a></li>
                <li><a href="tel:+33681949021" className="text-[14px] font-medium text-white hover:text-[#F27D26] transition-colors">+33 6 81 94 90 21</a></li>
                <li><span className="text-[14px] font-medium text-white/55">Basé à Annecy, FR</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom — CTA */}
          <div className="mt-12 md:mt-14 flex justify-end">
            <a
              href="mailto:antoine.scie@gmail.com?subject=Demande%20de%20devis%20cinematic-lab"
              className="inline-flex items-center gap-3 bg-[#F27D26] hover:bg-[#FF8A2E] text-black font-medium text-[14px] tracking-tight px-5 py-3 rounded-full shadow-[0_8px_24px_rgba(242,125,38,0.35)] hover:shadow-[0_12px_32px_rgba(242,125,38,0.5)] transition-all hover:scale-[1.02]"
            >
              <span>Démarrer un projet</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Giant wordmark watermark — auto-fit SVG */}
      <FooterWatermark />

      {/* Sub-copyright */}
      <div className="max-w-[1600px] mx-auto mt-8 md:mt-4 px-5 sm:px-8 md:px-12 lg:px-16 text-center text-[11px] font-mono tracking-[0.22em] uppercase text-white/30">
        © 2026 antoine scie · tous droits réservés
      </div>
    </section>
  );
}
