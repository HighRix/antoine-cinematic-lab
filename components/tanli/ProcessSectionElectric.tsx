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
    title: 'Le compteur',
    desc: "Le courant ENEDIS arrive et alimente le bâti. Première étape : poser et raccorder le compteur réglementaire.",
  },
  {
    number: '02',
    title: 'Le tableau électrique',
    desc: 'Le coffret de distribution est dimensionné, les disjoncteurs sont labelisés circuit par circuit, conformément à la NF C 15-100.',
  },
  {
    number: '03',
    title: 'Les circuits',
    desc: "Tirage des câbles depuis le tableau jusqu'aux points d'usage : éclairage, prises, cuisine, chauffage, volets, extérieur.",
  },
  {
    number: '04',
    title: 'La mise sous tension',
    desc: "Tests, vérification de l'isolement, mise en service. L'installation est certifiée Consuel et opérationnelle.",
  },
];

const TERMINAL_LABELS = ['ÉCLAIRAGE', 'PRISES', 'CUISINE', 'CHAUFFAGE', 'VOLETS', 'EXTÉRIEUR'];

export function ProcessSectionElectric() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      // Initialize all drawable paths to invisible (length = dashoffset)
      const paths = container.current!.querySelectorAll<SVGGeometryElement>('[data-draw]');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set('[data-fade]', { opacity: 0 });
      gsap.set('[data-activate]', { stroke: '#444444' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${(STEPS.length - 1) * window.innerHeight}`,
          pin: '.electric-pin',
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (STEPS.length - 1));
            setActiveIndex(idx);
          },
        },
      });

      // Phase 1 (0-1) : Compteur + power line
      tl.to('[data-step="1"][data-draw]', { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.04 }, 0)
        .to('[data-step="1"][data-fade]', { opacity: 1, ease: 'power2.out', duration: 0.4 }, 0.5);

      // Phase 2 (1-2) : Tableau outline + 6 disjoncteurs (staggered)
      tl.to('[data-step="2"][data-draw]', { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.05 }, 1)
        .to('[data-step="2"][data-fade]', { opacity: 1, ease: 'power2.out', duration: 0.4, stagger: 0.04 }, 1.4);

      // Phase 3 (2-3) : 6 branches drawing toward terminals + terminal outlines
      tl.to('[data-step="3"][data-draw]', { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.04 }, 2)
        .to('[data-step="3"][data-fade]', { opacity: 1, ease: 'power2.out', duration: 0.4, stagger: 0.04 }, 2.4);

      // Phase 4 (3-4) : Activation — green stroke pulses on terminals + ON indicator
      tl.to('[data-activate]', { stroke: '#03E840', ease: 'power2.out', duration: 0.5, stagger: 0.06 }, 3)
        .to('[data-step="4"][data-fade]', { opacity: 1, ease: 'back.out(1.5)', duration: 0.5 }, 3.4);
    },
    { scope: container },
  );

  return (
    <section id="process" ref={container} className="relative" style={{ background: '#0F0F0F' }} aria-label="Notre process">
      <div className="electric-pin h-screen relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Schema SVG — anchored TOP-RIGHT, leaving the LEFT free for title + bottom card */}
        <svg
          viewBox="0 60 1200 700"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{
            left: '10%',
            right: '0',
            top: '140px',
            bottom: '220px',
          }}
          stroke="#888888"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* === STEP 1 — Compteur + power line === */}
          {/* Compteur body */}
          <path data-step="1" data-draw d="M 130 100 L 240 100 L 240 180 L 130 180 Z" />
          {/* Display screen */}
          <path data-step="1" data-draw d="M 145 115 L 225 115 L 225 145 L 145 145 Z" strokeWidth="0.9" />
          {/* Display ticks (LCD style) */}
          <path data-step="1" data-draw d="M 152 125 L 218 125" strokeWidth="0.7" strokeOpacity="0.6" />
          <path data-step="1" data-draw d="M 152 132 L 200 132" strokeWidth="0.7" strokeOpacity="0.6" />
          <path data-step="1" data-draw d="M 152 139 L 210 139" strokeWidth="0.7" strokeOpacity="0.6" />
          {/* Compteur connectors */}
          <path data-step="1" data-draw d="M 155 175 L 155 100" strokeWidth="0.7" strokeOpacity="0.4" />
          <path data-step="1" data-draw d="M 215 175 L 215 100" strokeWidth="0.7" strokeOpacity="0.4" />
          {/* Compteur label */}
          <text data-step="1" data-fade x="185" y="200" textAnchor="middle" fontSize="9" fontWeight="500" fill="#888888" stroke="none" letterSpacing="0.18em">
            COMPTEUR ENEDIS
          </text>
          {/* Power line down then right then down to tableau */}
          <path data-step="1" data-draw d="M 185 180 L 185 240 L 600 240 L 600 290" strokeWidth="1.6" />
          {/* Voltage tag */}
          <text data-step="1" data-fade x="395" y="232" textAnchor="middle" fontSize="9" fontWeight="500" fill="#888888" stroke="none" letterSpacing="0.18em">
            230V · 60A
          </text>

          {/* === STEP 2 — Tableau électrique === */}
          {/* Tableau outline */}
          <path data-step="2" data-draw d="M 340 290 L 860 290 L 860 480 L 340 480 Z" strokeWidth="1.6" />
          {/* Header strip */}
          <path data-step="2" data-draw d="M 340 320 L 860 320" strokeWidth="0.9" strokeOpacity="0.6" />
          {/* Header text */}
          <text data-step="2" data-fade x="600" y="312" textAnchor="middle" fontSize="10" fontWeight="600" fill="#999999" stroke="none" letterSpacing="0.22em">
            TABLEAU GÉNÉRAL · NF C 15-100
          </text>

          {/* 6 disjoncteurs (rect + toggle) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 380 + i * 80;
            return (
              <g key={`bk-${i}`}>
                {/* Disjoncteur body */}
                <path data-step="2" data-draw d={`M ${x} 350 L ${x + 60} 350 L ${x + 60} 450 L ${x} 450 Z`} strokeWidth="1.1" />
                {/* Toggle switch line (small lever) */}
                <path data-step="2" data-draw d={`M ${x + 30} 380 L ${x + 30} 415`} strokeWidth="1.4" />
                <path data-step="2" data-draw d={`M ${x + 22} 380 L ${x + 38} 380`} strokeWidth="1.4" />
                {/* Amperage label */}
                <text data-step="2" data-fade x={x + 30} y="438" textAnchor="middle" fontSize="7" fontWeight="500" fill="#888888" stroke="none">
                  {[10, 16, 32, 20, 16, 10][i]}A
                </text>
                {/* Circuit label below tableau */}
                <text data-step="2" data-fade x={x + 30} y="500" textAnchor="middle" fontSize="7" fontWeight="500" fill="#666666" stroke="none" letterSpacing="0.12em">
                  {TERMINAL_LABELS[i]}
                </text>
              </g>
            );
          })}

          {/* === STEP 3 — Branches descendant vers terminaux === */}
          {Array.from({ length: 6 }).map((_, i) => {
            // Disjoncteur bottom point: (380 + i*80 + 30, 450) = (410 + i*80, 450)
            // Terminal x: spread from 200 to 1000 for 6 terminals
            // Centers: 200, 360, 520, 680, 840, 1000... wait that's too spread
            // Let me reconsider: terminals should align under their respective disjoncteurs
            // Disjoncteur centers: 410, 490, 570, 650, 730, 810
            // Terminal centers: same x, just lower y
            const xTop = 410 + i * 80;
            const xTerm = 410 + i * 80;
            return (
              <g key={`br-${i}`}>
                {/* Branch path: down → small bend → down */}
                <path data-step="3" data-draw d={`M ${xTop} 450 L ${xTop} 530 L ${xTerm} 530 L ${xTerm} 600`} data-activate strokeWidth="1.2" />
              </g>
            );
          })}

          {/* === Terminal icons at y=600 to y=680 === */}
          {/* Terminal 1 — ÉCLAIRAGE (lightbulb circle) */}
          <g>
            <circle data-step="3" data-draw cx="410" cy="640" r="22" data-activate strokeWidth="1.3" />
            <path data-step="3" data-draw d="M 402 645 Q 410 632 418 645" data-activate strokeWidth="1.1" />
            <path data-step="3" data-draw d="M 402 655 L 418 655" data-activate strokeWidth="1.1" />
          </g>
          {/* Terminal 2 — PRISES (outlet rect with 2 dots + slot) */}
          <g>
            <path data-step="3" data-draw d="M 470 620 L 510 620 L 510 660 L 470 660 Z" data-activate strokeWidth="1.3" />
            <circle data-step="3" data-draw cx="483" cy="635" r="2" fill="currentColor" stroke="none" />
            <circle data-step="3" data-draw cx="497" cy="635" r="2" fill="currentColor" stroke="none" />
            <path data-step="3" data-draw d="M 480 650 L 500 650" data-activate strokeWidth="1.3" />
          </g>
          {/* Terminal 3 — CUISINE (cooktop with 4 burners) */}
          <g>
            <path data-step="3" data-draw d="M 545 620 L 595 620 L 595 660 L 545 660 Z" data-activate strokeWidth="1.3" />
            <circle data-step="3" data-draw cx="557" cy="632" r="3.5" data-activate strokeWidth="1" />
            <circle data-step="3" data-draw cx="583" cy="632" r="3.5" data-activate strokeWidth="1" />
            <circle data-step="3" data-draw cx="557" cy="650" r="3.5" data-activate strokeWidth="1" />
            <circle data-step="3" data-draw cx="583" cy="650" r="3.5" data-activate strokeWidth="1" />
          </g>
          {/* Terminal 4 — CHAUFFAGE (radiator with fins) */}
          <g>
            <path data-step="3" data-draw d="M 625 620 L 675 620 L 675 660 L 625 660 Z" data-activate strokeWidth="1.3" />
            <path data-step="3" data-draw d="M 633 625 L 633 655" data-activate strokeWidth="0.9" />
            <path data-step="3" data-draw d="M 643 625 L 643 655" data-activate strokeWidth="0.9" />
            <path data-step="3" data-draw d="M 653 625 L 653 655" data-activate strokeWidth="0.9" />
            <path data-step="3" data-draw d="M 663 625 L 663 655" data-activate strokeWidth="0.9" />
          </g>
          {/* Terminal 5 — VOLETS (shutter slats) */}
          <g>
            <path data-step="3" data-draw d="M 705 620 L 755 620 L 755 660 L 705 660 Z" data-activate strokeWidth="1.3" />
            <path data-step="3" data-draw d="M 710 628 L 750 628" data-activate strokeWidth="0.9" />
            <path data-step="3" data-draw d="M 710 636 L 750 636" data-activate strokeWidth="0.9" />
            <path data-step="3" data-draw d="M 710 644 L 750 644" data-activate strokeWidth="0.9" />
            <path data-step="3" data-draw d="M 710 652 L 750 652" data-activate strokeWidth="0.9" />
          </g>
          {/* Terminal 6 — EXTÉRIEUR (lantern: triangle on rectangle) */}
          <g>
            <path data-step="3" data-draw d="M 810 660 L 790 660 L 800 622 Z" data-activate strokeWidth="1.3" />
            <path data-step="3" data-draw d="M 795 660 L 805 660 L 805 670 L 795 670 Z" data-activate strokeWidth="1.1" />
            <path data-step="3" data-draw d="M 795 638 L 805 638" data-activate strokeWidth="0.8" />
          </g>

          {/* === STEP 4 — Activation indicator (LED + ON badge near compteur) === */}
          <circle data-step="4" data-fade cx="280" cy="120" r="6" fill="#03E840" stroke="none" />
          <circle data-step="4" data-fade cx="280" cy="120" r="11" fill="#03E840" fillOpacity="0.25" stroke="none">
            <animate attributeName="r" values="11;16;11" dur="2s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.25;0.05;0.25" dur="2s" repeatCount="indefinite" />
          </circle>
          <text data-step="4" data-fade x="298" y="125" fontSize="11" fontWeight="600" fill="#03E840" stroke="none" letterSpacing="0.18em">
            230V · ON
          </text>
          <text data-step="4" data-fade x="298" y="138" fontSize="8" fontWeight="500" fill="#888888" stroke="none" letterSpacing="0.14em">
            CONSUEL VALIDÉ
          </text>
        </svg>

        {/* Title only — no eyebrow row */}
        <div className="absolute top-0 left-0 right-0 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pt-16 md:pt-20 z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] max-w-[760px]" style={{ color: '#F5F5F5' }}>
            Le tableau qui se câble.
          </h2>
        </div>

        {/* Active step text — bottom-left card */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pb-10 md:pb-14 z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <div
              className="md:col-span-4 p-5 md:p-6"
              style={{
                background: 'rgba(15, 15, 15, 0.85)',
                backdropFilter: 'blur(10px) saturate(140%)',
                WebkitBackdropFilter: 'blur(10px) saturate(140%)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span
                key={`num-${activeIndex}`}
                className="text-[11px] font-medium tracking-[0.18em] uppercase block mb-2"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                Étape {STEPS[activeIndex].number} / 04
              </span>
              <h3
                key={`title-${activeIndex}`}
                className="text-[20px] md:text-[24px] font-medium tracking-tight leading-tight animate-step-in"
                style={{ color: '#F5F5F5' }}
              >
                {STEPS[activeIndex].title}
              </h3>
              <p
                key={`desc-${activeIndex}`}
                className="text-[13px] md:text-[14px] leading-relaxed mt-3 max-w-[420px] animate-step-in"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {STEPS[activeIndex].desc}
              </p>
            </div>

            {/* Step navigator (right) */}
            <div className="md:col-span-4 md:col-start-9 flex md:justify-end">
              <ul
                className="flex flex-col gap-2.5 p-5 md:p-6"
                style={{
                  background: 'rgba(15, 15, 15, 0.85)',
                  backdropFilter: 'blur(10px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(140%)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {STEPS.map((step, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={step.number} className="flex items-center gap-3">
                      <span
                        className="block h-px transition-all duration-500"
                        style={{
                          width: isActive ? '40px' : '12px',
                          background: isActive ? '#03E840' : 'rgba(255,255,255,0.20)',
                        }}
                      />
                      <span
                        className="text-[12px] font-medium tracking-[0.05em] transition-colors whitespace-nowrap"
                        style={{ color: isActive ? '#F5F5F5' : 'rgba(255,255,255,0.45)' }}
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
