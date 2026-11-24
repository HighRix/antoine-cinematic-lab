'use client';

function ChamferedButton({
  width,
  height,
  fontSize,
  label,
}: {
  width: number;
  height: number;
  fontSize: number;
  label: string;
}) {
  // Chamfer cuts proportional to height — same shape language as the main GET STARTED CTA.
  const cut = Math.round(height * 0.18);
  return (
    <button
      type="button"
      className="relative transition-transform duration-200 hover:scale-105 active:scale-95"
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path
          d={`M ${cut} 0 L ${width} 0 L ${width} ${height - cut} L ${width - cut} ${height} L 0 ${height} L 0 ${cut} Z`}
          fill="#ffffff"
        />
      </svg>
      <span
        className="relative inline-flex items-center justify-center w-full h-full uppercase font-bold"
        style={{
          fontFamily: "'Rubik', sans-serif",
          fontSize,
          color: '#161a20',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function LogoMark() {
  return (
    <a href="#" className="inline-flex items-center gap-2 text-white">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2" />
        <circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.2" fill="#fff" />
      </svg>
      <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.1em' }}>
        LGPSM<sup style={{ fontSize: '0.45em', marginLeft: 2 }}>®</sup>
      </span>
    </a>
  );
}

function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <LogoMark />
        <nav
          className="hidden md:flex items-center gap-7 text-white text-sm uppercase"
          style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 500, letterSpacing: '0.08em' }}
        >
          <a href="#" className="hover:opacity-80 transition-opacity">Home</a>
          <a href="#" className="hover:opacity-80 transition-opacity">About</a>
          <a href="#" className="hover:opacity-80 transition-opacity">Contact Us</a>
        </nav>
      </div>

      <ChamferedButton width={132} height={42} fontSize={12} label="Contact Us" />
    </header>
  );
}

function InfoCard() {
  return (
    <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-20 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="inline-block pointer-events-auto rounded-2xl backdrop-blur-md px-6 py-5 max-w-xs"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#fff',
          }}
        >
      <span
        className="inline-block text-[10px] tracking-[0.2em] uppercase opacity-80"
        style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 500 }}
      >
        [ 2025 ]
      </span>
      <h2
        className="mt-3 text-xl md:text-2xl font-bold leading-tight"
        style={{ fontFamily: "'Rubik', sans-serif" }}
      >
        Taught by{' '}
        <em
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          Industry
        </em>
        <br />
        Professionals
      </h2>
      <p
        className="mt-2 text-xs opacity-80 leading-relaxed"
        style={{ fontFamily: "'Rubik', sans-serif" }}
      >
        Get mentorship and instruction from
        <br />
        top tech software engineers.
      </p>
        </div>
      </div>
    </div>
  );
}

export function EraHero() {
  return (
    <section
      className="era-root relative min-h-screen w-full overflow-hidden"
      style={{ background: '#21346e' }}
    >
      <video
        src="/videos/hero-era.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <Navbar />
      <InfoCard />

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12"
        style={{ paddingTop: 'clamp(8rem, 18vw, 12rem)' }}
      >
        <h1
          className="text-white font-bold uppercase"
          style={{
            fontFamily: "'Rubik', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 100px)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
          }}
        >
          <span className="block">NEW ERA</span>
          <span className="block">OF DESIGN</span>
          <span className="block">STARTS NOW</span>
        </h1>

        <div className="mt-10">
          <ChamferedButton width={184} height={65} fontSize={20} label="Get Started" />
        </div>
      </div>
    </section>
  );
}
