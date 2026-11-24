'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = ['Home', 'Voyages', 'Worlds', 'Innovation'] as const;

function BlurText({
  text,
  className,
  baseDelayMs = 0,
  stepDelayMs = 100,
}: {
  text: string;
  className?: string;
  baseDelayMs?: number;
  stepDelayMs?: number;
}) {
  const words = text.split(' ');
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', willChange: 'filter, opacity, transform' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: (baseDelayMs + i * stepDelayMs) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </h1>
  );
}

export function RailroadHero() {
  const [email, setEmail] = useState('');

  return (
    <section className="railroad-root relative min-h-screen w-full overflow-hidden">
      <video
        src="/videos/hero-railroad.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/5" aria-hidden />

      {/* Navbar */}
      <header className="fixed top-[30px] left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between">
        <a href="#" className="text-2xl tracking-tight text-white" style={{ fontFamily: 'var(--rr-heading)' }}>
          Railroad.ai
        </a>

        <nav className="liquid-glass hidden md:flex items-center gap-1 rounded-full px-2 py-2">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm font-medium px-4 py-1.5 rounded-full"
              style={{ color: 'hsl(0 0% 100% / 0.9)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium"
          style={{
            background: 'hsl(var(--rr-primary))',
            color: 'hsl(var(--rr-primary-foreground))',
          }}
        >
          <span>Get Started</span>
          <ArrowUpRight size={16} strokeWidth={2} />
        </button>
      </header>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-[200px]">
        <motion.div
          className="liquid-glass rounded-full mb-6"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: 'rgba(0, 0, 0, 0.1)' }}
        >
          <span
            className="block text-sm px-4 py-2"
            style={{ color: 'hsl(0 0% 100% / 0.9)', fontFamily: 'var(--rr-body)' }}
          >
            10K+ already subscribed
          </span>
        </motion.div>

        <BlurText
          text="Focus in a Constantly Distracted World"
          className="rr-heading text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.85] tracking-[-4px] max-w-3xl"
          baseDelayMs={300}
          stepDelayMs={100}
        />

        <motion.p
          className="mt-8 text-[calc(1rem+3px)] md:text-[calc(1.125rem+3px)] max-w-2xl leading-tight tracking-[-0.05em]"
          style={{ color: 'hsl(var(--rr-description))', fontFamily: 'var(--rr-body)' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Cut through the noise of notifications, endless feeds, and constant interruptions. Learn how
          to reclaim your attention and do meaningful work that truly matters.
        </motion.p>

        <motion.form
          className="liquid-glass rounded-full mt-10 flex items-center w-full max-w-md"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backdropFilter: 'blur(100px)',
            WebkitBackdropFilter: 'blur(100px)',
            background: 'rgba(0, 0, 0, 0.25)',
            padding: '6px',
            paddingLeft: '24px',
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent border-none outline-none text-sm py-2"
            style={{
              color: '#fff',
              fontFamily: 'var(--rr-body)',
            }}
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium"
            style={{
              background: 'hsl(var(--rr-primary))',
              color: 'hsl(var(--rr-primary-foreground))',
            }}
          >
            <span>Join Waitlist</span>
            <ArrowUpRight size={16} strokeWidth={2} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
