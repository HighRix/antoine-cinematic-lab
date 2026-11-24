'use client';

import { useEffect, useState, type ReactNode } from 'react';

const NAV_LINKS = ['Story', 'Investing', 'Building', 'Advisory'] as const;

function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-opacity ${className ?? ''}`}
      style={{
        opacity: show ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({
  text,
  className,
  style,
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  initialDelay?: number;
  charDelay?: number;
  charDuration?: number;
}) {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setTrigger(true), initialDelay);
    return () => window.clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split('\n');
  let charCount = 0;

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');
        return (
          <span key={lineIdx} className="block">
            {words.map((word, wordIdx) => {
              const chars = Array.from(word).map((ch) => {
                const delay = lineIdx * line.length * charDelay + charCount * charDelay;
                const node = (
                  <span
                    key={charCount}
                    style={{
                      display: 'inline-block',
                      opacity: trigger ? 1 : 0,
                      transform: trigger ? 'translateX(0)' : 'translateX(-18px)',
                      transition: `opacity ${charDuration}ms ease, transform ${charDuration}ms ease`,
                      transitionDelay: `${delay}ms`,
                      willChange: 'transform, opacity',
                    }}
                  >
                    {ch}
                  </span>
                );
                charCount += 1;
                return node;
              });
              return (
                <span
                  key={wordIdx}
                  style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  {chars}
                </span>
              );
            }).reduce<ReactNode[]>((acc, w, i, arr) => {
              acc.push(w);
              if (i < arr.length - 1) acc.push(' ');
              return acc;
            }, [])}
          </span>
        );
      })}
    </h1>
  );
}

export function VexHero() {
  return (
    <div
      className="vex-root relative min-h-screen w-full overflow-hidden bg-black text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <video
        src="/videos/hero-vex.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-12 lg:px-16 pt-6">
        {/* Navbar */}
        <header className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          <a href="#" className="text-2xl font-semibold tracking-tight">
            VEX
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Start a Chat
          </button>
        </header>

        {/* Hero content */}
        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end gap-12">
            <div>
              <AnimatedHeading
                text={'Shaping tomorrow\nwith vision and action.'}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal mb-4 whitespace-nowrap"
                style={{ letterSpacing: '-0.04em' }}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5 whitespace-nowrap">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Start a Chat
                  </button>
                  <button
                    type="button"
                    className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
                  >
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            <div className="flex items-end justify-start lg:justify-end mt-10 lg:mt-0">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <p className="text-lg md:text-xl lg:text-2xl font-light">
                    Investing. Building. Advisory.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
