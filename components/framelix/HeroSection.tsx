'use client';

import { motion } from 'framer-motion';

const NAV_COLS: [string, string][] = [
  ['Reels', 'Services'],
  ['Projects', 'Pipeline'],
  ['Careers', 'Get In Touch'],
];

const MARQUEE_TEXT = 'New! 3D OS V1.2.1 out now!';
const MARQUEE_REPEAT = 6;

function FramelixLogo() {
  return (
    <svg
      width="180"
      height="36"
      viewBox="0 0 360 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Framelix 3D"
    >
      {/* Isometric stacked-frames mark: 3 nested diamond outlines suggesting depth + film frame */}
      <g stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" fill="none">
        <path d="M 36 8 L 64 36 L 36 64 L 8 36 Z" />
        <path d="M 36 20 L 52 36 L 36 52 L 20 36 Z" />
      </g>
      <circle cx="36" cy="36" r="3.5" fill="#FFFFFF" />

      {/* Wordmark */}
      <text
        x="84"
        y="48"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="34"
        fontWeight="600"
        fill="#FFFFFF"
        letterSpacing="-0.045em"
      >
        Framelix
      </text>
      {/* Superscript 3D */}
      <text
        x="260"
        y="22"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="500"
        fill="#FFFFFF"
        letterSpacing="0.04em"
      >
        3D
      </text>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="42"
      height="46"
      viewBox="0 0 27 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 2 H25 V11 a3 3 0 0 0 0 8 V28 H2 V19 a3 3 0 0 0 0 -8 Z"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function Navbar() {
  return (
    <header
      className="framelix-nav relative z-30 flex items-center"
      style={{ padding: '32px 36px 20px', justifyContent: 'space-between', gap: 24 }}
    >
      <a href="#" aria-label="Framelix home" className="flex items-center flex-shrink-0">
        <FramelixLogo />
      </a>

      <nav
        className="hidden md:flex items-start flex-1"
        style={{ justifyContent: 'space-around', paddingLeft: 32, paddingRight: 32 }}
      >
        {NAV_COLS.map((col, i) => (
          <div key={i} className="flex flex-col gap-2">
            {col.map((label) => (
              <a
                key={label}
                href="#"
                className="text-sm text-white/90 hover:text-white transition-colors"
                style={{ letterSpacing: '-0.01em' }}
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Cart"
        className="relative inline-flex items-center justify-center flex-shrink-0"
        style={{ width: 44, height: 48 }}
      >
        <CartIcon />
        <span
          className="absolute inset-0 grid place-items-center text-white text-[14px] font-medium"
          style={{ paddingTop: 1 }}
        >
          0
        </span>
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        src="/videos/hero-framelix.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 text-center text-white"
        style={{ top: 50, zIndex: 20 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="inline-flex items-start gap-1"
          style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}
        >
          <span>Framelix</span>
          <sup style={{ fontSize: '0.5em', fontWeight: 500, lineHeight: 1, marginTop: '0.25em' }}>
            3D
          </sup>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 68px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginTop: 12,
          }}
        >
          Cinematic Motion Studios
        </h1>
      </motion.div>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-center"
        style={{ bottom: '12%', zIndex: 20 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="rounded-full bg-white text-black hover:bg-white/90 transition-colors"
          style={{ fontSize: 22, fontWeight: 500, padding: '16px 56px' }}
        >
          Explore Reel
        </button>
        <p className="text-white/70" style={{ fontSize: 14, fontWeight: 400 }}>
          Ready in 24-48 hours
        </p>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = Array.from({ length: MARQUEE_REPEAT }, (_, i) => i);
  return (
    <div
      className="framelix-marquee relative overflow-hidden"
      style={{ background: '#A6A4FF', padding: '14px 0' }}
    >
      <div className="framelix-marquee-track flex" style={{ gap: 60, whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="text-black font-medium"
            style={{ fontSize: 16, letterSpacing: '-0.01em' }}
          >
            New! 3D<sup style={{ fontSize: '0.6em', fontWeight: 500 }}>OS</sup> V1.2.1 out now!
          </span>
        ))}
      </div>
    </div>
  );
}

function Shipping() {
  return (
    <section
      className="framelix-shipping relative w-full"
      style={{
        background: '#EAEAEA',
        color: '#000',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingBottom: 128,
      }}
    >
      <div className="flex flex-col items-center text-center" style={{ paddingTop: 64 }}>
        <div className="inline-flex items-start gap-1" style={{ fontSize: 20, fontWeight: 500 }}>
          <span>Framelix</span>
          <sup style={{ fontSize: '0.55em', fontWeight: 500, lineHeight: 1, marginTop: '0.25em' }}>
            3D
          </sup>
        </div>
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 52px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginTop: 8,
          }}
        >
          Shipping Now
        </h2>
      </div>

      <div
        className="mx-auto rounded-2xl overflow-hidden"
        style={{
          width: 800,
          maxWidth: '90vw',
          aspectRatio: '1 / 1',
          marginTop: -96,
          marginBottom: -96,
        }}
      >
        <video
          src="/videos/ship-framelix.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="flex flex-col items-center text-center gap-3">
        <button
          type="button"
          className="rounded-full bg-black text-white hover:bg-neutral-800 transition-colors"
          style={{ fontSize: 18, fontWeight: 500, padding: '12px 92px' }}
        >
          Buy Now
        </button>
        <p style={{ fontSize: 20, fontWeight: 450 }}>Explore now</p>
      </div>
    </section>
  );
}

export function FramelixPage() {
  return (
    <div className="framelix-root w-full bg-black text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <Shipping />
    </div>
  );
}
