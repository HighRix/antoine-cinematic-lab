'use client';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4';

export function HeroSection() {
  return (
    <section className="relative h-[100svh] md:h-screen w-full overflow-hidden">
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-10 h-full">
        <Navbar />

        {/* Hero content : top of viewport, split layout */}
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 pt-20 md:pt-28 lg:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            {/* LEFT : headline + CTA */}
            <div className="md:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[clamp(2.4rem,11vw,3rem)] md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.04] text-[#141414]"
              >
                Plus qu&apos;un plan,
                <br />
                un art de vivre.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-7 md:mt-9"
              >
                <a
                  href="#contact"
                  className="zenith-glass inline-flex items-center px-7 md:px-9 py-3.5 md:py-4 text-[12px] md:text-[13px] font-medium uppercase tracking-wider text-[#141414] rounded-full transition-colors"
                >
                  Réserver un appel
                </a>
              </motion.div>
            </div>

            {/* RIGHT : subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-4 md:col-start-9"
            >
              <p className="text-[#141414]/80 text-[14.5px] md:text-[17px] leading-[1.5] md:leading-[1.45] max-w-[36ch] md:max-w-none">
                Concevoir des villas sur mesure et des projets immobiliers où l&apos;architecture, l&apos;usage et la lumière trouvent leur équilibre. 20 ans d&apos;expertise au service de votre habitat.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
