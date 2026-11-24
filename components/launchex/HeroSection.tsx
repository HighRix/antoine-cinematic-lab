'use client';

import { Sparkles, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = ['About', 'Submissions', 'Venue', 'Judges', 'Connect'] as const;

const CTA_CLIP =
  'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)';

const ARROW_CLIP =
  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)';

function ChamferOutline() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polygon
        points="14,0 100,0 100,86 86,100 0,100 0,14"
        fill="none"
        stroke="rgba(6, 99, 119, 0.25)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function NominationCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <a
      href="#"
      className="relative block w-full max-w-[20em] h-[5em] hover:-translate-y-0.5 transition-transform"
      style={{ color: '#154359' }}
    >
      <ChamferOutline />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-[13px] font-semibold leading-tight">{title}</span>
        <span className="text-[12px] font-normal opacity-80 leading-tight">{subtitle}</span>
      </div>
    </a>
  );
}

type Stat = {
  value: string;
  desc: string;
  image: string;
  mtClass?: string;
  textPos: string;
  clip: string;
};

const STATS: Stat[] = [
  {
    value: '7+ years',
    desc: 'Launchex has served the market, guiding ventures and their journeys',
    image: '/images/launchex/stat-1.png',
    textPos: 'left-6 right-6 bottom-6',
    clip:
      'polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)',
  },
  {
    value: '15000+',
    desc: 'innovation ventures moved through the Launchex pipeline',
    image: '/images/launchex/stat-2.png',
    mtClass: 'lg:mt-24',
    textPos: 'left-6 right-6 bottom-20',
    clip:
      'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))',
  },
  {
    value: '120+',
    desc: 'accelerator sessions delivered by Launchex across Eastern Europe',
    image: '/images/launchex/stat-3.png',
    textPos: 'left-6 right-28 bottom-6',
    clip:
      'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))',
  },
];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div
      className={`w-full h-[280px] sm:h-[340px] relative ${stat.mtClass ?? ''}`}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '1.5px',
        clipPath: stat.clip,
      }}
    >
      <div
        className="w-full h-full overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${stat.image})`,
          clipPath: stat.clip,
          mixBlendMode: 'plus-darker',
        }}
      />
      <div className={`absolute ${stat.textPos}`}>
        <p
          className="font-firs font-semibold uppercase text-[36px] sm:text-[52px] leading-[0.95] bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(294deg, #185B7B 20%, #4BBDF0)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {stat.value}
        </p>
        <p
          className="text-[14px] leading-[1.4] mt-3"
          style={{ color: '#154359', maxWidth: '66%' }}
        >
          {stat.desc}
        </p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'calc(100vh - 40px)' }}
    >
      <video
        src="/videos/launchex/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-10 pt-5 sm:pt-8">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          <div className="flex flex-col leading-none">
            <span className="text-[14px] sm:text-[15px] font-semibold tracking-tight">
              launchex
            </span>
            <span className="text-[10px] sm:text-[11px] font-light opacity-90 -mt-0.5">
              awards
            </span>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 text-white uppercase tracking-[0.14em] font-medium hover:brightness-125 transition-all group"
          style={{
            background: '#066377',
            fontSize: 11,
            padding: '12px 18px',
            clipPath: CTA_CLIP,
          }}
        >
          <span className="hidden sm:inline">Send in your entry form</span>
          <span className="sm:hidden">Enter</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center text-center pt-32 sm:pt-40 pb-24 px-6"
        style={{ color: '#154359' }}
      >
        <p
          className="uppercase font-medium mb-6 opacity-90"
          style={{ fontSize: 12, letterSpacing: '0.3em' }}
        >
          Prize for ventures
        </p>
        <h1
          className="font-firs font-normal text-[48px] sm:text-[76px] md:text-[100px] lg:text-[120px]"
          style={{ letterSpacing: '-0.04em', lineHeight: 0.9 }}
        >
          launchex
          <br />
          prizes
        </h1>
        <p
          className="uppercase font-medium max-w-md opacity-90 mt-8"
          style={{ fontSize: 14, letterSpacing: '0.22em', lineHeight: 1.8 }}
        >
          Bridging visions with reality, helping ventures soar up to the stars
        </p>
      </div>
    </section>
  );
}

function SubmissionsSection() {
  const leftCards: { title: string; subtitle: string }[] = [
    { title: 'Lead', subtitle: 'AI venture for commerce' },
    { title: 'Emerging innovations', subtitle: 'in food commerce' },
    { title: 'The finest innovations', subtitle: 'for learners and young students' },
  ];
  const rightCards = [
    { title: 'Innovations for advanced', subtitle: 'career training' },
    { title: 'The finest innovations', subtitle: 'in finance' },
    { title: 'Categories', subtitle: 'coming soon' },
  ];

  return (
    <section
      className="relative w-full overflow-hidden py-20 sm:py-28 px-6 sm:px-10"
      style={{ background: '#F0F0F0' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        <div className="order-2 lg:order-1 flex flex-col items-center gap-6 lg:mt-36">
          {leftCards.map((c) => (
            <NominationCard key={c.title + c.subtitle} title={c.title} subtitle={c.subtitle} />
          ))}
        </div>

        <div className="order-1 lg:order-2 flex flex-col items-center text-center">
          <p
            className="uppercase"
            style={{ color: '#154359', fontSize: 12, letterSpacing: '0.24em' }}
          >
            [submissions]
          </p>
          <h2
            className="font-firs uppercase mt-1"
            style={{
              color: '#154359',
              fontSize: 'clamp(44px, 5vw, 54px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            submissions
          </h2>

          <video
            src="/videos/launchex/submissions.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="mt-6 sm:mt-8 w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] object-cover"
          />
        </div>

        <div className="order-3 flex flex-col items-center gap-6 lg:mt-36">
          {rightCards.map((c) => (
            <NominationCard key={c.title + c.subtitle} title={c.title} subtitle={c.subtitle} />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 sm:h-56 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(240, 245, 247, 0) 0%, rgba(240, 245, 247, 0.7) 60%, #F0F5F7 100%)',
        }}
      />
    </section>
  );
}

function FoundersSection() {
  return (
    <section
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10"
      style={{ background: '#F0F5F7' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12" style={{ color: '#154359' }}>
          <div className="lg:w-1/2">
            <h2
              className="font-firs font-semibold uppercase text-[36px] sm:text-[48px] lg:text-[54px]"
              style={{ letterSpacing: '-0.02em', lineHeight: 0.95 }}
            >
              About the
              <br />
              founders
            </h2>
          </div>

          <div className="lg:w-1/2 max-w-xl">
            <p className="text-[17px] sm:text-[18px] leading-[1.5]">
              Launchex.Hub is a platform that is part of a portfolio of companies Launchex, for
              sourcing and showcasing groundbreaking innovations.
            </p>
            <p className="text-[17px] sm:text-[18px] leading-[1.5] mt-5">
              Launchex.Hub's mission is to offer every local-language innovator the chance to
              reshape our world with their pioneering creation.
            </p>

            <a
              href="https://base.launchex.vc/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 mt-6 text-[14px] font-medium hover:-translate-y-0.5 transition-transform"
            >
              <span>Launchex.Hub website</span>
              <span
                className="inline-flex items-center justify-center w-8 h-8"
                style={{ border: `1px solid #154359`, clipPath: ARROW_CLIP }}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {STATS.map((s) => (
            <StatCard key={s.value} stat={s} />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 sm:h-56"
        style={{
          background:
            'linear-gradient(to bottom, rgba(240, 245, 247, 0) 0%, rgba(240, 245, 247, 0.7) 60%, #F0F5F7 100%)',
        }}
      />
    </section>
  );
}

function TopNav() {
  return (
    <div
      className="hidden md:flex fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-40 items-center bg-white px-6 lg:px-10 py-4 gap-6 lg:gap-10"
      style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
    >
      <span
        aria-hidden
        className="absolute top-0 -left-6 w-6 h-6 bg-white"
        style={{
          maskImage: 'radial-gradient(circle at 0 100%, transparent 24px, black 25px)',
          WebkitMaskImage: 'radial-gradient(circle at 0 100%, transparent 24px, black 25px)',
        }}
      />
      <span
        aria-hidden
        className="absolute top-0 -right-6 w-6 h-6 bg-white"
        style={{
          maskImage: 'radial-gradient(circle at 100% 100%, transparent 24px, black 25px)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 100%, transparent 24px, black 25px)',
        }}
      />

      {NAV_LINKS.map((label) => (
        <a
          key={label}
          href="#"
          className="text-neutral-800 uppercase font-medium hover:text-neutral-500 transition-colors"
          style={{ fontSize: 11, letterSpacing: '0.14em' }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export function LaunchexPage() {
  return (
    <div className="launchex-root bg-white p-3 sm:p-5 min-h-screen">
      <div className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-white">
        <HeroSection />
        <SubmissionsSection />
        <FoundersSection />
      </div>

      <TopNav />

      {/* Bottom-left scroll indicator */}
      <div
        className="pointer-events-none fixed bottom-7 sm:bottom-11 left-7 sm:left-13 z-40 text-white/80 uppercase font-medium"
        style={{ fontSize: 10, letterSpacing: '0.18em', mixBlendMode: 'difference' }}
      >
        Scroll to discover
      </div>

      {/* Bottom-right page indicator */}
      <div
        className="pointer-events-none fixed bottom-7 sm:bottom-11 right-7 sm:right-13 z-40 flex items-center gap-3 text-white/80"
        style={{ fontSize: 10, letterSpacing: '0.18em', mixBlendMode: 'difference' }}
      >
        <span className="uppercase font-medium">01</span>
        <span className="w-8 h-px bg-white/40" />
        <span className="uppercase font-medium">05</span>
      </div>
    </div>
  );
}
