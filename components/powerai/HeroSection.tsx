'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const NAV_LINKS: { label: string; dropdown?: boolean }[] = [
  { label: 'Features', dropdown: true },
  { label: 'Solutions' },
  { label: 'Plans' },
  { label: 'Learning', dropdown: true },
];

const BRANDS = ['Vortex', 'Nimbus', 'Prysma', 'Cirrus', 'Kynder', 'Halcyn'] as const;

function PowerAILogo() {
  return (
    <svg
      width="132"
      height="32"
      viewBox="0 0 264 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Power AI"
    >
      <defs>
        <linearGradient id="pai-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* 4-point spark / starburst — diamond + intersecting diamond at 45° */}
      <g transform="translate(32 32)">
        <path d="M 0 -22 L 7 0 L 0 22 L -7 0 Z" fill="url(#pai-mark)" />
        <path d="M -22 0 L 0 -7 L 22 0 L 0 7 Z" fill="url(#pai-mark)" />
        <circle r="3" fill="#FFFFFF" />
      </g>
      {/* Wordmark */}
      <text
        x="74"
        y="42"
        fontFamily="'General Sans', Inter, sans-serif"
        fontSize="28"
        fontWeight="500"
        fill="#FFFFFF"
        letterSpacing="-0.03em"
      >
        power
      </text>
      {/* Small AI badge in white-on-glass style */}
      <g transform="translate(196 22)">
        <rect width="44" height="22" rx="11" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
        <text
          x="22"
          y="15.5"
          fontFamily="'General Sans', Inter, sans-serif"
          fontSize="11"
          fontWeight="600"
          fill="#FFFFFF"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          AI
        </text>
      </g>
    </svg>
  );
}

function BackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;
    const FADE = 0.5;

    const tick = () => {
      if (!v) return;
      const t = v.currentTime;
      const d = v.duration || 0;
      let op = 1;
      if (d > 0) {
        if (t < FADE) op = t / FADE;
        else if (t > d - FADE) op = Math.max(0, (d - t) / FADE);
        else op = 1;
      } else {
        op = 0;
      }
      v.style.opacity = String(Math.max(0, Math.min(1, op)));
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      v.style.opacity = '0';
      window.setTimeout(() => {
        if (!v) return;
        v.currentTime = 0;
        v.play().catch(() => {});
      }, 100);
    };

    v.style.opacity = '0';
    v.addEventListener('ended', onEnded);
    raf = requestAnimationFrame(tick);
    v.play().catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/videos/hero-powerai.mp4"
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0, transition: 'none' }}
    />
  );
}

export function PowerAIHero() {
  return (
    <section
      className="powerai-root relative min-h-screen flex flex-col overflow-visible"
      style={{
        background: 'hsl(var(--pai-bg))',
        color: 'hsl(var(--pai-fg))',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundVideo />
      </div>

      {/* Blurred overlay shape behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 984,
          height: 527,
          background: 'hsl(220 30% 5% / 0.9)',
          filter: 'blur(82px)',
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      <header className="relative z-10 w-full">
        <div className="flex items-center justify-between px-8 py-5">
          <a href="#" aria-label="Power AI home" className="flex items-center">
            <PowerAILogo />
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                type="button"
                className="inline-flex items-center gap-1 text-sm hover:text-white transition-colors"
                style={{ color: 'hsl(var(--pai-fg) / 0.9)' }}
              >
                <span>{l.label}</span>
                {l.dropdown && <ChevronDown size={14} />}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="liquid-glass rounded-full px-4 py-2 text-sm font-medium hover:bg-white/5 transition-colors"
            style={{ color: 'hsl(var(--pai-fg))' }}
          >
            Sign Up
          </button>
        </div>
        <div
          className="mx-8 mt-[3px] h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, hsl(var(--pai-fg) / 0.2), transparent)',
          }}
        />
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-5xl">
          <h1
            className="font-normal"
            style={{
              fontFamily: "'General Sans', Inter, sans-serif",
              fontSize: 'clamp(80px, 16vw, 220px)',
              lineHeight: 1.02,
              letterSpacing: '-0.024em',
            }}
          >
            <span style={{ color: 'hsl(var(--pai-fg))' }}>Power </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)',
                WebkitBackgroundClip: 'text',
              }}
            >
              AI
            </span>
          </h1>

          <p
            className="mx-auto text-lg max-w-md"
            style={{
              color: 'hsl(var(--pai-hero-sub))',
              opacity: 0.8,
              lineHeight: '32px',
              marginTop: 9,
            }}
          >
            The most powerful AI ever deployed
            <br />
            in talent acquisition
          </p>

          <div style={{ marginTop: 25 }}>
            <button
              type="button"
              className="liquid-glass rounded-full font-medium hover:bg-white/5 transition-colors"
              style={{
                padding: '24px 29px',
                color: 'hsl(var(--pai-fg))',
                fontSize: 16,
              }}
            >
              Schedule a Consult
            </button>
          </div>
        </div>
      </div>

      {/* Logo marquee */}
      <div className="relative z-10 pb-10">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-12">
          <p
            className="text-sm flex-shrink-0"
            style={{ color: 'hsl(var(--pai-fg) / 0.5)', lineHeight: 1.4 }}
          >
            Relied on by brands
            <br />
            across the globe
          </p>

          <div className="powerai-marquee flex-1 overflow-hidden">
            <div className="powerai-marquee-track flex items-center" style={{ gap: 64 }}>
              {[...BRANDS, ...BRANDS].map((name, i) => (
                <div key={i} className="flex items-center gap-3 flex-shrink-0">
                  <div className="liquid-glass w-6 h-6 rounded-lg grid place-items-center">
                    <span className="text-[11px] font-semibold" style={{ color: '#fff' }}>
                      {name[0]}
                    </span>
                  </div>
                  <span className="text-base font-semibold" style={{ color: 'hsl(var(--pai-fg))' }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
