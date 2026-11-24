'use client';

import { useState } from 'react';
import { Link as LinkIcon, Menu, X, Search, Play } from 'lucide-react';

const NAV_LINKS = ['Home', 'About', 'Services', 'Contact'] as const;

const AVATARS = [
  '/images/neovision/avatar-415829.jpg',
  '/images/neovision/avatar-1222271.jpg',
  '/images/neovision/avatar-1239291.jpg',
  '/images/neovision/avatar-2379004.jpg',
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M6 26 L6 6 L26 26 L26 6"
          stroke="#0F0F0F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium text-base tracking-tight text-neutral-900">NeoVision</span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="relative z-10 flex items-center justify-between px-5 py-4 md:px-12 md:py-6">
      <div className="flex items-center gap-12">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="I am looking for..."
            className="w-72 rounded-full border border-neutral-300 bg-transparent text-sm text-neutral-600 placeholder-neutral-400 px-4 py-2 pr-10 outline-none focus:border-neutral-500 transition-colors"
          />
          <Search
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        className="md:hidden w-10 h-10 rounded-full border border-neutral-300 grid place-items-center text-neutral-900"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div className="absolute top-[64px] left-5 right-5 z-30 md:hidden bg-white rounded-2xl border border-neutral-200 shadow-lg p-5 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-sm text-neutral-700">
              {l}
            </a>
          ))}
          <div className="relative pt-3 border-t border-neutral-200">
            <input
              type="text"
              placeholder="I am looking for..."
              className="w-full rounded-full border border-neutral-300 bg-transparent text-sm text-neutral-600 px-4 py-2 pr-10 outline-none"
            />
            <Search size={16} className="absolute right-4 top-1/2 text-neutral-500" />
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-8 pb-20 md:px-12 md:pt-16 md:pb-36">
      <div>
        <p className="text-xs font-medium tracking-[0.3em] text-neutral-500 uppercase">Futuristic</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <span className="text-sm text-neutral-400 mt-2 md:mt-4">05</span>
          <h1 className="text-[2.75rem] md:text-[5.5rem] leading-[0.95] font-light tracking-tight text-neutral-900">
            NEW DIGITAL
            <br />
            UNIVERSE
          </h1>
        </div>

        <div className="flex items-center gap-4 pl-10">
          <button
            type="button"
            className="bg-neutral-900 text-white text-sm font-medium rounded px-6 py-3 md:px-8 md:py-3.5 hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </button>
          <a
            href="#"
            className="text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="hero-stat-group flex justify-start md:justify-center mt-12 md:mt-0">
        <div className="flex flex-col items-start">
          <div className="text-5xl md:text-7xl font-light text-neutral-900 tracking-tight">47.2%</div>
          <div className="text-xs text-neutral-500 mt-2">Reality</div>
        </div>
      </div>

      <div className="hero-description-group flex flex-col md:flex-row md:justify-between gap-8 md:gap-12 mt-12 md:mt-0">
        <div className="flex items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Trusted by Clients</p>
          <div className="flex items-center -space-x-2">
            {AVATARS.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-neutral-100 object-cover"
                draggable={false}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-700 font-medium">20+</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 flex-shrink-0">
            <LinkIcon size={16} />
          </div>
          <p className="text-xs md:text-sm text-neutral-500 max-w-[200px] md:max-w-sm leading-relaxed">
            In this futuristic realm, users can explore hyper-realistic virtual environments,
            interact with AI-driven avatars.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 3 }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[120px] block"
      >
        <polygon points="0,0 0,120 1440,120 1440,80 920,80 680,0" fill="#0F0F0F" />
      </svg>
    </div>
  );
}

function AboutSection() {
  return (
    <section
      className="w-full flex flex-col lg:flex-row"
      style={{ background: '#0F0F0F', minHeight: 600 }}
    >
      <div className="lg:w-1/2 h-[400px] lg:h-auto lg:min-h-[700px] relative overflow-hidden">
        <video
          src="/videos/neovision/about.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'lighten' }}
        />
      </div>
      <div className="lg:w-1/2 flex items-center px-8 py-16 md:px-16 lg:px-20 xl:px-28">
        <div className="max-w-lg">
          <p className="text-xs font-medium tracking-[0.3em] text-neutral-500 uppercase mb-8 md:mb-10">
            About Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.05] mb-10 md:mb-12">
            THE DIGITAL FRONTIER
          </h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {['Digital', 'Reality', 'Next'].map((t) => (
              <span
                key={t}
                className="px-5 py-2 rounded-full border border-neutral-700 text-sm text-neutral-300 hover:border-neutral-500 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-md mb-10">
            Step into The Digital Frontier, where the boundaries between reality and virtual
            innovation disappear. This is the next era of immersive technology.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-neutral-800 text-white text-sm font-medium rounded px-7 py-3.5 hover:bg-neutral-700 transition-colors"
            >
              Learn More
            </button>
            <a href="#" className="inline-flex items-center gap-3 text-sm text-neutral-300">
              <span className="w-10 h-10 rounded-full border border-neutral-700 grid place-items-center text-white">
                <Play size={14} />
              </span>
              Watch a Video
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type Insight = {
  key: string;
  title: string;
  body: string;
  date: string;
  author: string;
  image: string;
};

const INSIGHTS: Insight[] = [
  {
    key: 'Innovation',
    title: 'How VR is Transforming Our Digital World',
    body: 'Virtual Reality (VR) is no longer a concept of the future. Today it powers training, entertainment, and creative pipelines.',
    date: '08 February 2025',
    author: 'Henry Leonardo',
    image: '/images/neovision/mask-0.jpg',
  },
  {
    key: 'Technology',
    title: 'The Rise of Spatial Computing in Everyday Life',
    body: 'Spatial computing is bridging the gap between the physical and digital, weaving interactive layers into our routines.',
    date: '15 March 2025',
    author: 'Sarah Mitchell',
    image: '/images/neovision/mask-1.jpg',
  },
  {
    key: 'Experience',
    title: 'Designing Immersive Worlds That Feel Real',
    body: 'From haptic feedback to photorealistic rendering, builders craft sensations that ground users in their virtual stage.',
    date: '22 April 2025',
    author: 'James Park',
    image: '/images/neovision/mask-2.jpg',
  },
];

function InsightsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = INSIGHTS[activeIdx];
  return (
    <section
      className="w-full px-8 md:px-16 lg:px-20 xl:px-28 pt-24 pb-32"
      style={{ background: '#0F0F0F' }}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-light italic tracking-tight text-white leading-[1.05] max-w-5xl mb-20 md:mb-28">
        LIMITLESS POSSIBILITIES WITH NEOVISION
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex flex-row lg:flex-col gap-6 lg:w-[160px] xl:w-[200px] flex-shrink-0">
          {INSIGHTS.map((ins, i) => (
            <button
              key={ins.key}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`text-sm text-left transition-colors ${
                i === activeIdx ? 'text-white font-medium' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {ins.key}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-10">
          <div className="lg:w-[420px] xl:w-[480px] aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 flex-shrink-0">
            <img src={active.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between gap-6 max-w-sm">
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
                {active.title}
              </h3>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">{active.body}</p>
              <a
                href="#"
                className="text-sm text-white font-medium underline underline-offset-4 w-fit"
              >
                Learn More
              </a>
            </div>
            <div className="border-t border-neutral-800 pt-5 flex items-center gap-6 text-xs text-neutral-500">
              <span>{active.date}</span>
              <span>{active.author}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NeovisionPage() {
  return (
    <div className="neovision-root bg-black">
      <div className="app-hero-wrapper relative">
        <div className="absolute inset-0" style={{ background: '#FBFDFD', zIndex: 0 }} />
        <div className="absolute right-0 top-0 bottom-0 video-plus-darker w-full opacity-30 md:w-[55%] md:opacity-100" style={{ zIndex: 1 }}>
          <video
            src="/videos/neovision/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="video-plus-darker w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative min-h-screen md:h-screen flex flex-col" style={{ zIndex: 2 }}>
          <Navbar />
          <Hero />
        </div>
        <SectionDivider />
      </div>
      <AboutSection />
      <InsightsSection />
    </div>
  );
}
