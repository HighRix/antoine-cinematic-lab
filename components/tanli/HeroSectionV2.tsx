'use client';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import { PowerBoxAssemble } from './PowerBoxAssemble';

const GREEN = '#03E840';
const GREEN_SOFT = 'rgba(3, 232, 64, 0.14)';

/* ────────────────────────────────────────────────────────────────
   Animated circuit grid — SVG, very subtle, gives depth
──────────────────────────────────────────────────────────────── */
function CircuitGridBg() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="tanli-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#1F1F1F" strokeWidth="1" />
        </pattern>
        <radialGradient id="tanli-grid-fade" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="60%" stopColor="#000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0F0F0F" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#tanli-grid)" />
      <rect width="100%" height="100%" fill="url(#tanli-grid-fade)" />

      {/* Animated traveling pulses on a couple of grid lines */}
      {[
        { y: 168, dur: '7s', delay: '0s' },
        { y: 392, dur: '9s', delay: '2s' },
        { y: 616, dur: '8s', delay: '4s' },
      ].map((p, i) => (
        <circle key={i} r="2.2" fill={GREEN}>
          <animate
            attributeName="cx"
            from="-40"
            to="2200"
            dur={p.dur}
            begin={p.delay}
            repeatCount="indefinite"
          />
          <animate attributeName="cy" values={`${p.y};${p.y}`} dur={p.dur} repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur={p.dur}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Glow nodes at intersections */}
      {[
        [280, 168], [840, 168], [1456, 168],
        [504, 392], [1120, 392],
        [336, 616], [952, 616], [1568, 616],
      ].map(([cx, cy], i) => (
        <circle key={`n-${i}`} cx={cx} cy={cy} r="1.5" fill={GREEN}>
          <animate
            attributeName="opacity"
            values="0.2;0.9;0.2"
            dur="3.6s"
            begin={`${(i * 0.4).toFixed(1)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   Cursor-following ambient glow
──────────────────────────────────────────────────────────────── */
function AmbientCursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden md:block absolute pointer-events-none"
      style={{
        zIndex: 1,
        width: 640,
        height: 640,
        left: 0,
        top: 0,
        background:
          'radial-gradient(circle at center, rgba(3, 232, 64, 0.10) 0%, rgba(3, 232, 64, 0.04) 35%, transparent 70%)',
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   Animated counter
──────────────────────────────────────────────────────────────── */
function AnimatedNumber({ to, suffix = '', prefix = '', duration = 1600 }: {
  to: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
   Partner marquee — text logos, infinite scroll
──────────────────────────────────────────────────────────────── */
const PARTNERS = [
  'Schneider Electric',
  'Hager',
  'KNX',
  'Loxone',
  'Legrand',
  'Niko',
  'Lutron',
  'Delta Dore',
];

function PartnerMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0F0F0F 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0F0F0F 0%, transparent 100%)' }} />

      <div className="flex gap-14 py-5 tanli-marquee whitespace-nowrap">
        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
          <span
            key={i}
            className="text-[11px] uppercase tracking-[0.22em] font-medium shrink-0"
            style={{ color: 'rgba(245,245,245,0.42)' }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Hero V2
──────────────────────────────────────────────────────────────── */
export function HeroSectionV2() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0F0F0F' }}
    >
      <style jsx global>{`
        @keyframes tanli-marquee-move {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        .tanli-marquee {
          animation: tanli-marquee-move 38s linear infinite;
        }
        @keyframes tanli-pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(3, 232, 64, 0.55); transform: scale(1); }
          50%      { box-shadow: 0 0 0 6px rgba(3, 232, 64, 0); transform: scale(1.1); }
        }
        .tanli-pulse-dot { animation: tanli-pulse-dot 1.8s ease-in-out infinite; }
        @keyframes tanli-title-glow {
          0%, 100% { filter: drop-shadow(0 0 22px rgba(3, 232, 64, 0.10)); }
          50%      { filter: drop-shadow(0 0 32px rgba(3, 232, 64, 0.22)); }
        }
        .tanli-title-glow { animation: tanli-title-glow 5.5s ease-in-out infinite; }
        @keyframes tanli-scroll-cue {
          0%   { transform: translateY(-100%); }
          60%  { transform: translateY(120%); }
          100% { transform: translateY(120%); }
        }
        .tanli-scroll-cue-bar {
          animation: tanli-scroll-cue 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* Layer 0 — circuit grid */}
      <CircuitGridBg />

      {/* Layer 1 — cursor glow */}
      <AmbientCursorGlow />

      {/* Layer 2 — coded box on the right (kept) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[3%] sm:right-[5%] md:right-[8%] w-[48%] sm:w-[42%] md:w-[38%] lg:w-[34%] aspect-square z-[2]">
        <PowerBoxAssemble />
      </div>

      {/* Layer 3 — soft green ambient glow on the right */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-2/3 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 65% 50%, rgba(3, 232, 64, 0.07) 0%, transparent 55%)',
        }}
      />

      {/* Layer 4 — bottom legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 z-[2] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,15,15,0) 0%, rgba(15,15,15,0.55) 60%, rgba(15,15,15,0.92) 100%)',
        }}
      />

      <Navbar />

      {/* Floating trust pill — top center, below navbar */}
      <div
        className="absolute top-[88px] left-1/2 -translate-x-1/2 z-20 tanli-fade-up hidden sm:flex"
        style={{ animationDelay: '100ms' }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#FFB800] text-[12px] tracking-tight">★★★★★</span>
            <span className="text-[11px] font-medium" style={{ color: '#F5F5F5' }}>4,9</span>
            <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: '#999' }}>
              sur Google
            </span>
          </span>
          <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: '#CCC' }}>
            Qualifelec RGE
          </span>
          <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: '#CCC' }}>
            15 ans en Haute-Savoie
          </span>
        </div>
      </div>

      {/* Hero content — bottom-left */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-16 pb-16 lg:pb-20 pt-32 mt-auto pointer-events-none">
        <h1
          className="text-6xl sm:text-7xl lg:text-[7rem] font-light leading-[0.92] tracking-tight max-w-[820px] tanli-fade-up tanli-title-glow"
          style={{
            color: '#F5F5F5',
            animationDelay: '220ms',
            backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #B5B5B5 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Câblé pour
          <br />
          l&apos;<span style={{ color: GREEN, WebkitTextFillColor: GREEN }}>exigence</span>.
        </h1>

        <p
          className="text-base lg:text-lg max-w-xl mt-7 mb-9 tanli-fade-up"
          style={{ color: '#A3A3A3', animationDelay: '420ms' }}
        >
          Installation, rénovation et domotique haut de gamme pour résidences,
          chalets et professionnels en Haute-Savoie. Devis sous 24 h.
        </p>

        <div
          className="flex flex-wrap items-center gap-6 sm:gap-8 tanli-fade-up pointer-events-auto"
          style={{ animationDelay: '600ms' }}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-lg font-semibold uppercase text-[11px] tracking-[0.18em] px-8 h-12 transition-all active:scale-[0.97] overflow-hidden"
            style={{
              background: GREEN,
              color: '#0A0A0A',
              boxShadow: '0 0 0 0 rgba(3, 232, 64, 0)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1FF555';
              e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(3, 232, 64, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = GREEN;
              e.currentTarget.style.boxShadow = '0 0 0 0 rgba(3, 232, 64, 0)';
            }}
          >
            <span className="relative z-10">Demander un devis</span>
            <svg className="relative z-10 ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 uppercase text-[11px] tracking-[0.18em] pb-1 border-b transition-colors active:scale-[0.97]"
            style={{ color: '#F5F5F5', borderColor: GREEN }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F5')}
          >
            En savoir plus
          </a>

          {/* phone CTA — discrete, builds trust */}
          <a
            href="tel:+33450000000"
            className="hidden sm:inline-flex items-center gap-2.5 text-[12px] transition-colors"
            style={{ color: '#999' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-mono">04 50 00 00 00</span>
          </a>
        </div>

        {/* Stats row */}
        <div
          className="mt-14 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px tanli-fade-up max-w-[760px] rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            animationDelay: '780ms',
          }}
        >
          {[
            { num: 240, suf: '+', label: 'Chantiers livrés' },
            { num: 15, suf: ' ans', label: "D'expérience" },
            { num: 4, suf: ',9★', label: 'Avis clients' },
            { num: 24, suf: 'h', label: 'Devis envoyé' },
          ].map((s, i) => (
            <div
              key={i}
              className="px-5 py-4"
              style={{ background: '#0F0F0F' }}
            >
              <div
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ color: '#F5F5F5' }}
              >
                <AnimatedNumber to={s.num} suffix={s.suf} />
              </div>
              <div
                className="mt-1 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: '#888' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom partner marquee */}
      <div className="relative z-10">
        <PartnerMarquee />
      </div>

    </section>
  );
}
