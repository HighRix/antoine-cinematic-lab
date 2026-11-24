'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const ACCENT = '#5E0ED7';
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NAV_LINKS = ['Story', 'Expertise', 'Studios', 'Feedback'] as const;

const STATS: { num: string; label: string }[] = [
  { num: '300', label: 'Crafted\nBrands' },
  { num: '200', label: 'Digital\nProducts' },
  { num: '100', label: 'Ventures\nFunded' },
];

const HEADING_WORDS = ['Fearless', 'Vision', 'Delivered'] as const;

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};

function Logo() {
  return (
    <div
      className="rounded-full"
      style={{
        width: 32,
        height: 32,
        border: `2px solid ${ACCENT}`,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <span
        className="block rounded-full"
        style={{ width: 10, height: 10, background: ACCENT }}
      />
    </div>
  );
}

export function TribeHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="tribe-root relative min-h-screen w-full overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif", color: '#000' }}
    >
      <video
        src="/videos/hero-tribe.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Logo />
          </motion.div>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((label, i) => (
              <motion.a
                key={label}
                href="#"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.5, ease: EASE }}
                className="text-sm font-semibold uppercase tracking-widest text-black"
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <motion.button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
            className="rounded-full grid place-items-center"
            style={{ width: 36, height: 36, background: '#000' }}
          >
            <div className="flex flex-col gap-1">
              <span className="block w-4 h-0.5 bg-white" />
              <span className="block w-4 h-0.5 bg-white" />
              <span className="block w-4 h-0.5 bg-white" />
            </div>
          </motion.button>
        </header>

        {/* Stats row */}
        <div
          className="flex-1 flex items-center justify-end px-5 sm:px-8 md:px-12"
          style={{ paddingTop: 32, paddingBottom: 32 }}
        >
          <div className="flex items-end gap-5 sm:gap-8 md:gap-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i + 2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-right"
              >
                <div
                  className="font-semibold leading-none flex items-start justify-end"
                  style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
                >
                  <span style={{ color: ACCENT, fontSize: '0.5em', lineHeight: 1 }}>+</span>
                  <span style={{ color: '#000' }}>{s.num}</span>
                </div>
                <p
                  className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest leading-tight mt-2 text-right"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div
          className="flex flex-col gap-6 md:gap-12 px-5 sm:px-8 md:px-12 pb-8 md:pb-12"
        >
          {/* Row A: tagline + CTA */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase max-w-[130px] sm:max-w-[160px] md:max-w-xs"
            >
              Shaping Bold
              <br />
              Visions Into Power
              <br />
              For Your Tribe
            </motion.p>

            <motion.a
              href="#"
              custom={6}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-base sm:text-xl md:text-2xl font-semibold uppercase tracking-widest inline-flex items-center gap-2 whitespace-nowrap"
              style={{ color: ACCENT }}
            >
              <span>Work With Us</span>
              <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
            </motion.a>
          </div>

          {/* Row B: description + heading */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.p
              custom={7}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-left md:text-right w-[120px] sm:w-[180px] md:w-[280px] flex-shrink-0"
            >
              Creative Studios Built Around Elevating Your Vision Into Striking Reality
            </motion.p>

            <h1
              className="font-semibold uppercase text-right"
              style={{
                fontSize: 'clamp(2rem, 9vw, 9rem)',
                lineHeight: 0.88,
                color: '#000',
              }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + i * 0.14,
                      ease: EASE,
                    }}
                    style={{ display: 'block' }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white flex flex-col px-5 sm:px-8 pt-5 md:pt-6 pb-8 md:pb-12"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="rounded-full grid place-items-center"
                style={{ width: 36, height: 36, background: '#000' }}
              >
                <X size={18} color="#fff" />
              </button>
            </div>

            <ul className="flex flex-col gap-8 mt-16">
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-semibold uppercase tracking-widest text-black"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-auto inline-flex items-center gap-2 text-xl font-semibold uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              <span>Work With Us</span>
              <ArrowUpRight size={22} strokeWidth={2} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
