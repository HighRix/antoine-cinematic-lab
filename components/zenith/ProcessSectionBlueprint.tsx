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

export function ProcessSectionBlueprint() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // Initial state: all drawable paths hidden (strokeDashoffset = path length)
      const paths = container.current!.querySelectorAll<SVGGeometryElement>('[data-draw]');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set('[data-fade]', { opacity: 0, scale: 0.95, transformOrigin: '50% 50%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${(STEPS.length - 1) * window.innerHeight}`,
          pin: '.blueprint-pin',
          scrub: 1,
          snap: {
            snapTo: 1 / (STEPS.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (STEPS.length - 1));
            setActiveIndex(idx);
          },
        },
      });

      // Step 1 — Terrain + compass + axes (timeline position 0..1)
      tl.to(
        '[data-step="1"][data-draw]',
        { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.04 },
        0,
      ).to(
        '[data-step="1"][data-fade]',
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.4 },
        0.5,
      );

      // Step 2 — Volumes principaux (1..2)
      tl.to(
        '[data-step="2"][data-draw]',
        { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.06 },
        1,
      );

      // Step 3 — Ouvertures + cotes + annotations (2..3)
      tl.to(
        '[data-step="3"][data-draw]',
        { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.03 },
        2,
      ).to(
        '[data-step="3"][data-fade]',
        { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.5, stagger: 0.05 },
        2.5,
      );

      // Step 4 — Détails + tampon (3..4)
      tl.to(
        '[data-step="4"][data-draw]',
        { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.025 },
        3,
      ).to(
        '[data-step="4"][data-fade]',
        { opacity: 1, scale: 1, ease: 'back.out(1.6)', duration: 0.5 },
        3.6,
      );
    },
    { scope: container },
  );

  return (
    <section id="process" ref={container} className="bg-[#F8F8F8] relative" aria-label="Notre process">
      <div className="blueprint-pin h-screen relative overflow-hidden">
        {/* Background grid (very faint) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #141414 1px, transparent 1px), linear-gradient(to bottom, #141414 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Blueprint SVG — full width, behind text */}
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          stroke="#141414"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* === STEP 1 — Terrain, compass, axes === */}
          {/* Horizontal terrain baseline */}
          <path data-step="1" data-draw d="M 80 580 L 1130 580" />
          {/* Ground hatching (small ticks below terrain) */}
          {Array.from({ length: 26 }).map((_, i) => (
            <path
              key={`hatch-${i}`}
              data-step="1"
              data-draw
              d={`M ${100 + i * 40} 582 L ${110 + i * 40} 600`}
              strokeWidth="0.8"
            />
          ))}

          {/* Compass rose top-right */}
          <circle data-step="1" data-draw cx="1080" cy="115" r="42" />
          <circle data-step="1" data-draw cx="1080" cy="115" r="32" strokeOpacity="0.4" />
          <path data-step="1" data-draw d="M 1080 70 L 1080 160" />
          <path data-step="1" data-draw d="M 1035 115 L 1125 115" strokeOpacity="0.4" />
          {/* North arrow filled triangle */}
          <path
            data-step="1"
            data-draw
            d="M 1075 80 L 1080 65 L 1085 80 Z"
            fill="#141414"
          />
          <text
            data-step="1"
            data-fade
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

          {/* Reference cross at origin (bottom-left) */}
          <path data-step="1" data-draw d="M 75 580 L 75 605" strokeWidth="1" />
          <path data-step="1" data-draw d="M 60 605 L 90 605" strokeWidth="1" />
          <text
            data-step="1"
            data-fade
            x="75"
            y="625"
            textAnchor="middle"
            fontSize="9"
            fill="#141414"
            stroke="none"
            letterSpacing="0.15em"
            opacity="0.5"
          >
            0,00
          </text>

          {/* === STEP 2 — Volumes (alpine house elevation) === */}
          {/* Left wall */}
          <path data-step="2" data-draw d="M 380 580 L 380 350" />
          {/* Right wall */}
          <path data-step="2" data-draw d="M 820 580 L 820 350" />
          {/* Wall top connector (eave height) */}
          <path data-step="2" data-draw d="M 380 350 L 820 350" strokeOpacity="0.3" strokeWidth="0.8" />
          {/* Roof left slope */}
          <path data-step="2" data-draw d="M 380 350 L 600 220" />
          {/* Roof right slope */}
          <path data-step="2" data-draw d="M 820 350 L 600 220" />
          {/* Roof ridge mark */}
          <path data-step="2" data-draw d="M 595 215 L 605 215" strokeWidth="1" />

          {/* === STEP 3 — Ouvertures + cotes === */}
          {/* Window left (with frame) */}
          <path data-step="3" data-draw d="M 430 410 L 510 410 L 510 480 L 430 480 Z" />
          {/* Window right */}
          <path data-step="3" data-draw d="M 690 410 L 770 410 L 770 480 L 690 480 Z" />
          {/* Door */}
          <path data-step="3" data-draw d="M 575 460 L 575 580" />
          <path data-step="3" data-draw d="M 625 460 L 625 580" />
          <path data-step="3" data-draw d="M 575 460 L 625 460" />

          {/* Width dimension line — placed JUST above the house so it never overlaps the title block */}
          <path data-step="3" data-draw d="M 380 305 L 820 305" strokeWidth="0.8" />
          <path data-step="3" data-draw d="M 380 295 L 380 320" strokeWidth="0.8" />
          <path data-step="3" data-draw d="M 820 295 L 820 320" strokeWidth="0.8" />
          {/* Width arrowheads */}
          <path data-step="3" data-draw d="M 388 302 L 380 305 L 388 308" strokeWidth="0.8" />
          <path data-step="3" data-draw d="M 812 302 L 820 305 L 812 308" strokeWidth="0.8" />
          <text
            data-step="3"
            data-fade
            x="600"
            y="297"
            textAnchor="middle"
            fontSize="13"
            fontWeight="500"
            fill="#141414"
            stroke="none"
            letterSpacing="0.1em"
          >
            12,00 m
          </text>

          {/* Height dimension line — right side */}
          <path data-step="3" data-draw d="M 880 220 L 880 580" strokeWidth="0.8" />
          <path data-step="3" data-draw d="M 870 220 L 890 220" strokeWidth="0.8" />
          <path data-step="3" data-draw d="M 870 580 L 890 580" strokeWidth="0.8" />
          <text
            data-step="3"
            data-fade
            x="905"
            y="405"
            fontSize="13"
            fontWeight="500"
            fill="#141414"
            stroke="none"
            letterSpacing="0.1em"
            transform="rotate(90 905 405)"
          >
            8,75 m
          </text>

          {/* Material labels with leaders */}
          <path data-step="3" data-draw d="M 200 290 L 320 290 L 380 320" strokeWidth="0.7" strokeOpacity="0.5" />
          <text
            data-step="3"
            data-fade
            x="200"
            y="282"
            fontSize="9"
            fontWeight="500"
            fill="#141414"
            stroke="none"
            letterSpacing="0.18em"
          >
            BARDAGE BOIS
          </text>

          <path data-step="3" data-draw d="M 1010 280 L 870 280 L 720 240" strokeWidth="0.7" strokeOpacity="0.5" />
          <text
            data-step="3"
            data-fade
            x="1010"
            y="272"
            fontSize="9"
            fontWeight="500"
            fill="#141414"
            stroke="none"
            letterSpacing="0.18em"
          >
            TOIT INCLINÉ 35°
          </text>

          {/* === STEP 4 — Détails + tampon === */}
          {/* Window mullions (left window) */}
          <path data-step="4" data-draw d="M 470 410 L 470 480" strokeWidth="0.7" />
          <path data-step="4" data-draw d="M 430 445 L 510 445" strokeWidth="0.7" />
          {/* Window mullions (right window) */}
          <path data-step="4" data-draw d="M 730 410 L 730 480" strokeWidth="0.7" />
          <path data-step="4" data-draw d="M 690 445 L 770 445" strokeWidth="0.7" />
          {/* Door panel detail */}
          <path data-step="4" data-draw d="M 583 475 L 617 475 L 617 510 L 583 510 Z" strokeWidth="0.7" />
          {/* Door handle */}
          <circle data-step="4" data-draw cx="615" cy="525" r="2" strokeWidth="0.7" />

          {/* Chimney */}
          <path data-step="4" data-draw d="M 680 295 L 680 240 L 720 240 L 720 320" />

          {/* Roof texture lines (parallel to slopes, subtle) */}
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={`roof-tex-l-${i}`}
              data-step="4"
              data-draw
              d={`M ${385 + i * 4} ${355 + i * 2} L ${600 - i * 4} ${228 + i * 2}`}
              strokeWidth="0.4"
              strokeOpacity="0.25"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={`roof-tex-r-${i}`}
              data-step="4"
              data-draw
              d={`M ${600 + i * 4} ${228 + i * 2} L ${815 - i * 4} ${355 + i * 2}`}
              strokeWidth="0.4"
              strokeOpacity="0.25"
            />
          ))}

          {/* Eaves overhang */}
          <path data-step="4" data-draw d="M 360 360 L 380 350" strokeWidth="0.8" />
          <path data-step="4" data-draw d="M 820 350 L 840 360" strokeWidth="0.8" />

          {/* === Stamp (Step 4 finale) === */}
          <g
            data-step="4"
            data-fade
            transform="translate(1000 470) rotate(-12)"
            opacity="0"
          >
            <path data-step="4" data-draw d="M -85 -36 L 85 -36 L 85 36 L -85 36 Z" strokeWidth="1.2" />
            <path
              data-step="4"
              data-draw
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

        {/* Header strip */}
        <div className="absolute top-0 left-0 right-0 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pt-16 md:pt-20 z-10">
          {/* Eyebrow row stays full width without a card (it's small and sits above the SVG content) */}
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

        {/* Active step text — bottom-left card with backdrop so it reads cleanly over the SVG */}
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

            {/* Step navigator (right) — own backdrop card for parity */}
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

        {/* Local style for the step text micro-animation */}
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
    </section>
  );
}
