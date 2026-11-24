import type { Metadata } from 'next';
import { EquilibriumHero } from '@/components/equilibrium/HeroSection';

export const metadata: Metadata = {
  title: 'Equilibrium — Live Better, Feel Whole Every Day',
  description:
    'A wellness companion built for your journey: routines, growth tracking, and tailored insights for a steadier life.',
};

export default function EquilibriumRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        .equilibrium-root, .equilibrium-root * {
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .equilibrium-root .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .equilibrium-root .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.15) 20%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0.15) 80%,
            rgba(255, 255, 255, 0.45) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
      <EquilibriumHero />
    </>
  );
}
