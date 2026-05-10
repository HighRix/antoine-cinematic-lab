'use client';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

// Index 0 = image principale (centrée, scale max). Les 6 autres sont positionnées en périphérie.
const IMAGES = [
  { src: '/ft/main.jpg', alt: 'Réalisation FT Design : projet phare' },
  { src: '/ft/7.jpg', alt: 'Réalisation FT Design 1' },
  { src: '/ft/3.jpg', alt: 'Réalisation FT Design 2' },
  { src: '/ft/4.jpg', alt: 'Réalisation FT Design 3' },
  { src: '/ft/5.jpg', alt: 'Réalisation FT Design 4' },
  { src: '/ft/6.jpg', alt: 'Réalisation FT Design 5' },
  { src: '/ft/1.png', alt: 'Réalisation FT Design 6' },
];

export function PropertiesSection() {
  return (
    <section className="bg-[#F8F8F8]">
      {/* Intro header : denser layout: eyebrow label + title + subtext + meta row */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pt-14 md:pt-20 pb-8 md:pb-14">
        {/* Eyebrow row */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="block h-px w-10 bg-[#141414]/30" />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/60">
            Nos réalisations
          </span>
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/30 ml-auto hidden md:block">
            02 / 04
          </span>
        </div>

        {/* Title + subtext */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <h2 className="md:col-span-7 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-[#141414]">
            Des espaces pensés pour révéler votre art de vivre.
          </h2>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <p className="text-[#141414]/70 text-[14px] md:text-[15px] leading-relaxed">
              Notre vision conjugue équilibre, design et attention pour que chaque client habite un lieu qui reflète ses valeurs et son histoire.
            </p>
            <a
              href="#realisations"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#141414] hover:opacity-60 transition-opacity"
            >
              Voir toutes les réalisations
              <span aria-hidden className="block h-px w-6 bg-[#141414]" />
            </a>
          </div>
        </div>

      </div>

      {/* Zoom parallax : drives 3 viewport heights of scroll */}
      <div id="realisations">
        <ZoomParallax images={IMAGES} />
      </div>
    </section>
  );
}
