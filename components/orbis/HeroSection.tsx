'use client';
import { SocialIconsRow, SocialIconsStack } from './SocialIcons';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4';

const NAV_LINKS = ['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact'];

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden rounded-b-[32px]">
      {/* Background video */}
      <video
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content container */}
      <div className="relative z-10 max-w-[1831px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 min-h-screen flex flex-col">
        {/* Header — logo left + nav center + social icons right (all aligned) */}
        <header className="flex items-center justify-between gap-6">
          {/* Logo — larger, with neon orb mark prefix and split weight */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span
              aria-hidden
              className="block w-2.5 h-2.5 rounded-full"
              style={{
                background: '#6FFF00',
                boxShadow: '0 0 12px rgba(111, 255, 0, 0.6), 0 0 24px rgba(111, 255, 0, 0.3)',
              }}
            />
            <span className="font-grotesk uppercase text-[20px] sm:text-[24px] tracking-wide text-[#EFF4FF] leading-none">
              Orbis<span className="text-[#6FFF00]">.</span>Nft
            </span>
          </a>

          {/* Center nav (desktop) */}
          <nav className="hidden lg:block">
            <div className="orbis-glass rounded-[28px] px-[36px] py-[16px] flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-grotesk uppercase text-[12px] tracking-wider text-[#EFF4FF] hover:text-[#6FFF00] transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </nav>

        </header>

        {/* Heading — top-left, smaller, sits high under the header */}
        <div className="relative mt-8 sm:mt-10 md:mt-14 lg:mt-16 max-w-[760px]">
          <h1 className="font-grotesk uppercase text-[#EFF4FF] text-[32px] sm:text-[44px] md:text-[58px] lg:text-[72px] leading-[1.05]">
            Beyond earth
            <br />
            and ( its ) familiar boundaries
          </h1>

          {/* Cursive accent overlay — sits just BELOW the word "FAMILIAR" (between line 2 and line 3) */}
          <span
            className="font-condiment text-[#6FFF00] text-[22px] sm:text-[28px] md:text-[36px] lg:text-[44px] absolute -rotate-2 left-[180px] sm:left-[260px] md:left-[340px] lg:left-[420px] top-[60px] sm:top-[82px] md:top-[110px] lg:top-[136px] opacity-90"
            style={{ mixBlendMode: 'exclusion' }}
          >
            Nft collection
          </span>
        </div>

        {/* Spacer to push mobile icons to the bottom */}
        <div className="flex-1" />

        {/* Mobile social icons (below content) */}
        <div className="lg:hidden flex justify-center pb-8">
          <SocialIconsRow />
        </div>
      </div>

      {/* Desktop social icons — vertical stack BELOW the navbar, on the right edge */}
      <div className="hidden lg:block absolute right-5 sm:right-8 md:right-12 lg:right-16 top-[112px] md:top-[128px] z-20">
        <SocialIconsStack />
      </div>
    </section>
  );
}
