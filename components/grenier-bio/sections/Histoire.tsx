'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

// TIMELINE — dates à valider avec Nicole et Philippe avant publication finale
const TIMELINE = [
  {
    year: '1968',
    title: 'Les premières terres',
    description:
      'Le grand-père s’installe à Emberbail du bois et défriche les premières parcelles à Nailloux.',
  },
  {
    year: '1992',
    title: 'La transmission',
    description:
      'Les parents reprennent l’exploitation. Spécialisation dans les céréales et les oléagineux du Lauragais.',
  },
  {
    year: '2008',
    title: 'Le passage en bio',
    description:
      'Nicole et Philippe SCIÉ démarrent la conversion en agriculture biologique. Trois ans pour obtenir la certification AB sur les 120 hectares.',
  },
  {
    year: '2015',
    title: 'L’atelier de transformation',
    description:
      'Construction de l’atelier sur l’exploitation. Mouture sur meule de pierre, pressage à froid pour les huiles de tournesol, colza et cameline.',
  },
  {
    year: '2020',
    title: 'Le poulailler bio',
    description:
      'Arrivée de 900 poules pondeuses élevées en plein air, nourries des céréales de la ferme. Œufs ramassés à la main chaque matin, vendus en direct sous 48h. La boucle est bouclée.',
  },
];

export function Histoire() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="histoire"
      className="relative bg-paper py-20 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-14 md:mb-24">
          <div className="md:col-span-2 flex md:flex-col items-start gap-3">
            <span className="w-8 h-px bg-[#0E7824] mt-3" />
            <span className="text-xs tracking-[0.22em] uppercase text-[#0E7824] font-medium">
              Notre histoire
            </span>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-recoleta text-[#2D2D2F] text-[34px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Nicole &amp; Philippe.
              <br />
              <span className="italic text-[#0E7824]">120 hectares de Lauragais.</span>
            </h2>
          </div>
          <div className="md:col-span-3 md:col-start-10 flex md:items-end">
            <p className="text-[#2D2D2F]/75 text-sm md:text-base leading-relaxed max-w-xs">
              Une exploitation bio à Nailloux, en Haute-Garonne. Six cultures, un atelier de
              transformation, des poules pondeuses. Tout sur place.
            </p>
          </div>
        </div>

        {/* Split image + timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80&auto=format&fit=crop"
                alt="Mains d'agriculteur tenant des grains"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2F]/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-recoleta italic text-xl md:text-2xl leading-snug max-w-[280px]">
                  «&nbsp;Bio et local, c&rsquo;est idéal.&nbsp;»
                </p>
                <p className="text-xs mt-3 tracking-[0.2em] uppercase opacity-70">
                  Nicole &amp; Philippe SCIÉ
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-14 md:space-y-20">
            {TIMELINE.map((item) => (
              <div key={item.year} className="timeline-item grid grid-cols-12 gap-3 sm:gap-4 md:gap-8">
                <div className="col-span-3 md:col-span-2">
                  <span className="font-recoleta text-2xl sm:text-3xl md:text-5xl text-[#0E7824] leading-none">
                    {item.year}
                  </span>
                </div>
                <div className="col-span-1 flex justify-center pt-2">
                  <div className="relative w-px h-full bg-[#2D2D2F]/15">
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0E7824] ring-4 ring-[#FAF7F0]" />
                  </div>
                </div>
                <div className="col-span-8 md:col-span-9">
                  <h3 className="font-recoleta text-xl sm:text-2xl md:text-3xl text-[#2D2D2F] mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p
                    className="text-[#2D2D2F]/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-md"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
