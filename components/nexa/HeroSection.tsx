'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Hls from 'hls.js';

const HLS_SRC =
  'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function BlurIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SplitWords({
  lines,
  className,
  style,
  baseDelay = 0,
  step = 0.08,
}: {
  lines: ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
  step?: number;
}) {
  // Each line is rendered as a block, with each word animated in.
  let wordIdx = 0;
  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIdx) => {
        if (typeof line === 'string') {
          const words = line.split(' ');
          return (
            <span key={lineIdx} className="block">
              {words.map((w, wi) => {
                const delay = baseDelay + wordIdx * step;
                wordIdx += 1;
                return (
                  <motion.span
                    key={`${lineIdx}-${wi}`}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay, ease: EASE }}
                  >
                    {w}
                    {wi < words.length - 1 ? ' ' : ''}
                  </motion.span>
                );
              })}
            </span>
          );
        }
        // For mixed-style segments (an object with element)
        return (
          <span key={lineIdx} className="block">
            {line}
          </span>
        );
      })}
    </h1>
  );
}

function HlsVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(v);
      hls.on(Hls.Events.MANIFEST_PARSED, () => v.play().catch(() => {}));
    } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = HLS_SRC;
      const onLoaded = () => v.play().catch(() => {});
      v.addEventListener('loadedmetadata', onLoaded);
      return () => v.removeEventListener('loadedmetadata', onLoaded);
    }
    return () => hls?.destroy();
  }, []);
  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover origin-left"
      style={{
        marginLeft: 200,
        transform: 'scale(1.2)',
        transformOrigin: 'left center',
        zIndex: 0,
      }}
    />
  );
}

function LogoMark() {
  return (
    <a href="#" className="inline-flex items-center gap-2 text-white">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2" />
        <circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2.2" fill="#fff" />
      </svg>
      <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.08em' }}>
        LGPSM<sup style={{ fontSize: '0.45em', marginLeft: 2 }}>®</sup>
      </span>
    </a>
  );
}

function Navbar() {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 lg:px-10 py-6"
    >
      <nav className="hidden md:flex items-center gap-7 text-sm text-white/85">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="inline-flex items-center gap-1 hover:text-white transition-colors">
          Product <span aria-hidden style={{ fontSize: 9 }}>▾</span>
        </a>
        <a href="#" className="inline-flex items-center gap-1 hover:text-white transition-colors">
          Company <span aria-hidden style={{ fontSize: 9 }}>▾</span>
        </a>
      </nav>

      <div className="absolute left-1/2 -translate-x-1/2">
        <LogoMark />
      </div>

      <div className="flex items-center gap-5 text-sm text-white/85">
        <a href="#" className="hidden sm:inline-block hover:text-white transition-colors">
          Book a demo
        </a>
        <a href="#" className="hidden sm:inline-block hover:text-white transition-colors">
          Sign in
        </a>
        <a
          href="#"
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-[1.03]"
          style={{ background: '#fff', color: '#070612' }}
        >
          Get started
        </a>
      </div>
    </header>
  );
}

export function NexaHero() {
  return (
    <section
      className="nexa-root relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#070612', color: '#fff' }}
    >
      <HlsVideo />

      {/* Bottom fade gradient */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #070612, transparent)',
          zIndex: 10,
        }}
      />

      <Navbar />

      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-8">
        <BlurIn delay={0} duration={0.6}>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-sm"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Sparkles className="w-3 h-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              New AI Automation Ally
            </span>
          </span>
        </BlurIn>

        <SplitWords
          lines={[
            'Unlock the Power of AI',
            <>
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
              >
                for&nbsp;Your&nbsp;
              </motion.span>
              <motion.span
                className="italic"
                style={{ display: 'inline-block', fontFamily: "'Instrument Serif', serif" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.64, ease: EASE }}
              >
                Business.
              </motion.span>
            </>,
          ]}
          className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2]"
        />

        <BlurIn delay={0.4} duration={0.6}>
          <p
            className="text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            Our cutting-edge AI platform automates, analyzes, and accelerates your workflows so
            you can focus on what really matters.
          </p>
        </BlurIn>

        <BlurIn delay={0.6} duration={0.6}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/book-call"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02]"
              style={{ background: '#fff', color: '#070612' }}
            >
              <span>Book A Free Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full px-8 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/30"
              style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}
            >
              Learn now
            </a>
          </div>
        </BlurIn>
      </div>
    </section>
  );
}
