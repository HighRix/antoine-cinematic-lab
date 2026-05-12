'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4';

const NAV = ['Home', 'Features', 'Pricing', 'About'];

const COLORS = {
  bg: 'hsl(240 67% 1%)',
  fg: 'hsl(0 0% 100%)',
  primary: 'hsl(73 98% 57%)',
  primaryFg: 'hsl(240 67% 1%)',
  secondary: 'hsl(0 0% 100%)',
  secondaryFg: 'hsl(240 67% 1%)',
  muted: 'hsl(240 10% 12%)',
  mutedFg: 'hsl(0 0% 82% / 0.8)',
  border: 'hsl(0 0% 100% / 0.1)',
};

const FADE_OUT_START = 1.5; // seconds before end
const FADE_OUT_REACH_ZERO = 0.3; // seconds before end (opacity = 0)
const FADE_IN_DURATION = 1.0; // first seconds after restart

export default function WeblexHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;

    const tick = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        const t = video.currentTime;
        const d = video.duration;
        const timeToEnd = d - t;
        let opacity = 1;

        if (t < FADE_IN_DURATION) {
          opacity = t / FADE_IN_DURATION;
        } else if (timeToEnd <= FADE_OUT_REACH_ZERO) {
          opacity = 0;
        } else if (timeToEnd <= FADE_OUT_START) {
          opacity =
            (timeToEnd - FADE_OUT_REACH_ZERO) /
            (FADE_OUT_START - FADE_OUT_REACH_ZERO);
        }

        video.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className="weblex-root min-h-screen relative overflow-hidden"
      style={{ background: COLORS.bg, color: COLORS.fg }}
    >
      <style>{`
        .weblex-root, .weblex-root * {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        }
        .weblex-root ::selection {
          background: ${COLORS.primary};
          color: ${COLORS.primaryFg};
        }
      `}</style>

      {/* Navbar — fully transparent, fixed */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <a href="#" className="flex items-center gap-1.5 text-xl font-semibold tracking-tight">
          <span style={{ color: COLORS.fg }}>Weblex</span>
          <span
            aria-hidden
            className="inline-block rounded-full"
            style={{ width: 8, height: 8, background: COLORS.primary, marginLeft: 2, marginBottom: -2 }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: COLORS.mutedFg }}
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="hidden md:inline-flex items-center text-sm font-medium px-4 py-2 rounded-full transition-[filter] hover:brightness-110"
          style={{ background: COLORS.primary, color: COLORS.primaryFg }}
        >
          Get Started
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 rounded-full"
          style={{ color: COLORS.fg }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed top-16 left-4 right-4 z-40 rounded-2xl p-4 flex flex-col gap-2 md:hidden"
          style={{ background: COLORS.muted, border: `1px solid ${COLORS.border}` }}
        >
          {NAV.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm py-2 px-3 rounded-lg transition-colors"
              style={{ color: COLORS.mutedFg }}
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="mt-2 inline-flex items-center justify-center text-sm font-medium px-4 py-2.5 rounded-full"
            style={{ background: COLORS.primary, color: COLORS.primaryFg }}
          >
            Get Started
          </a>
        </div>
      )}

      {/* Hero section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0 }}
          aria-hidden
        />

        {/* Content — bottom-aligned, centered, max-width 603px, 100px bottom padding */}
        <div
          className="absolute inset-x-0 flex flex-col items-center text-center px-6 z-10"
          style={{ bottom: '100px' }}
        >
          <div className="w-full max-w-[603px] flex flex-col items-center gap-6">
            <span
              className="inline-flex items-center text-xs px-3 py-1.5 rounded-full"
              style={{
                border: `1px solid ${COLORS.border}`,
                color: COLORS.mutedFg,
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              Introducing Smart Website Builder
            </span>

            <h1
              className="font-medium tracking-tight"
              style={{
                fontSize: 'clamp(36px, 6vw, 62px)',
                lineHeight: 1.1,
                color: COLORS.fg,
              }}
            >
              Turn your big idea into a stunning website
            </h1>

            <p
              className="text-base md:text-[17px] leading-relaxed max-w-[520px]"
              style={{ color: COLORS.mutedFg }}
            >
              Fintech is its potential to promote financial inclusion. In many parts of the
              world, millions of people lack access to traditional banking services.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[18px] font-medium transition-[filter] hover:brightness-110"
                style={{ background: COLORS.primary, color: COLORS.primaryFg }}
              >
                <ArrowUpRight size={18} />
                Get Started Now
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[18px] font-medium transition-[filter] hover:brightness-95"
                style={{ background: COLORS.secondary, color: COLORS.secondaryFg }}
              >
                See Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
