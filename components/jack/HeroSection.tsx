'use client';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact'];

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col" style={{ overflowX: 'clip' }}>
      {/* Portrait — rendered FIRST in DOM so it stays in the back layer.
          Magnetic hover may translate it upward, but z-0 + DOM-order keep it
          below the heading's z-30 stacking context. */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
        style={{ zIndex: 0 }}
      >
        <Magnet
          padding={200}
          strength={2.2}
          maxUp={220}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack portrait"
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      {/* Nav — top layer */}
      <FadeIn delay={0} y={-20} className="relative" style={{ zIndex: 40 }}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
              style={{ color: '#D7E2EA' }}
            >
              {l}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Heading — centered, sits high (just below nav) and ABOVE the portrait */}
      <FadeIn delay={0.15} y={40} className="relative" style={{ zIndex: 30 }}>
        <div className="overflow-hidden">
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center -mt-2 sm:-mt-4 md:-mt-8 lg:-mt-10 text-[11vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw]"
          >
            Hi, i&apos;m antoine
          </h1>
        </div>
      </FadeIn>

      {/* Spacer pushes the bottom bar to the very bottom of the viewport */}
      <div className="flex-1" />

      {/* Bottom bar — small text + contact button at the very bottom */}
      <div className="relative flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10" style={{ zIndex: 30 }}>
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ color: '#D7E2EA', fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
