'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Step = {
  key: string;
  label: string;
  title: string;
  desc: string;
  image: string;
};

const STEPS: Step[] = [
  {
    key: 'conception',
    label: 'Conception sur mesure',
    title: 'Conception sur mesure',
    desc: "Études de site, esquisses et avant-projets pensés pour révéler le potentiel unique de votre terrain.",
    image: '/ft/main.jpg',
  },
  {
    key: 'oeuvre',
    label: "Maîtrise d'œuvre",
    title: "Maîtrise d'œuvre",
    desc: "De l'avant-projet à la livraison : pilotage des entreprises, suivi qualité et coordination des corps d'état.",
    image: '/ft/3.jpg',
  },
  {
    key: 'permis',
    label: 'Permis & démarches',
    title: 'Permis & démarches',
    desc: "Constitution du dossier de permis de construire, échanges avec les services de l'urbanisme, gestion des recours.",
    image: '/ft/5.jpg',
  },
  {
    key: 'suivi',
    label: 'Suivi de chantier',
    title: 'Suivi de chantier',
    desc: "Visites hebdomadaires, validation des étapes clés, contrôle des prestations jusqu'à la remise des clés.",
    image: '/ft/7.jpg',
  },
];

export function ProcessSectionAnimated() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const total = STEPS.length;

      // Set initial state: only step 0 image visible, only step 0 text visible
      gsap.set('.step-image', { opacity: 0 });
      gsap.set('.step-image-0', { opacity: 1 });
      gsap.set('.step-text', { opacity: 0, y: 20 });
      gsap.set('.step-text-0', { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${(total - 1) * window.innerHeight}`,
          pin: '.process-pin',
          scrub: 1,
          snap: {
            snapTo: 1 / (total - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (total - 1));
            setActiveIndex(idx);
          },
        },
      });

      // Build the timeline: each step transition takes equal time (1 / (total-1))
      for (let i = 1; i < total; i++) {
        const segmentStart = (i - 1) * (1 / (total - 1));
        // image cross-fade
        tl.to(
          `.step-image-${i - 1}`,
          { opacity: 0, ease: 'none', duration: 0.5 },
          segmentStart,
        );
        tl.to(
          `.step-image-${i}`,
          { opacity: 1, ease: 'none', duration: 0.5 },
          segmentStart,
        );
        // text crossfade with translate
        tl.to(
          `.step-text-${i - 1}`,
          { opacity: 0, y: -20, ease: 'power1.in', duration: 0.4 },
          segmentStart,
        );
        tl.to(
          `.step-text-${i}`,
          { opacity: 1, y: 0, ease: 'power1.out', duration: 0.4 },
          segmentStart + 0.1,
        );
      }
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="bg-[#F8F8F8] relative"
      aria-label="Notre process"
    >
      {/* Pinned wrapper — held in place while user scrolls (totals-1 viewport heights) */}
      <div className="process-pin min-h-screen flex flex-col">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pt-16 md:pt-20 w-full">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <span className="block h-px w-10 bg-[#141414]/30" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/60">
                Notre process
              </span>
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/30 ml-auto hidden md:block">
                03 / 04
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
              <h2 className="md:col-span-7 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-[#141414]">
                Notre approche, du croquis à la livraison.
              </h2>
              <div className="md:col-span-4 md:col-start-9 flex flex-col gap-4">
                <p className="text-[#141414]/70 text-[14px] md:text-[15px] leading-relaxed">
                  Conception sur mesure, gestion des permis, maîtrise d&apos;œuvre et suivi de chantier. Un accompagnement complet pour votre projet de A à Z.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated body — left content stack + right image stack */}
        <div className="flex-1 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 w-full pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 h-full">
            {/* Left content block — fixed, with absolute-positioned text layers + nav list */}
            <div className="md:col-span-4 bg-white p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[480px] relative overflow-hidden">
              {/* Stacked text layers (one per step) */}
              <div className="relative flex-1 min-h-[280px]">
                {STEPS.map((s, i) => (
                  <div
                    key={s.key}
                    className={`step-text step-text-${i} absolute inset-0 flex flex-col`}
                  >
                    <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/40 mb-3">
                      Étape {String(i + 1).padStart(2, '0')} / 04
                    </span>
                    <h3 className="text-[24px] md:text-[28px] font-medium text-[#141414] tracking-tight leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-[#A5A5A5] text-[14px] leading-relaxed mt-5">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Step navigation list */}
              <ul className="flex flex-col gap-3 mt-8">
                {STEPS.map((step, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={step.key} className="flex items-center gap-3">
                      <span
                        className={`block h-px transition-all duration-500 ${
                          isActive ? 'w-8 bg-[#141414]' : 'w-3 bg-[#141414]/20'
                        }`}
                      />
                      <span
                        className={`text-[13px] font-medium transition-colors ${
                          isActive ? 'text-[#141414]' : 'text-[#A5A5A5]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right image stack */}
            <div className="md:col-span-8 relative aspect-video md:aspect-auto md:min-h-[480px] overflow-hidden">
              {STEPS.map((s, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={s.key}
                  src={s.image}
                  alt={s.title}
                  className={`step-image step-image-${i} absolute inset-0 w-full h-full object-cover`}
                />
              ))}

              {/* Progress indicator (top-right of image) */}
              <div className="absolute top-5 right-5 flex items-center gap-2 px-3 py-2 bg-[#141414]/80 backdrop-blur-md rounded-full text-white text-[10px] font-medium tracking-[0.18em] uppercase">
                {String(activeIndex + 1).padStart(2, '0')} / 04
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
