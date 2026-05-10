'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  {
    number: '01',
    title: 'Conception sur mesure',
    desc: 'Études de site, esquisses et avant-projets pensés pour révéler le potentiel unique de votre terrain.',
  },
  {
    number: '02',
    title: "Maîtrise d'œuvre",
    desc: "De l'avant-projet à la livraison : pilotage des entreprises, suivi qualité et coordination des corps d'état.",
  },
  {
    number: '03',
    title: 'Permis & démarches',
    desc: "Constitution du dossier de permis de construire, échanges avec les services de l'urbanisme, gestion des recours.",
  },
  {
    number: '04',
    title: 'Suivi de chantier',
    desc: "Visites hebdomadaires, validation des étapes clés, contrôle des prestations jusqu'à la remise des clés.",
  },
];

/**
 * Modern villa elevation — cantilevered upper volume, flat roof, large
 * floor-to-ceiling glazing, pool and minimal landscape. Drawn inside
 * a 1200×700 viewBox so it scales fluidly inside any container.
 *
 * The `data-step` / `data-draw` / `data-fade` attrs are queried by GSAP
 * on desktop only (gated by matchMedia). On mobile we render the same
 * markup statically — paths show in their fully-drawn state.
 */
function ModernVillaSVG({
  className = '',
  variant = 'animated',
}: {
  className?: string;
  variant?: 'animated' | 'static';
}) {
  // On mobile/static variant we strip the data-* attrs so GSAP can't
  // accidentally target them via global queries — and so the paths render
  // in their natural visible state.
  const draw = variant === 'animated' ? { 'data-draw': true } : {};
  const fade = variant === 'animated' ? { 'data-fade': true, opacity: 0 } : {};
  const stepAttr = (n: string) =>
    variant === 'animated' ? { 'data-step': n } : {};

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      stroke="#141414"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* === STEP 1 — Site & repères === */}
      {/* Terrain baseline */}
      <path {...stepAttr('1')} {...draw} d="M 80 580 L 1130 580" />
      {/* Ground hatching ticks */}
      {Array.from({ length: 26 }).map((_, i) => (
        <path
          key={`hatch-${i}`}
          {...stepAttr('1')}
          {...draw}
          d={`M ${100 + i * 40} 582 L ${110 + i * 40} 600`}
          strokeWidth="0.8"
        />
      ))}

      {/* Compass rose top-right */}
      <circle {...stepAttr('1')} {...draw} cx="1080" cy="115" r="42" />
      <circle
        {...stepAttr('1')}
        {...draw}
        cx="1080"
        cy="115"
        r="32"
        strokeOpacity="0.4"
      />
      <path {...stepAttr('1')} {...draw} d="M 1080 70 L 1080 160" />
      <path
        {...stepAttr('1')}
        {...draw}
        d="M 1035 115 L 1125 115"
        strokeOpacity="0.4"
      />
      <path
        {...stepAttr('1')}
        {...draw}
        d="M 1075 80 L 1080 65 L 1085 80 Z"
        fill="#141414"
      />
      <text
        {...stepAttr('1')}
        {...fade}
        x="1080"
        y="178"
        textAnchor="middle"
        fontSize="11"
        fontWeight="500"
        fill="#141414"
        stroke="none"
        letterSpacing="0.18em"
      >
        N
      </text>

      {/* Reference cross at origin */}
      <path {...stepAttr('1')} {...draw} d="M 75 580 L 75 605" strokeWidth="1" />
      <path {...stepAttr('1')} {...draw} d="M 60 605 L 90 605" strokeWidth="1" />
      <text
        {...stepAttr('1')}
        {...fade}
        x="75"
        y="625"
        textAnchor="middle"
        fontSize="9"
        fill="#141414"
        stroke="none"
        letterSpacing="0.15em"
        opacity={variant === 'animated' ? undefined : 0.5}
      >
        0,00
      </text>

      {/* Solar reference disc upper-left (modernist orientation marker) */}
      <circle
        {...stepAttr('1')}
        {...draw}
        cx="170"
        cy="140"
        r="38"
        strokeOpacity="0.35"
      />
      <text
        {...stepAttr('1')}
        {...fade}
        x="170"
        y="200"
        textAnchor="middle"
        fontSize="9"
        fill="#141414"
        stroke="none"
        letterSpacing="0.18em"
        opacity={variant === 'animated' ? undefined : 0.45}
      >
        SUD
      </text>

      {/* === STEP 2 — Volumes (cantilevered modernist box) === */}
      {/* Ground floor — closed volume A */}
      <path
        {...stepAttr('2')}
        {...draw}
        d="M 380 580 L 380 400 L 720 400 L 720 580"
      />
      {/* Upper floor — wider, cantilevered volume B */}
      <path
        {...stepAttr('2')}
        {...draw}
        d="M 320 400 L 320 260 L 800 260 L 800 400"
      />
      {/* Cantilever undersides (bridge to the ground-floor edges) */}
      <path
        {...stepAttr('2')}
        {...draw}
        d="M 320 400 L 380 400"
        strokeOpacity="0.7"
      />
      <path
        {...stepAttr('2')}
        {...draw}
        d="M 720 400 L 800 400"
        strokeOpacity="0.7"
      />
      {/* Flat-roof parapet line */}
      <path
        {...stepAttr('2')}
        {...draw}
        d="M 315 254 L 805 254"
        strokeWidth="0.9"
        strokeOpacity="0.7"
      />
      {/* Roof centre tick */}
      <path
        {...stepAttr('2')}
        {...draw}
        d="M 555 248 L 565 248"
        strokeWidth="1"
      />

      {/* === STEP 3 — Ouvertures, baies, cotes === */}
      {/* Curtain wall (floor-to-ceiling glazing on upper floor) */}
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 340 280 L 780 280 L 780 380 L 340 380 Z"
      />
      {/* Picture window — ground floor right side */}
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 540 440 L 700 440 L 700 540 L 540 540 Z"
      />
      {/* Pivot door — ground floor left side */}
      <path {...stepAttr('3')} {...draw} d="M 410 470 L 410 580" />
      <path {...stepAttr('3')} {...draw} d="M 470 470 L 470 580" />
      <path {...stepAttr('3')} {...draw} d="M 410 470 L 470 470" />

      {/* Width dimension above the volume */}
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 320 225 L 800 225"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 320 215 L 320 240"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 800 215 L 800 240"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 328 222 L 320 225 L 328 228"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 792 222 L 800 225 L 792 228"
        strokeWidth="0.8"
      />
      <text
        {...stepAttr('3')}
        {...fade}
        x="560"
        y="217"
        textAnchor="middle"
        fontSize="13"
        fontWeight="500"
        fill="#141414"
        stroke="none"
        letterSpacing="0.1em"
      >
        16,00 m
      </text>

      {/* Height dimension on the right */}
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 860 260 L 860 580"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 850 260 L 870 260"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 850 580 L 870 580"
        strokeWidth="0.8"
      />
      <text
        {...stepAttr('3')}
        {...fade}
        x="885"
        y="425"
        fontSize="13"
        fontWeight="500"
        fill="#141414"
        stroke="none"
        letterSpacing="0.1em"
        transform="rotate(90 885 425)"
      >
        8,00 m
      </text>

      {/* Material label — concrete shell */}
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 200 470 L 320 470 L 380 480"
        strokeWidth="0.7"
        strokeOpacity="0.5"
      />
      <text
        {...stepAttr('3')}
        {...fade}
        x="200"
        y="462"
        fontSize="9"
        fontWeight="500"
        fill="#141414"
        stroke="none"
        letterSpacing="0.18em"
      >
        BÉTON BANCHÉ
      </text>

      {/* Material label — glass curtain wall */}
      <path
        {...stepAttr('3')}
        {...draw}
        d="M 1010 320 L 870 320 L 780 330"
        strokeWidth="0.7"
        strokeOpacity="0.5"
      />
      <text
        {...stepAttr('3')}
        {...fade}
        x="1010"
        y="312"
        fontSize="9"
        fontWeight="500"
        fill="#141414"
        stroke="none"
        letterSpacing="0.18em"
      >
        BAIE VITRÉE
      </text>

      {/* === STEP 4 — Détails, paysage & tampon === */}
      {/* Curtain wall mullions (vertical) */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 450 280 L 450 380"
        strokeWidth="0.7"
      />
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 560 280 L 560 380"
        strokeWidth="0.7"
      />
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 670 280 L 670 380"
        strokeWidth="0.7"
      />
      {/* Curtain wall mid-rail (horizontal) */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 340 330 L 780 330"
        strokeWidth="0.7"
      />

      {/* Picture window mullions */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 620 440 L 620 540"
        strokeWidth="0.7"
      />
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 540 490 L 700 490"
        strokeWidth="0.7"
      />

      {/* Door handle */}
      <circle
        {...stepAttr('4')}
        {...draw}
        cx="460"
        cy="525"
        r="2"
        strokeWidth="0.7"
      />

      {/* Entrance plinth / step */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 405 580 L 405 595 L 475 595 L 475 580"
        strokeWidth="0.7"
      />

      {/* Cantilever shadow indication (right) */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 720 405 L 800 405"
        strokeWidth="0.6"
        strokeOpacity="0.5"
      />

      {/* Reflecting pool */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 380 605 L 700 605 L 700 625 L 380 625 Z"
        strokeWidth="0.8"
      />
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 400 612 L 680 612"
        strokeWidth="0.4"
        strokeOpacity="0.45"
      />
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 400 619 L 680 619"
        strokeWidth="0.4"
        strokeOpacity="0.45"
      />

      {/* Trees — minimalist, on the open left side */}
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 220 580 L 220 530"
        strokeWidth="0.9"
      />
      <circle
        {...stepAttr('4')}
        {...draw}
        cx="220"
        cy="513"
        r="20"
        strokeOpacity="0.6"
      />
      <path
        {...stepAttr('4')}
        {...draw}
        d="M 270 580 L 270 555"
        strokeWidth="0.9"
      />
      <circle
        {...stepAttr('4')}
        {...draw}
        cx="270"
        cy="544"
        r="12"
        strokeOpacity="0.55"
      />

      {/* Stamp — finale */}
      <g
        {...stepAttr('4')}
        {...fade}
        transform="translate(1010 470) rotate(-12)"
        opacity={variant === 'animated' ? 0 : 1}
      >
        <path
          {...stepAttr('4')}
          {...draw}
          d="M -85 -36 L 85 -36 L 85 36 L -85 36 Z"
          strokeWidth="1.2"
        />
        <path
          {...stepAttr('4')}
          {...draw}
          d="M -78 -29 L 78 -29 L 78 29 L -78 29 Z"
          strokeOpacity="0.5"
          strokeWidth="0.7"
        />
        <text
          x="0"
          y="-8"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#141414"
          stroke="none"
          letterSpacing="0.22em"
        >
          PERMIS DE
        </text>
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#141414"
          stroke="none"
          letterSpacing="0.22em"
        >
          CONSTRUIRE
        </text>
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fontSize="9"
          fill="#141414"
          stroke="none"
          letterSpacing="0.32em"
          opacity="0.6"
        >
          VALIDÉ
        </text>
      </g>
    </svg>
  );
}

export function ProcessSectionBlueprint() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop only : pinned scroll-driven blueprint reveal.
      mm.add('(min-width: 768px)', () => {
        const root = container.current;
        if (!root) return;

        const desktopRoot = root.querySelector<HTMLElement>('.blueprint-pin');
        if (!desktopRoot) return;

        const paths =
          desktopRoot.querySelectorAll<SVGGeometryElement>('[data-draw]');
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(desktopRoot.querySelectorAll('[data-fade]'), {
          opacity: 0,
          scale: 0.95,
          transformOrigin: '50% 50%',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${(STEPS.length - 1) * window.innerHeight}`,
            pin: '.blueprint-pin',
            scrub: 1,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (STEPS.length - 1));
              setActiveIndex(idx);
            },
          },
        });

        tl.to(
          desktopRoot.querySelectorAll('[data-step="1"][data-draw]'),
          { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.04 },
          0,
        ).to(
          desktopRoot.querySelectorAll('[data-step="1"][data-fade]'),
          { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.4 },
          0.5,
        );

        tl.to(
          desktopRoot.querySelectorAll('[data-step="2"][data-draw]'),
          { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.06 },
          1,
        );

        tl.to(
          desktopRoot.querySelectorAll('[data-step="3"][data-draw]'),
          { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.03 },
          2,
        ).to(
          desktopRoot.querySelectorAll('[data-step="3"][data-fade]'),
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            duration: 0.5,
            stagger: 0.05,
          },
          2.5,
        );

        tl.to(
          desktopRoot.querySelectorAll('[data-step="4"][data-draw]'),
          { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.025 },
          3,
        ).to(
          desktopRoot.querySelectorAll('[data-step="4"][data-fade]'),
          { opacity: 1, scale: 1, ease: 'back.out(1.6)', duration: 0.5 },
          3.6,
        );
      });
    },
    { scope: container },
  );

  return (
    <section
      id="process"
      ref={container}
      className="bg-[#F8F8F8] relative"
      aria-label="Notre process"
    >
      {/* ============================================================ */}
      {/* DESKTOP — pinned scroll-driven blueprint */}
      {/* ============================================================ */}
      <div className="hidden md:block">
        <div className="blueprint-pin h-screen relative overflow-hidden">
          {/* Background grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #141414 1px, transparent 1px), linear-gradient(to bottom, #141414 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated villa SVG */}
          <ModernVillaSVG
            variant="animated"
            className="absolute inset-0 w-full h-full"
          />

          {/* Header strip */}
          <div className="absolute top-0 left-0 right-0 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pt-16 md:pt-20 z-10">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="block h-px w-10 bg-[#141414]/30" />
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/60">
                Notre process
              </span>
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/30 ml-auto hidden md:block">
                03 / 04
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-[#141414] max-w-[760px]">
              Un trait, un geste, un projet construit.
            </h2>
          </div>

          {/* Active step text */}
          <div className="absolute bottom-0 left-0 right-0 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pb-10 md:pb-14 z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
              <div
                className="md:col-span-4 p-5 md:p-6"
                style={{
                  background: 'rgba(248, 248, 248, 0.92)',
                  backdropFilter: 'blur(10px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(140%)',
                  border: '1px solid rgba(20, 20, 20, 0.08)',
                  boxShadow: '0 4px 20px rgba(20, 20, 20, 0.04)',
                }}
              >
                <span
                  key={`num-${activeIndex}`}
                  className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/45 block mb-2 transition-opacity duration-300"
                >
                  Étape {STEPS[activeIndex].number} / 04
                </span>
                <h3
                  key={`title-${activeIndex}`}
                  className="text-[20px] md:text-[24px] font-medium text-[#141414] tracking-tight leading-tight animate-step-in"
                >
                  {STEPS[activeIndex].title}
                </h3>
                <p
                  key={`desc-${activeIndex}`}
                  className="text-[#141414]/65 text-[13px] md:text-[14px] leading-relaxed mt-3 max-w-[420px] animate-step-in"
                >
                  {STEPS[activeIndex].desc}
                </p>
              </div>

              <div className="md:col-span-4 md:col-start-9 flex md:justify-end">
                <ul
                  className="flex flex-col gap-2.5 p-5 md:p-6"
                  style={{
                    background: 'rgba(248, 248, 248, 0.92)',
                    backdropFilter: 'blur(10px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(10px) saturate(140%)',
                    border: '1px solid rgba(20, 20, 20, 0.08)',
                    boxShadow: '0 4px 20px rgba(20, 20, 20, 0.04)',
                  }}
                >
                  {STEPS.map((step, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <li key={step.number} className="flex items-center gap-3">
                        <span
                          className={`block h-px transition-all duration-500 ${
                            isActive ? 'w-10 bg-[#141414]' : 'w-3 bg-[#141414]/20'
                          }`}
                        />
                        <span
                          className={`text-[12px] font-medium tracking-[0.05em] transition-colors whitespace-nowrap ${
                            isActive ? 'text-[#141414]' : 'text-[#A5A5A5]'
                          }`}
                        >
                          {step.number} · {step.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes step-in {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-step-in {
              animation: step-in 400ms cubic-bezier(0.25, 0.1, 0.25, 1) both;
            }
          `}</style>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE — stacked, no pinning, static villa illustration */}
      {/* ============================================================ */}
      <div className="md:hidden px-5 pt-14 pb-14">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block h-px w-8 bg-[#141414]/30" />
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#141414]/60">
            Notre process
          </span>
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#141414]/30 ml-auto">
            03 / 04
          </span>
        </div>

        <h2 className="text-[clamp(1.85rem,8vw,2.6rem)] font-medium tracking-tight leading-[1.08] text-[#141414] mb-8">
          Un trait, un geste,
          <br />
          un projet construit.
        </h2>

        {/* Static villa — full final illustration */}
        <div
          className="relative w-full mb-10 rounded-[2px]"
          style={{
            aspectRatio: '1200 / 700',
            background:
              'linear-gradient(to right, rgba(20,20,20,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,20,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <ModernVillaSVG
            variant="static"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Step cards stacked */}
        <ol className="flex flex-col gap-4">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="border border-[#141414]/10 bg-white/60 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#141414]/45">
                  Étape {step.number} / 04
                </span>
                <span className="block h-px flex-1 bg-[#141414]/15" />
              </div>
              <h3 className="text-[18px] font-medium tracking-tight text-[#141414] leading-snug">
                {step.title}
              </h3>
              <p className="text-[#141414]/65 text-[13.5px] leading-relaxed mt-2">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
