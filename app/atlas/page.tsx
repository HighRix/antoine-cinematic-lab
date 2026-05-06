'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { WordsPullUp, WordsPullUpMultiStyle } from '@/components/atlas/WordsPullUp';
import { ScrollRevealText } from '@/components/atlas/AnimatedLetter';

const NOISE_OVERLAY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E`;
const BG_NOISE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E`;

const navItems = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'];

export default function AtlasPage() {
  return (
    <main className="bg-black min-h-screen" style={{ fontFamily: 'Almarai, -apple-system, sans-serif' }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap');
      `}</style>

      {/* SECTION 1 - HERO */}
      <section className="h-screen p-4 md:p-6">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-atlas.mp4" type="video/mp4" />
          </video>

          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url("${NOISE_OVERLAY_SVG}")` }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

          {/* Navbar */}
          <nav className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 z-20">
            <ul className="flex gap-3 sm:gap-6 md:gap-12 lg:gap-14 text-[10px] sm:text-xs md:text-sm">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors hover:text-[#E1E0CC]"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 grid grid-cols-12 gap-4 items-end">
            {/* Headline */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Atlas" showAsterisk />
              </h1>
            </div>

            {/* Right column */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base"
                style={{ color: 'rgba(222, 219, 200, 0.7)', lineHeight: 1.2 }}
              >
                Atlas is a small studio working at the seam of cinema, code, and brand.
                We make sites that behave like films: slow first frames, kept promises,
                images you don't forget by lunch.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-2 hover:gap-3 transition-all bg-[#DEDBC8] rounded-full pl-5 pr-1 py-1 self-start text-sm sm:text-base font-medium text-black"
              >
                Join the lab
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 text-[#DEDBC8]" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - ABOUT */}
      <section className="bg-black py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl py-16 md:py-24 px-8 md:px-16 text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest mb-8" style={{ color: '#DEDBC8' }}>
            Visual arts
          </p>

          <div
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
            style={{ color: '#E1E0CC' }}
          >
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Léo Bertrand,', className: 'font-normal' },
                {
                  text: 'a director who learned by doing.',
                  className: 'italic font-["Instrument_Serif"]',
                },
                {
                  text: 'I cut, I shoot, I write, and lately, I build websites that move like the films I make.',
                  className: 'font-normal',
                },
              ]}
            />
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <ScrollRevealText
              text="Six years of independent work between Paris, Lisbon, and Berlin. A handful of festival selections, a few brand commissions worth telling. Mostly long Mondays, and a stubborn belief that craft still wins."
              className="text-xs sm:text-sm md:text-base"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 - FEATURES */}
      <section className="min-h-screen bg-black py-24 px-6 relative">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{ backgroundImage: `url("${BG_NOISE_SVG}")` }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <div style={{ color: '#E1E0CC' }}>
              <WordsPullUpMultiStyle
                segments={[{ text: 'Tools we built for ourselves. Now shared.', className: '' }]}
              />
            </div>
            <div className="text-gray-500 mt-2">
              <WordsPullUpMultiStyle
                segments={[{ text: 'Crafted slowly. Used daily.', className: '' }]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
            {/* Card 1 - Video */}
            <FeatureCard delay={0}>
              <div className="relative h-full rounded-xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/card-atlas.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-sm font-medium" style={{ color: '#E1E0CC' }}>
                    Field notes, in motion.
                  </p>
                </div>
              </div>
            </FeatureCard>

            {/* Card 2 - Project Storyboard */}
            <FeatureCard delay={0.15}>
              <FeatureContent
                num="01"
                title="Storyboard Drift."
                icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                items={[
                  'Sketch a film in minutes, not sessions',
                  'Mood references that pull their weight',
                  'From outline to first cut without losing the thread',
                  'Built for indie crews of one to four',
                ]}
              />
            </FeatureCard>

            {/* Card 3 - Smart Critiques */}
            <FeatureCard delay={0.3}>
              <FeatureContent
                num="02"
                title="Cut Companion."
                icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                items={[
                  'Frame-level notes from your team in real time',
                  'Color drift, pacing, transitions auto-flagged',
                  'Plays nice with most NLEs you already use',
                ]}
              />
            </FeatureCard>

            {/* Card 4 - Immersion Capsule */}
            <FeatureCard delay={0.45}>
              <FeatureContent
                num="03"
                title="Deep Mode."
                icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                items={[
                  'Mute the world for the hours you need',
                  'Soundscapes for focus or for rest',
                  'Synced with your day, not against it',
                ]}
              />
            </FeatureCard>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function FeatureContent({
  num,
  title,
  items,
  icon,
}: {
  num: string;
  title: string;
  items: string[];
  icon?: string;
}) {
  return (
    <div className="bg-[#212121] h-full rounded-xl p-6 flex flex-col">
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6"
          loading="lazy"
        />
      ) : (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-white/5 mb-6" />
      )}
      <h3 className="text-base sm:text-lg font-medium mb-4 flex items-center justify-between" style={{ color: '#E1E0CC' }}>
        <span>{title}</span>
        <span className="text-xs text-gray-500">{num}</span>
      </h3>
      <ul className="space-y-3 flex-1">
        {items.map((item) => (
          <li key={item} className="flex gap-2 items-start text-xs sm:text-sm text-gray-400">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#DEDBC8' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a href="#" className="mt-6 flex items-center gap-1 text-xs hover:gap-2 transition-all" style={{ color: '#DEDBC8' }}>
        Learn more
        <ArrowRight className="w-3 h-3" style={{ transform: 'rotate(-45deg)' }} />
      </a>
    </div>
  );
}
