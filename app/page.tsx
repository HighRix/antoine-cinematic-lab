import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Antoine · Cinematic Web Design',
  description:
    'Sites cinematic premium animés au scroll, conçus pour founders et agences qui veulent un site qui claque autant que leur produit.',
};

type Template = {
  slug: string;
  name: string;
  tagline: string;
  client: string;
  stack: string[];
  accent: string; // CSS color
  number: string;
};

const TEMPLATES: Template[] = [
  {
    slug: '/zenith',
    name: 'FT Design',
    tagline: 'Architecte résidentiel · scroll-driven blueprint + parallax projets',
    client: 'Cabinet d’architecture, Cluses (HS)',
    stack: ['Next 16', 'GSAP ScrollTrigger', 'Framer Motion', 'SVG draw-on'],
    accent: '#F5F5F5',
    number: '05',
  },
  {
    slug: '/orbis',
    name: 'Orbis.NFT',
    tagline: 'Landing NFT space · liquid glass + vidéos CloudFront',
    client: 'Concept NFT collection',
    stack: ['Next 16', 'CSS liquid glass', 'Framer Motion', 'Lucide'],
    accent: '#6FFF00',
    number: '04',
  },
  {
    slug: '/jack',
    name: 'Jack 3D Creator',
    tagline: 'Portfolio 3D creator · marquee scroll + cards sticky-stack',
    client: 'Template 3D artist',
    stack: ['Next 16', 'Framer Motion useScroll', 'Magnet hover', 'Kanit'],
    accent: '#BBCCD7',
    number: '03',
  },
  {
    slug: '/stratus',
    name: 'Stratus Agency',
    tagline: 'Liquid glass agency · HLS video + char-by-char text reveal',
    client: 'Agence digitale premium',
    stack: ['Next 16', 'HLS.js streaming', 'Liquid glass utility', 'Mux'],
    accent: '#7DD3FC',
    number: '02',
  },
  {
    slug: '/atlas',
    name: 'Prisma Studio',
    tagline: 'Studio créatif · WordsPullUp + animated letter reveal',
    client: 'Studio design',
    stack: ['Next 16', 'Framer Motion', 'WordsPullUp custom', 'Instrument Serif'],
    accent: '#F5E6D0',
    number: '01',
  },
];

export default function PortfolioIndex() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Header — minimal logomark + name */}
        <header className="pt-12 md:pt-16 pb-20 md:pb-32 flex items-center justify-between gap-8">
          <a href="/" className="group inline-flex items-center gap-3" aria-label="Antoine — Studio">
            {/* Logomark : geometric "A·S" mark, clean and editorial */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              className="transition-transform duration-500 group-hover:rotate-180"
            >
              {/* outer ring */}
              <circle cx="20" cy="20" r="19" stroke="#F5F5F5" strokeWidth="1.2" />
              {/* slash separator */}
              <line x1="6" y1="34" x2="34" y2="6" stroke="#F5F5F5" strokeWidth="1.2" strokeLinecap="round" />
              {/* tiny stroke accents */}
              <circle cx="20" cy="20" r="1.6" fill="#F5F5F5" />
            </svg>

            <span className="font-serif italic text-[22px] md:text-[24px] tracking-[-0.02em] leading-none text-white">
              cinematic<span className="text-white/40">.</span>lab
            </span>
          </a>

          <div className="hidden md:flex flex-col items-end gap-1 text-[11px] font-medium tracking-[0.18em] uppercase text-white/45">
            <span>2026</span>
            <span>{TEMPLATES.length} sites</span>
          </div>
        </header>

        {/* Pitch */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24 md:mb-32">
          <div className="md:col-span-8">
            <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.15] text-white">
              Sites cinematic animés au scroll, pensés comme des courts-métrages.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-[320px]">
              Une exploration continue de ce que peut faire le web premium quand chaque scroll devient un plan séquence.
            </p>
          </div>
        </section>

        {/* Templates grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border-y border-white/10">
          {TEMPLATES.map((t) => (
            <Link
              key={t.slug}
              href={t.slug}
              className="group relative bg-[#0C0C0C] hover:bg-[#141414] transition-colors p-8 md:p-12 lg:p-14 flex flex-col gap-8 min-h-[340px] md:min-h-[420px]"
            >
              {/* Accent corner */}
              <span
                aria-hidden
                className="absolute top-0 left-0 w-1.5 h-12 transition-all duration-500 group-hover:h-20"
                style={{ background: t.accent }}
              />

              {/* Number + slug */}
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/40">
                  {t.number} / {String(TEMPLATES.length).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/35 font-mono">
                  {t.slug}
                </span>
              </div>

              {/* Name + tagline */}
              <div className="flex flex-col gap-3 flex-1 justify-center">
                <h2
                  className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[0.95] transition-transform duration-500 group-hover:translate-x-2"
                  style={{ color: t.accent }}
                >
                  {t.name}
                </h2>
                <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-[480px]">
                  {t.tagline}
                </p>
                <p className="text-white/35 text-[11px] tracking-[0.18em] uppercase font-medium mt-1">
                  {t.client}
                </p>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {t.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium tracking-[0.06em] uppercase text-white/50 border border-white/15 px-2.5 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA arrow */}
              <div className="flex items-center justify-between gap-4 mt-2">
                <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/55 group-hover:text-white transition-colors">
                  Voir le site
                </span>
                <span
                  aria-hidden
                  className="text-2xl transition-transform duration-500 group-hover:translate-x-3"
                  style={{ color: t.accent }}
                >
                  →
                </span>
              </div>
            </Link>
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
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.18em] uppercase text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
              >
                antoine.scie@gmail.com
                <span aria-hidden>→</span>
              </a>
              <a
                href="tel:+33681949021"
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.18em] uppercase text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
              >
                +33 6 81 94 90 21
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex md:justify-end items-end">
            <span className="text-[11px] tracking-[0.18em] uppercase text-white/35">
              © 2026 · tous droits réservés
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
