'use client';
import { Navbar } from './Navbar';
import { PowerBoxAssemble as OutletAssemble } from './PowerBoxAssemble';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: '#0F0F0F' }}
    >
      {/* Coded outlet assembly — replaces the video, vertically centered on the right */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[3%] sm:right-[5%] md:right-[8%] w-[48%] sm:w-[42%] md:w-[38%] lg:w-[36%] aspect-square z-0">
        <OutletAssemble />
      </div>

      {/* Soft green ambient glow on the right, hinting at the ignition */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-2/3 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 65% 50%, rgba(3, 232, 64, 0.06) 0%, transparent 55%)',
        }}
      />

      {/* Subtle dark gradient at the bottom for hero text legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(15,15,15,0) 0%, rgba(15,15,15,0.5) 60%, rgba(15,15,15,0.85) 100%)',
        }}
      />

      <Navbar />

      {/* Hero content — bottom-left.
          pointer-events-none on the wrapper so it doesn't block the 3D canvas behind it.
          pointer-events-auto only re-enabled on actually interactive elements (CTAs). */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-16 pb-20 lg:pb-28 pt-32 pointer-events-none">
        <h1
          className="text-6xl sm:text-7xl lg:text-[7rem] font-light leading-[0.92] tracking-tight max-w-[780px] tanli-fade-up"
          style={{ color: '#F5F5F5', animationDelay: '200ms' }}
        >
          Câblé pour
          <br />
          l&apos;exigence.
        </h1>

        <p
          className="text-base lg:text-lg max-w-xl mt-7 mb-10 tanli-fade-up"
          style={{ color: '#999999', animationDelay: '450ms' }}
        >
          Installation, rénovation et domotique haut de gamme pour résidences,
          chalets et professionnels en Haute-Savoie.
        </p>

        <div
          className="flex flex-wrap gap-6 sm:gap-8 tanli-fade-up pointer-events-auto"
          style={{ animationDelay: '650ms' }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg font-semibold uppercase text-[11px] tracking-[0.18em] px-8 h-11 transition-all active:scale-[0.97]"
            style={{ background: '#03E840', color: '#0A0A0A' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1FF555')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#03E840')}
          >
            Demander un devis
          </a>
          <a
            href="#services"
            className="inline-flex items-center uppercase text-[11px] tracking-[0.18em] pb-1 border-b transition-colors active:scale-[0.97]"
            style={{ color: '#F5F5F5', borderColor: '#03E840' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#03E840')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F5')}
          >
            En savoir plus
          </a>
        </div>
      </div>
    </section>
  );
}
