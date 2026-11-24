'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const LOGO_PATH =
  'M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z';

function Logo({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden>
      <path d={LOGO_PATH} fill="#FFFFFF" />
    </svg>
  );
}

export function SpdHero() {
  const { scrollY } = useScroll();
  const cloudYDesktop = useTransform(scrollY, [0, 300], [0, -100]);
  const cloudYMobile = useTransform(scrollY, [0, 300], [0, -24]);

  return (
    <main
      className="spd-root overflow-x-hidden bg-black relative"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Section 1 — Video hero */}
      <section className="relative h-screen w-full flex-shrink-0 overflow-hidden">
        <video
          src="/videos/spd/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 10 }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
          {/* Top-left logo block */}
          <div
            className="absolute pointer-events-auto max-w-[calc(100vw-140px)] md:max-w-none"
            style={{ top: 24, left: 20 }}
          >
            <div className="flex items-center" style={{ gap: 16 }}>
              <div className="md:hidden">
                <Logo size={48} />
              </div>
              <div className="hidden md:block">
                <Logo size={64} />
              </div>
              <p
                className="hidden md:block text-white font-semibold tracking-[0.02em]"
                style={{ fontSize: 16, lineHeight: 1.2 }}
              >
                Effortless Growth
                <br />
                Operations. We Handle All Tasks.
                <br />
                Stay Calm.
              </p>
              <p
                className="block md:hidden text-white font-semibold tracking-[0.02em]"
                style={{ fontSize: 11, lineHeight: 1.2, width: 112 }}
              >
                Complete Business
                <br />
                Automation. We Handle All
                <br />
                Tasks. You Relax.
              </p>
            </div>
          </div>

          {/* Left description, desktop only */}
          <div
            className="hidden md:flex flex-col gap-6 text-white font-normal leading-relaxed pointer-events-auto"
            style={{ position: 'absolute', top: 64 + 400, left: 64, width: '100%', maxWidth: 320, fontSize: 14 }}
          >
            <p>
              Our platform automates repetitive operations so you can focus on what matters: building
              your product and serving your customers.
            </p>
            <p>
              From inbox triage to invoicing, we connect the dots between your tools and let your
              business run on autopilot.
            </p>
          </div>

          {/* Top-right CTA */}
          <a
            href="#"
            className="absolute pointer-events-auto border border-white text-white font-italiana uppercase tracking-widest hover:bg-white/10 transition-all duration-300 cursor-pointer bg-black/10 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
            style={{
              top: 24,
              right: 20,
              padding: '12px 20px',
              borderRadius: '100%',
              fontSize: 12,
            }}
          >
            <span className="md:hidden">Get started</span>
            <span
              className="hidden md:inline-block"
              style={{ fontSize: 18, padding: '7px 40px', margin: '-28px -40px' }}
            >
              Get started
            </span>
          </a>

          {/* Bottom heading */}
          <div
            className="absolute pointer-events-auto text-left md:text-right"
            style={{
              bottom: 32,
              left: 20,
              right: 20,
            }}
          >
            <div className="md:hidden flex flex-col gap-4 max-w-[280px] text-white font-normal mb-8" style={{ fontSize: 12 }}>
              <p>Automation tailored for serious operators.</p>
              <p>No fluff. Less stress, more output.</p>
            </div>
            <h1
              className="text-white font-italiana"
              style={{
                fontSize: 36,
                lineHeight: 1.1,
              }}
            >
              <span className="md:hidden block" style={{ fontSize: 32 }}>
                Intelligent Daily Routine
                <br />
                Automation For Your
                <br />
                Business. You Relax
              </span>
              <span
                className="hidden md:block"
                style={{
                  fontSize: 96,
                  lineHeight: '88px',
                  textAlign: 'right',
                }}
              >
                Intelligent Daily
                <br />
                Routine Automation
                <br />
                For Your Business.
                <br />
                You Relax
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Section 2 — Red */}
      <section className="relative min-h-screen w-full flex flex-col" style={{ background: '#FF0000', zIndex: 10 }}>
        {/* Cloud overlays */}
        <motion.div
          className="hidden md:block absolute top-0 left-0 w-full pointer-events-none"
          style={{ y: cloudYDesktop, zIndex: 100, translateY: '-50%' }}
        >
          <img
            src="/images/spd/cloud.png"
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </motion.div>
        <motion.div
          className="block md:hidden absolute top-0 left-0 w-full pointer-events-none"
          style={{ y: cloudYMobile, zIndex: 100, translateY: '-50%' }}
        >
          <img
            src="/images/spd/cloud.png"
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-auto block"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center w-full pt-[100px] md:pt-[400px]">
          <div
            className="flex flex-col items-center w-full text-center relative px-8 mx-auto"
            style={{ zIndex: 20, maxWidth: 900 }}
          >
            <Logo size={80} />
            <p
              className="text-white uppercase tracking-wider mx-auto"
              style={{
                fontSize: 16,
                maxWidth: 400,
                lineHeight: 1.6,
                margin: '40px auto 40px',
              }}
            >
              We built this platform with a single purpose to eliminate operational chaos and restore
              balance to your daily business routine
            </p>
            <p
              className="text-white"
              style={{ fontFamily: 'Marck Script, cursive', fontSize: 120, lineHeight: 1, marginBottom: 32 }}
            >
              S.P.D
            </p>
            <div style={{ marginBottom: 100, maxWidth: 400 }}>
              <p
                className="text-white"
                style={{ fontSize: 16, fontWeight: 300, marginBottom: 24 }}
              >
                Every workflow you ship through us comes with quiet diligence and a relentless eye for
                detail.
              </p>
              <p className="text-white" style={{ fontSize: 16, fontWeight: 300 }}>
                We sweat the small stuff so your team doesn't have to.
              </p>
            </div>
          </div>

          {/* Bottom video block */}
          <div className="relative w-full" style={{ flexShrink: 0 }}>
            <div
              className="absolute top-0 left-0 w-full pointer-events-none"
              style={{
                height: 100,
                background: 'linear-gradient(to bottom, #FF0000, transparent)',
                zIndex: 10,
              }}
            />
            <video
              src="/videos/spd/bottom.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
