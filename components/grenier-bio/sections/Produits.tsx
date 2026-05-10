'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ProduitsScene = dynamic(
  () => import('@/components/grenier-bio/products3d/ProduitsScene').then((m) => m.ProduitsScene),
  { ssr: false, loading: () => null }
);

const ACTS = [
  {
    n: '01',
    label: 'La graine',
    title: 'Tout commence par une graine.',
    description:
      'Sélectionnée parmi nos variétés anciennes, semée à la main sur une terre vivante.',
  },
  {
    n: '02',
    label: 'La pousse',
    title: 'Six mois de patience.',
    description:
      'Le climat fait son travail. Pas d’engrais. Pas d’irrigation. Seulement le ciel et le sol.',
  },
  {
    n: '03',
    label: 'L’épi',
    title: 'Six cultures, une rotation.',
    description:
      'Blé, tournesol, lentilles, pois chiches, lin, cameline. Chaque culture nourrit la suivante.',
  },
  {
    n: '04',
    label: 'La moisson',
    title: 'On récolte. À pleine maturité.',
    description:
      'Une seule passe. Les grains tombent. Stockés dans le grenier ventilé naturellement.',
  },
  {
    n: '05',
    label: 'La transformation',
    title: 'Mouture & pressage à froid.',
    description:
      'Farine sur meule de pierre. Huiles de tournesol, colza et cameline pressées à froid sur place.',
  },
  {
    n: '06',
    label: 'Les produits',
    title: 'Huiles, farine, œufs.',
    description:
      'Du champ au poulailler, du poulailler à votre table. 900 poules pondeuses ferment le cycle, en plein air, nourries de nos propres céréales bio.',
  },
];

export function Produits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentAct, setCurrentAct] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);

  // Mount canvas only when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sceneReady) {
          setSceneReady(true);
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sceneReady]);

  // Track scroll progress to highlight current act
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(0.999, scrolled / total));
      const act = Math.min(ACTS.length - 1, Math.floor(progress * ACTS.length));
      setCurrentAct(act);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produits"
      className="relative bg-[#FAF7F0]"
      style={{ height: `${ACTS.length * 100}vh` }}
    >
      {/* Pinned viewport — vertical split mobile (3D top / text bottom), horizontal split desktop */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D canvas — top 50% mobile, left half desktop */}
        <div className="absolute top-0 left-0 right-0 h-1/2 lg:h-full lg:right-1/2 z-0">
          {sceneReady && <ProduitsScene scrollContainer={sectionRef} />}
        </div>

        {/* Text panel — bottom 50% mobile (with paper bg), right half desktop (transparent) */}
        <div
          className="absolute left-0 right-0 bottom-0 top-1/2 lg:top-0 lg:left-1/2 z-10 flex items-center bg-[#FAF7F0] lg:bg-transparent"
          style={{
            boxShadow: 'lg:none',
          }}
        >
          {/* Subtle top fade on mobile so the canvas blends gently into the text panel */}
          <div
            className="absolute lg:hidden -top-12 left-0 right-0 h-12 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(250,247,240,0) 0%, rgba(250,247,240,1) 100%)',
            }}
          />

          <div className="w-full px-5 sm:px-6 md:px-12 lg:pl-16 lg:pr-20 xl:pr-24 py-6 sm:py-8 md:py-10 lg:py-24">
            {/* Section meta — visible from md+ */}
            <div className="hidden md:flex items-center gap-3 mb-5 lg:mb-6">
              <span className="w-8 h-px bg-[#0E7824]" />
              <span className="text-xs tracking-[0.22em] uppercase text-[#0E7824] font-medium">
                Nos produits
              </span>
            </div>

            {/* Acts — only one visible at a time */}
            <div className="relative min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px]">
              {ACTS.map((act, i) => (
                <div
                  key={act.n}
                  className={`absolute inset-0 transition-all duration-700 ${
                    i === currentAct
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-md">
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className="font-recoleta text-3xl sm:text-4xl md:text-5xl text-[#0E7824] leading-none">
                        {act.n}
                      </span>
                      <span className="text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#2D2D2F]/50 font-medium">
                        {act.label}
                      </span>
                    </div>
                    <h3 className="font-recoleta text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#2D2D2F] leading-[1.1] tracking-tight">
                      {act.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#2D2D2F]/70 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 max-w-md">
              <div className="flex justify-between mb-2 sm:mb-3">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#2D2D2F]/40 font-medium">
                  Progression
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#0E7824] font-medium">
                  {String(currentAct + 1).padStart(2, '0')} / {String(ACTS.length).padStart(2, '0')}
                </span>
              </div>
              <div className="h-px bg-[#2D2D2F]/15 relative">
                <span
                  className="absolute top-0 left-0 h-full bg-[#0E7824] transition-all duration-700"
                  style={{
                    width: `${((currentAct + 1) / ACTS.length) * 100}%`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              {/* Act indicators */}
              <div className="flex justify-between mt-3 sm:mt-4 gap-1">
                {ACTS.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-0.5 transition-colors duration-500 ${
                      i <= currentAct ? 'bg-[#0E7824]' : 'bg-[#2D2D2F]/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
