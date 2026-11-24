'use client';

import { useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Home', active: true },
  { label: 'Studio' },
  { label: 'About' },
  { label: 'Journal' },
  { label: 'Reach Us' },
];

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
      if (d > 0 && t > d - FADE) {
        op = Math.max(0, (d - t) / FADE);
      }
      v.style.opacity = String(Math.max(0, Math.min(1, op)));
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      window.setTimeout(() => {
        if (!v) return;
        v.currentTime = 0;
        v.style.opacity = '1';
        v.play().catch(() => {});
      }, 100);
    };

    v.style.opacity = '1';
    v.addEventListener('ended', onEnded);
    raf = requestAnimationFrame(tick);
    v.play().catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div
      className="absolute"
      style={{ inset: 'auto 0 0 0', top: 300, zIndex: 0 }}
    >
      <video
        ref={ref}
        src="/videos/hero-aethera.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-auto object-cover block"
        style={{ opacity: 1 }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #FFFFFF 0%, transparent 30%, transparent 70%, #FFFFFF 100%)',
        }}
      />
    </div>
  );
}

export function AetheraHero() {
  return (
    <div className="aethera-root relative min-h-screen w-full overflow-hidden" style={{ background: '#FFFFFF' }}>
      <BackgroundVideo />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <a href="#" className="aethera-display text-3xl tracking-tight" style={{ color: '#000' }}>
          Aethera<sup style={{ fontSize: '0.4em', verticalAlign: 'super', marginLeft: 2 }}>®</sup>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href="#"
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: l.active ? '#000' : '#6F6F6F' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full transition-transform duration-200 hover:scale-[1.03]"
          style={{
            background: '#000',
            color: '#fff',
            padding: '10px 24px',
            fontSize: 14,
          }}
        >
          Begin Journey
        </button>
      </nav>

      <section
        className="relative z-10 flex flex-col items-center text-center px-6 pb-40"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        <h1
          className="aethera-display aethera-fade-rise text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal"
          style={{
            color: '#000',
            lineHeight: 0.95,
            letterSpacing: '-2.46px',
          }}
        >
          Beyond <em style={{ color: '#6F6F6F', fontStyle: 'italic' }}>silence,</em> we build{' '}
          <em style={{ color: '#6F6F6F', fontStyle: 'italic' }}>the eternal.</em>
        </h1>

        <p
          className="aethera-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}
        >
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the
          noise, we craft digital havens for deep work and pure flows.
        </p>

        <button
          type="button"
          className="aethera-fade-rise-delay-2 rounded-full mt-12 transition-transform duration-200 hover:scale-[1.03]"
          style={{
            background: '#000',
            color: '#fff',
            padding: '20px 56px',
            fontSize: 16,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Begin Journey
        </button>
      </section>
    </div>
  );
}
