'use client';

const ABOUT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4';

const PARAGRAPH =
  'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space';

export function AboutSection() {
  return (
    <section className="relative w-full min-h-[130vh] overflow-hidden">
      <video
        src={ABOUT_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />


      <div className="relative z-10 max-w-[1831px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-24 min-h-screen flex flex-col justify-between gap-16">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="relative inline-block">
            <h2 className="font-grotesk uppercase text-[#EFF4FF] text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.05]">
              Hello!
              <br />
              I&apos;m orbis
            </h2>
            {/* Cursive "Orbis" — sits BELOW "I'M ORBIS" on the LEFT */}
            <span
              className="font-condiment text-[#6FFF00] text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] absolute -rotate-2 left-[40px] sm:left-[60px] md:left-[80px] lg:left-[100px] -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 opacity-95"
              style={{ mixBlendMode: 'exclusion' }}
            >
              Orbis
            </span>
          </div>

          <p className="font-mono uppercase text-[#EFF4FF] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-[266px]">
            {PARAGRAPH}
          </p>
        </div>

        {/* Bottom row — decorative duplicates */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-6">
            <p className="font-mono uppercase text-[14px] md:text-[16px] leading-relaxed max-w-[266px] opacity-10 text-[#010828] lg:text-[#EFF4FF]">
              {PARAGRAPH}
            </p>
            <p className="font-mono uppercase text-[14px] md:text-[16px] leading-relaxed max-w-[266px] opacity-10 text-[#010828] lg:text-[#EFF4FF]">
              {PARAGRAPH}
            </p>
          </div>
          <div className="hidden lg:flex flex-col gap-6">
            <p className="font-mono uppercase text-[14px] md:text-[16px] leading-relaxed max-w-[266px] opacity-10 text-[#EFF4FF]">
              {PARAGRAPH}
            </p>
            <p className="font-mono uppercase text-[14px] md:text-[16px] leading-relaxed max-w-[266px] opacity-10 text-[#EFF4FF]">
              {PARAGRAPH}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
