'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'cubic-bezier(0.16, 1, 0.3, 1)' } });

        tl.from('.hero-tag', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
          .from('.hero-line', { y: 80, opacity: 0, duration: 1.2, stagger: 0.15 }, '-=0.4')
          .from('.hero-sub', { y: 30, opacity: 0, duration: 1 }, '-=0.6')
          .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
          .from('.hero-scroll-indicator', { opacity: 0, duration: 1 }, '-=0.3');
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.hero-tag', '.hero-line', '.hero-sub', '.hero-cta', '.hero-scroll-indicator'], {
          opacity: 1,
          y: 0,
        });
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
    >
      {/* Background video — wheat field golden hour. Mobile re-centre vers
          la prairie (plus dense, plus saturée) et évite le ciel délavé. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover bg-[#FAF7F0] [object-position:50%_65%] sm:[object-position:50%_50%]"
        aria-hidden="true"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_150921_27df94bd-d1e3-4440-9f55-314c4611902b.mp4"
          type="video/mp4"
        />
      </video>

      {/* Soft cream gradient overlay — desktop : équilibré haut/bas.
          Mobile : haut plus marqué pour fondre la zone supérieure claire
          dans le bg crème du site, et donner du contraste au tag/titre. */}
      <div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(250,247,240,0.85) 0%, rgba(250,247,240,0.55) 18%, rgba(250,247,240,0.15) 38%, rgba(250,247,240,0.05) 60%, rgba(250,247,240,0.4) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          background:
            'linear-gradient(180deg, rgba(250,247,240,0.35) 0%, rgba(250,247,240,0.05) 30%, rgba(250,247,240,0.05) 70%, rgba(250,247,240,0.6) 100%)',
        }}
      />

      {/* Content : mobile commence haut (justify-start), desktop centré. */}
      <div className="relative z-10 flex-1 flex flex-col justify-start sm:justify-center max-w-[1600px] mx-auto w-full px-5 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-32 md:pt-40 pb-12 sm:pb-24 md:pb-32">
        {/* Tag */}
        <div className="hero-tag inline-flex items-center gap-3 mb-6 sm:mb-8 md:mb-10">
          <span className="w-6 sm:w-8 h-px bg-[#0E7824]" />
          <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#0E7824]">
            120 hectares bio · Nailloux · Haute-Garonne
          </span>
        </div>

        {/* Hero title — Recoleta */}
        <h1 className="font-recoleta text-[#0E7824] leading-[0.95] tracking-tight text-[44px] sm:text-7xl md:text-8xl lg:text-[128px] max-w-5xl">
          <span className="hero-line block">Bio et local</span>
          <span className="hero-line block italic">c&rsquo;est idéal.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub mt-6 sm:mt-8 md:mt-10 text-[#2D2D2F] text-sm sm:text-base md:text-lg lg:text-xl max-w-xl leading-[1.55] sm:leading-[1.6]">
          120 hectares de cultures bio et 900 poules pondeuses en plein air. De la graine à votre
          table, sans intermédiaire.
        </p>

        {/* CTAs */}
        <div className="hero-cta mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
          <a
            href="#produits"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0E7824] text-white text-sm sm:text-base font-medium px-7 sm:px-9 py-3.5 sm:py-4 shadow-md hover:bg-[#0a5a1c] transition-colors"
          >
            Découvrir nos produits
            <ArrowDown className="w-4 h-4" strokeWidth={1.8} />
          </a>
          <a
            href="#ou-trouver"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#2D2D2F] hover:text-[#0E7824] transition-colors link-underline px-2 sm:px-0"
          >
            Où nous trouver
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator (desktop only — mobile uses CTA + natural scroll) */}
      <div className="hero-scroll-indicator hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3 text-[#2D2D2F]/60">
        <span className="text-[10px] tracking-[0.22em] uppercase font-medium">Faites défiler</span>
        <div className="w-px h-12 bg-[#2D2D2F]/30 relative overflow-hidden">
          <span
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0E7824]"
            style={{ animation: 'scrollIndicator 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
