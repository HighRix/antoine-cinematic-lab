'use client';

import { useState } from 'react';
import { Menu, X, ShoppingCart, ArrowRight } from 'lucide-react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260213_051817_c7d8ccc6-bfaa-417c-8474-e5cefeea26b4.mp4';

const NAV = ['Home', 'Shop', 'Blog', 'About Us', 'Contact Us'];

function Pinwheel({ size = 28 }: { size?: number }) {
  // Abstract 4-blade pinwheel / spinner
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 14 L4 8 A 12 12 0 0 1 14 4 Z"
        fill="#FBFBFD"
      />
      <path
        d="M14 14 L20 4 A 12 12 0 0 1 24 14 Z"
        fill="#FBFBFD"
      />
      <path
        d="M14 14 L24 20 A 12 12 0 0 1 14 24 Z"
        fill="#FBFBFD"
      />
      <path
        d="M14 14 L8 24 A 12 12 0 0 1 4 14 Z"
        fill="#FBFBFD"
      />
    </svg>
  );
}

export default function NewEraHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bebas+Neue&display=swap');
        .ne-inter { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .ne-bebas { font-family: 'Bebas Neue', 'Impact', sans-serif; }
        .ne-gradient-text {
          background: linear-gradient(180deg, rgba(255,255,255,0.83) 0%, rgba(255,255,255,0.12) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ne-root, .ne-root * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      <section
        className="ne-root relative w-full overflow-hidden"
        style={{ background: '#010101', minHeight: '600px', height: '100vh', maxHeight: '965px' }}
      >
        {/* Background video */}
        <video
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden
        />

        {/* Top gradient overlay for nav legibility */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: '260px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Bottom gradient overlay for CTA legibility */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            height: '260px',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Decorative NEW ERA text per spec : vertical gradient white 83%
            top -> white 12% bottom. The bottom of the text is intrinsically
            near-transparent so it dissolves into the bright car body below. */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
          style={{ top: '15%', width: '75%', maxWidth: '1073px' }}
        >
          <h1
            className="ne-gradient-text leading-none text-center font-bold"
            style={{
              fontFamily: "'Bebas Neue', Impact, Haettenschweiler, sans-serif",
              fontSize: 'clamp(96px, 22vw, 360px)',
              letterSpacing: '-0.01em',
            }}
          >
            NEW ERA
          </h1>
        </div>

        {/* Top navbar — z-30 to stay above the foreground video */}
        <nav
          className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between"
          style={{ paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)', paddingTop: '28px', paddingBottom: '28px' }}
        >
          <a href="#" className="flex items-center gap-3">
            <Pinwheel size={28} />
            <span className="hidden sm:inline text-white text-[24px] font-normal tracking-tight">Logoipsum</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[14px] font-normal transition-opacity hover:opacity-100"
                style={{ color: '#EEEFF2', letterSpacing: '-0.32px' }}
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="hidden sm:inline text-[14px] font-medium"
              style={{ color: '#FBFBFD', letterSpacing: '-0.32px' }}
            >
              Sign In
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-[8px] px-5"
              style={{
                height: '48px',
                background: '#FFFFFF',
                color: '#272835',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <ShoppingCart size={18} color="#272835" strokeWidth={1.8} />
              <span className="text-[14px] font-medium" style={{ letterSpacing: '-0.32px' }}>Cart</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-1.5 text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            className="absolute top-20 left-4 right-4 z-30 rounded-2xl p-4 flex flex-col gap-1 lg:hidden"
            style={{ background: 'rgba(1,1,1,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {NAV.map((link) => (
              <a
                key={link}
                href="#"
                className="py-2.5 px-3 rounded-lg text-[14px]"
                style={{ color: '#EEEFF2' }}
              >
                {link}
              </a>
            ))}
            <a href="#" className="py-2.5 px-3 rounded-lg text-[14px] sm:hidden" style={{ color: '#FBFBFD' }}>
              Sign In
            </a>
          </div>
        )}

        {/* Bottom CTA — z-30 above foreground video */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-12"
          style={{
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
            paddingBottom: 'clamp(32px, 5vh, 56px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
            <p
              className="text-white text-[18px] sm:text-[20px] leading-[30px] max-w-[414px]"
            >
              Choose from thousands of certified cars you can trust, transparently priced, because buying a car should feel exciting.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-[8px] px-5 shrink-0"
              style={{
                height: '48px',
                background: '#FFFFFF',
                color: '#272835',
                border: '1px solid #EEEFF2',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <span className="text-[14px] font-medium" style={{ letterSpacing: '-0.32px' }}>Shop Now</span>
              <ArrowRight size={18} color="#272835" strokeWidth={1.8} />
            </a>
          </div>

          <h2
            className="text-white leading-[1] max-w-[466px]"
            style={{
              fontFamily: "'Bebas Neue', Impact, Haettenschweiler, sans-serif",
              fontSize: 'clamp(48px, 6vw, 64px)',
              letterSpacing: '-0.005em',
            }}
          >
            Find the perfect car that fits our journey
          </h2>
        </div>
      </section>
    </>
  );
}
