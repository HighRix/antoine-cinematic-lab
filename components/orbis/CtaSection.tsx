'use client';
import { SocialIconsVerticalLarge } from './SocialIcons';

const CTA_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4';

export function CtaSection() {
  return (
    <section className="relative w-full" style={{ background: '#010828' }}>
      {/* Native aspect-ratio video (NOT object-cover) */}
      <video
        src={CTA_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="block w-full h-auto"
      />

      {/* Right-aligned text block */}
      <div className="absolute inset-0 z-10 flex items-center justify-end">
        <div className="w-full lg:pr-[20%] lg:pl-[15%] px-5 sm:px-8 md:px-12 text-right relative">
          <span
            className="font-condiment text-[#6FFF00] text-[17px] sm:text-[28px] md:text-[44px] lg:text-[68px] absolute -rotate-2 left-0 lg:left-[15%] -top-4 sm:-top-8 md:-top-10 lg:-top-12"
            style={{ mixBlendMode: 'exclusion' }}
          >
            Go beyond
          </span>

          <h2 className="font-grotesk uppercase text-[#EFF4FF] text-[16px] sm:text-[28px] md:text-[44px] lg:text-[60px] leading-[1.05]">
            <span className="block mb-4 sm:mb-6 md:mb-10 lg:mb-12">JOIN US.</span>
            <span className="block">REVEAL WHAT&apos;S HIDDEN.</span>
            <span className="block">DEFINE WHAT&apos;S NEXT.</span>
            <span className="block">FOLLOW THE SIGNAL.</span>
          </h2>
        </div>
      </div>

      {/* Bottom-left social icons */}
      <div className="absolute z-20 left-[8%] bottom-[12%] lg:bottom-[20%]">
        <SocialIconsVerticalLarge />
      </div>
    </section>
  );
}
