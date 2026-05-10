'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Semis',
    description: 'Semences anciennes plantées à l’automne, dans une terre vivante.',
  },
  {
    n: '02',
    title: 'Croissance',
    description: 'Six mois de patience. Pas d’intrants. Le climat fait son travail.',
  },
  {
    n: '03',
    title: 'Moisson',
    description: 'Récolte à pleine maturité, en juillet, à la moissonneuse.',
  },
  {
    n: '04',
    title: 'Stockage',
    description: 'Grains stockés dans le grenier ventilé naturellement.',
  },
  {
    n: '05',
    title: 'Transformation',
    description: 'Mouture sur meule de pierre. Pression à froid pour les huiles.',
  },
  {
    n: '06',
    title: 'Vente',
    description: 'Direct producteur, sur les marchés et chez nos partenaires locaux.',
  },
];

export function Processus() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        if (!track) return;

        const totalScroll = track.scrollWidth - window.innerWidth + 200;

        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="processus" className="relative bg-[#FAF7F0] py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-14 md:mb-24">
          <div className="md:col-span-2 flex md:flex-col items-start gap-3">
            <span className="w-8 h-px bg-[#0E7824] mt-3" />
            <span className="text-xs tracking-[0.22em] uppercase text-[#0E7824] font-medium">
              Le processus
            </span>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-recoleta text-[#2D2D2F] text-[34px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              De la graine
              <br />
              <span className="italic text-[#0E7824]">à votre table.</span>
            </h2>
          </div>
          <div className="md:col-span-3 md:col-start-10 flex md:items-end">
            <p className="text-[#2D2D2F]/75 text-sm md:text-base leading-relaxed max-w-xs">
              Six étapes, douze mois. Tout se passe sur l'exploitation, sans intermédiaire.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track (lg+) — vertical stacked on mobile */}
      <div className="relative">
        <div
          ref={trackRef}
          className="lg:flex lg:flex-row gap-px lg:will-change-transform lg:pl-12 lg:pr-32"
        >
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="lg:flex-shrink-0 lg:w-[420px] xl:w-[480px] mb-4 sm:mb-6 lg:mb-0 mx-5 sm:mx-6 md:mx-12 lg:mx-0 lg:mr-px bg-white border-warm rounded-sm p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[420px] hover:bg-[#F2EBD9] transition-colors group"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-recoleta text-4xl sm:text-5xl md:text-7xl text-[#0E7824] leading-none">
                  {step.n}
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#2D2D2F]/40">
                  ÉTAPE {step.n}
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <h3 className="font-recoleta text-2xl sm:text-3xl md:text-4xl text-[#2D2D2F] mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p
                  className="text-[#2D2D2F]/70 text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
              <div className="h-px w-full bg-[#2D2D2F]/10 group-hover:bg-[#0E7824]/40 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
