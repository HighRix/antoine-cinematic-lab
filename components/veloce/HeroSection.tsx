'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function BlurIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={inView ? { filter: 'blur(0px)', opacity: 1 } : undefined}
      transition={{ duration: 1.2, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

const NAV_LINKS = ['Home', 'About us', 'FAQ'] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 w-full flex items-center justify-between px-6 md:px-12 lg:px-[60px] py-6">
      <div className="flex items-center gap-12">
        <a
          href="#"
          className="font-manrope font-semibold text-2xl md:text-3xl"
          style={{ color: '#00041F' }}
        >
          veloce
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="font-helvetica text-base hover:opacity-70 transition-opacity"
              style={{ color: '#00041F' }}
            >
              {l}
            </a>
          ))}
        </nav>
      </div>

      <div className="hidden lg:flex items-center gap-5">
        <a
          href="#"
          className="font-inter font-medium text-base hover:opacity-70 transition-opacity"
          style={{ color: '#00041F' }}
        >
          Log in
        </a>
        <a
          href="#"
          className="font-inter font-medium text-base px-6 py-2.5 rounded-[40px] hover:opacity-90"
          style={{ background: '#00041F', color: '#EFF4FF' }}
        >
          Sign up
        </a>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        className="lg:hidden inline-flex items-center justify-center"
        style={{ color: '#00041F' }}
        onClick={() => setOpen((o) => !o)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="m"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden absolute top-24 left-0 right-0 bg-white shadow-lg mx-4 rounded-lg px-6 py-8 z-50"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l}
                  href="#"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="font-helvetica text-lg"
                  style={{ color: '#00041F' }}
                  onClick={() => setOpen(false)}
                >
                  {l}
                </motion.a>
              ))}
              <div className="border-t border-black/10 pt-5 flex flex-col gap-3">
                <a
                  href="#"
                  className="font-inter font-medium text-base"
                  style={{ color: '#00041F' }}
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="font-inter font-medium text-base px-6 py-2.5 rounded-[40px] text-center"
                  style={{ background: '#00041F', color: '#EFF4FF' }}
                >
                  Sign up
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function StoreBadges() {
  return (
    <div className="flex items-center gap-3">
      <a
        href="#"
        className="flex items-center gap-3 px-3 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
        style={{ borderColor: '#00041F' }}
      >
        <img
          src="/images/veloce/google-play.png"
          alt=""
          className="w-6 h-7 object-contain"
          draggable={false}
        />
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-product-sans uppercase" style={{ color: '#00041F' }}>
            GET IT ON
          </span>
          <span className="text-sm font-product-sans font-bold" style={{ color: '#00041F' }}>
            Google Play
          </span>
        </div>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 px-3 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
        style={{ borderColor: '#00041F' }}
      >
        <img
          src="/images/veloce/app-store.png"
          alt=""
          className="w-6 h-7 object-contain"
          draggable={false}
        />
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-sf-compact" style={{ color: '#00041F' }}>
            Download on the
          </span>
          <span className="text-sm font-sf-compact font-medium" style={{ color: '#00041F' }}>
            App Store
          </span>
        </div>
      </a>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 md:px-12 pb-12 md:pb-16 relative">
      <div
        className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #fff, transparent)' }}
        aria-hidden
      />

      <div className="flex-1 flex items-center justify-center">
        <BlurIn>
          <h1
            className="text-center font-helvetica-neue font-medium leading-tight max-w-2xl"
            style={{ color: '#010828' }}
          >
            <span className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em]">
              Fast payments, your way at{' '}
            </span>
            <span
              className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #B56939, #5C3779, #454BBB)',
              }}
            >
              lightspeed.
            </span>
          </h1>
        </BlurIn>
      </div>

      <div className="relative z-30 flex flex-col items-center gap-6">
        <p
          className="text-base md:text-lg font-helvetica-neue text-center"
          style={{ color: '#49484F' }}
        >
          Handle finances with ease and power
        </p>
        <StoreBadges />
      </div>
    </div>
  );
}

type CardData = {
  video: string;
  overlay: string;
  stat: string;
  desc: string;
  descMax: number;
  minH: number;
};

const CARDS: CardData[] = [
  {
    video: '/videos/veloce/card1.mp4',
    overlay: 'rgba(206,223,235,0.25)',
    stat: '1.6M',
    desc: 'Active members rely on us for effortless payment experiences',
    descMax: 377,
    minH: 450,
  },
  {
    video: '/videos/veloce/card2.mp4',
    overlay: 'rgba(247,236,233,0.6)',
    stat: '850К',
    desc: 'Transfers completed each day, quick and protected',
    descMax: 351,
    minH: 350,
  },
  {
    video: '/videos/veloce/card3.mp4',
    overlay: 'rgba(218,218,218,0.2)',
    stat: '120+',
    desc: 'Nations enabled for instant checkouts and worldwide remittance',
    descMax: 351,
    minH: 450,
  },
];

function InsightsSection() {
  return (
    <section className="bg-white px-6 md:px-12 lg:px-[60px] py-20 flex flex-col gap-[90px]">
      <div className="max-w-[517px] flex flex-col gap-10">
        <BlurIn>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-helvetica-neue font-medium tracking-[-0.03em]"
            style={{ color: '#00041F', lineHeight: 1 }}
          >
            Instant payment clarity counts
          </h2>
        </BlurIn>
        <p
          className="text-base md:text-lg lg:text-xl font-helvetica-neue max-w-[361px]"
          style={{ color: '#49484F' }}
        >
          Real-time data powers smarter spending choices every day
        </p>
      </div>

      <motion.div
        className="flex flex-col lg:flex-row items-stretch lg:items-end gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {CARDS.map((c, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
            className="flex-1 p-10 rounded-[40px] relative overflow-hidden flex flex-col justify-end"
            style={{ minHeight: c.minH }}
          >
            <video
              src={c.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: c.overlay }} />
            <div className="relative z-10 max-w-[388px] flex flex-col gap-5">
              <div
                className="text-5xl md:text-[60px] font-helvetica-neue font-medium"
                style={{ lineHeight: 1, color: '#00041F' }}
              >
                {c.stat}
              </div>
              <p
                className="text-lg md:text-[22px] font-helvetica-neue opacity-80"
                style={{ color: '#49484F', maxWidth: c.descMax }}
              >
                {c.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TextFillSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const wh = window.innerHeight;
      const startFill = wh * 0.8;
      const endFill = wh * 0.2;
      if (top > startFill) {
        setFillPercentage(0);
        return;
      }
      if (top < endFill) {
        setFillPercentage(100);
        return;
      }
      const pct = ((startFill - top) / (startFill - endFill)) * 100;
      setFillPercentage(Math.max(0, Math.min(100, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const text =
    'Handle payments fast & sleek! Track expenses, reach targets, unlock insights to make sharper decisions, all in one app';

  return (
    <section
      ref={ref}
      className="flex justify-center items-center px-6 md:px-16 py-24 md:py-32 bg-white"
      style={{ marginBottom: '30vh' }}
    >
      <div className="max-w-2xl w-full text-center relative">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-helvetica-neue font-medium leading-tight relative tracking-[-0.03em]"
        >
          <span className="block" style={{ color: '#B8B7BA' }}>
            {text}
          </span>
          <span
            className="absolute inset-0 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, #B56939, #5C3779, #454BBB)',
              clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
              transition: 'clip-path 0.1s linear',
            }}
          >
            {text}
          </span>
        </h2>
      </div>
    </section>
  );
}

export function VelocePage() {
  return (
    <div className="veloce-root min-h-screen bg-white">
      <div className="h-screen flex flex-col relative">
        <video
          src="/videos/veloce/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[10%_center] md:object-center"
          style={{ zIndex: 0 }}
        />
        <Header />
        <Hero />
      </div>
      <InsightsSection />
      <TextFillSection />
    </div>
  );
}
