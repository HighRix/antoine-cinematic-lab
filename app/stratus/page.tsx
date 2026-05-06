'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Zap, Palette, BarChart3, Shield } from 'lucide-react';
import { BlurText } from '@/components/stratus/BlurText';
import { HlsVideo } from '@/components/stratus/HlsVideo';
import { Glass, GlassButton } from '@/components/stratus/Glass';

const STREAM_START = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';
const STREAM_STATS = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8';
const STREAM_CTA = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

export default function StratusPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap');
        .stratus-page { background: #000; color: #fff; font-family: 'Barlow', sans-serif; }
        .stratus-page .font-heading { font-family: 'Instrument Serif', serif; }
        .stratus-page .font-body { font-family: 'Barlow', sans-serif; }
      `}</style>

      <div className="stratus-page bg-black text-white min-h-screen">
        <Navbar />
        <Hero />
        <div className="bg-black">
          <StartSection />
          <FeaturesChess />
          <FeaturesGrid />
          <Stats />
          <Testimonials />
          <CtaFooter />
        </div>
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between">
      <Glass className="rounded-full w-12 h-12 flex items-center justify-center">
        <span className="font-heading italic text-2xl">S</span>
      </Glass>

      <Glass className="hidden md:flex rounded-full px-1.5 py-1 items-center gap-1">
        {['Home', 'Services', 'Work', 'Process', 'Pricing'].map((item) => (
          <a
            key={item}
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition"
          >
            {item}
          </a>
        ))}
        <button className="bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium flex items-center gap-1 ml-2 cursor-pointer">
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </Glass>

      <button className="md:hidden bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium flex items-center gap-1 cursor-pointer">
        Get Started
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-visible" style={{ height: 1000 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute left-0 w-full h-auto object-contain z-0"
        style={{ top: '20%' }}
      >
        <source src="/videos/hero-stratus.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: 300, background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 h-full" style={{ paddingTop: 150 }}>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Glass className="rounded-full px-1 py-1 mb-8 inline-flex">
            <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">New</span>
            <span className="pr-3 pl-1 text-sm text-white/90">GEO-optimized cinematic web design.</span>
          </Glass>
        </motion.div>

        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic leading-[0.8] max-w-3xl mb-8 text-center" style={{ letterSpacing: '-4px' }}>
          <BlurText text="Websites that get cited by ChatGPT" delay={100} className="justify-center w-full" />
        </h1>

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm md:text-base text-white font-body font-light leading-tight max-w-xl mb-10"
        >
          Cinematic design meets GEO foundations. Sites built for humans —
          and for the AI engines that recommend you to them.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center gap-4"
        >
          <GlassButton className="rounded-full px-5 py-2.5 text-sm font-medium" strong>
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </GlassButton>
          <button className="text-sm font-medium flex items-center gap-2 cursor-pointer">
            <Play className="w-4 h-4 fill-white" />
            Watch the Film
          </button>
        </motion.div>

        <div className="mt-auto pb-8 pt-16 flex flex-col items-center gap-8 w-full">
          <Glass className="rounded-full px-3.5 py-1 inline-flex">
            <span className="text-xs font-medium text-white/80">Inspired by the studios that set the bar</span>
          </Glass>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 text-2xl md:text-3xl font-heading italic text-white">
            <span>Stripe</span>
            <span>Vercel</span>
            <span>Linear</span>
            <span>Notion</span>
            <span>Figma</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection({
  videoSrc,
  videoIsHls = true,
  desaturate = false,
  children,
  minHeight = 500,
}: {
  videoSrc: string;
  videoIsHls?: boolean;
  desaturate?: boolean;
  children: React.ReactNode;
  minHeight?: number;
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight }}>
      {videoIsHls ? (
        <HlsVideo
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          style={desaturate ? { filter: 'saturate(0)' } : undefined}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={desaturate ? { filter: 'saturate(0)' } : undefined}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-[1]"
        style={{ height: 200, background: 'linear-gradient(to top, transparent, black)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
        style={{ height: 200, background: 'linear-gradient(to bottom, transparent, black)' }}
      />
      <div className="relative z-10 px-6 py-24 flex flex-col items-center justify-center" style={{ minHeight }}>
        {children}
      </div>
    </section>
  );
}

function StartSection() {
  return (
    <VideoSection videoSrc={STREAM_START}>
      <Glass className="rounded-full px-3.5 py-1 inline-flex mb-6">
        <span className="text-xs font-medium text-white font-body">The Process</span>
      </Glass>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] text-center max-w-3xl mb-6">
        <BlurText text="From brief to live in seven days." delay={120} className="justify-center w-full" />
      </h2>
      <p className="text-white/60 font-body font-light text-sm md:text-base text-center max-w-xl mb-8">
        You bring the brief. I bring the system — cinematic patterns,
        GEO foundations, async delivery. No meetings marathons. No scope creep.
      </p>
      <GlassButton className="rounded-full px-6 py-3 text-sm font-medium" strong>
        Get Started
        <ArrowUpRight className="w-4 h-4" />
      </GlassButton>
    </VideoSection>
  );
}

function FeaturesChess() {
  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <Glass className="rounded-full px-3.5 py-1 inline-flex mb-6">
            <span className="text-xs font-medium">Capabilities</span>
          </Glass>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9]">
            <BlurText text="Two layers. One outcome." delay={120} className="justify-center w-full" />
          </h2>
        </div>

        <ChessRow
          title="Designed to be remembered."
          body="Most landing pages forget themselves the moment you scroll away. Cinematic motion gives your brand a fingerprint — the kind that founders and AI engines both repeat back."
          buttonText="See the work"
          gif="/gifs/feature-finlytic.gif"
          reverse={false}
        />
        <ChessRow
          title="Cited by the engines that matter."
          body="Schema, llms.txt, entity graphs, content depth. The plumbing that makes ChatGPT, Perplexity, and Google AI Overviews actually pull your name into their answers."
          buttonText="See the audit"
          gif="/gifs/feature-wealth.gif"
          reverse
        />
      </div>
    </section>
  );
}

function ChessRow({
  title,
  body,
  buttonText,
  gif,
  reverse,
}: {
  title: string;
  body: string;
  buttonText: string;
  gif: string;
  reverse: boolean;
}) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 mb-16`}>
      <div className="flex-1">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading italic leading-[0.95] mb-6">{title}</h3>
        <p className="text-white/60 font-body font-light text-base mb-8 max-w-md">{body}</p>
        <GlassButton className="rounded-full px-6 py-3 text-sm font-medium" strong>
          {buttonText}
          <ArrowUpRight className="w-4 h-4" />
        </GlassButton>
      </div>
      <div className="flex-1">
        <Glass className="rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gif} alt="" className="w-full h-auto block" />
        </Glass>
      </div>
    </div>
  );
}

function FeaturesGrid() {
  const features = [
    { Icon: Zap, title: 'Seven Day Sprint', body: 'Strategy Monday, design midweek, build the back half. Live by next Sunday.' },
    { Icon: Palette, title: 'Built for Recall', body: 'Cinematic motion is not decoration. It is the reason a brand gets remembered when somebody searches the category.' },
    { Icon: BarChart3, title: 'Wired for Citation', body: 'Schema, llms.txt, entity signals. The work that makes AI engines pull your name into the answer.' },
    { Icon: Shield, title: 'Yours, Not Locked', body: 'You own the code, the design files, the deployment. No platform tax. No hostage-ware.' },
  ];

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <Glass className="rounded-full px-3.5 py-1 inline-flex mb-6">
            <span className="text-xs font-medium">Why Us</span>
          </Glass>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9]">
            <BlurText text="Four reasons it works." delay={100} className="justify-center w-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ Icon, title, body }) => (
            <Glass key={title} className="rounded-2xl p-6">
              <div className="flex flex-col items-start">
                <Glass strong className="rounded-full w-10 h-10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </Glass>
                <h3 className="text-xl font-heading italic mb-3">{title}</h3>
                <p className="text-white/60 font-body font-light text-sm">{body}</p>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <VideoSection videoSrc={STREAM_STATS} desaturate minHeight={600}>
      <Glass className="rounded-3xl p-12 md:p-16 max-w-6xl w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: '20+', l: 'Sites shipped' },
            { v: '100%', l: 'Project completion' },
            { v: '4x', l: 'AI citation lift' },
            { v: '7 days', l: 'Brief to live' },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic mb-2">{v}</div>
              <div className="text-white/60 font-body font-light text-sm">{l}</div>
            </div>
          ))}
        </div>
      </Glass>
    </VideoSection>
  );
}

function Testimonials() {
  const items = [
    {
      quote: "We rebuilt in seven days. The difference in inbound was visible inside the first month.",
      name: 'Sarah Chen',
      role: 'CEO, Luminary',
    },
    {
      quote: "First time a website actually felt like a product. Conversions doubled. Refund rate dropped.",
      name: 'Marcus Webb',
      role: 'Head of Growth, Arcline',
    },
    {
      quote: "The site doesn't sit alongside our brand anymore. It is the brand.",
      name: 'Elena Voss',
      role: 'Brand Director, Helix',
    },
  ];

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <Glass className="rounded-full px-3.5 py-1 inline-flex mb-6">
            <span className="text-xs font-medium">What They Say</span>
          </Glass>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9]">
            <BlurText text="Words from people who shipped." delay={100} className="justify-center w-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <Glass key={it.name} className="rounded-2xl p-8">
              <div className="flex flex-col">
                <p className="text-white/80 font-body font-light text-sm italic mb-6">{it.quote}</p>
                <div>
                  <div className="text-white font-body font-medium text-sm">{it.name}</div>
                  <div className="text-white/50 font-body font-light text-xs">{it.role}</div>
                </div>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFooter() {
  return (
    <VideoSection videoSrc={STREAM_CTA} minHeight={700}>
      <div className="text-center max-w-3xl mb-16 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic leading-[0.85] mb-6">
          <BlurText text="Your next site, in seven days." delay={100} className="justify-center w-full" />
        </h2>
        <p className="text-white/60 font-body font-light text-base md:text-lg mb-10">
          Tell me where you want to be cited. I'll build the site that gets you there.
          Fixed price. Fixed delivery. No surprises.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GlassButton className="rounded-full px-6 py-3 text-sm font-medium" strong>
            Book a Call
            <ArrowUpRight className="w-4 h-4" />
          </GlassButton>
          <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium cursor-pointer">
            View Pricing
          </button>
        </div>
      </div>

      <div className="mt-32 pt-8 border-t border-white/10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/40 text-xs">© 2026 Antoine SCIE — All rights reserved.</div>
        <div className="flex gap-6 text-white/40 text-xs">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </VideoSection>
  );
}
