import type { Metadata } from 'next';
import { RailroadHero } from '@/components/railroad/HeroSection';

export const metadata: Metadata = {
  title: 'Railroad.ai — Focus in a Constantly Distracted World',
  description:
    'Cut through the noise of notifications, endless feeds, and constant interruptions. Reclaim your attention with Railroad.ai.',
};

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif";

export default function RailroadRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap"
      />
      <style>{`
        .railroad-root {
          --rr-background: 213 45% 67%;
          --rr-foreground: 0 0% 100%;
          --rr-heading: 205 52% 5%;
          --rr-description: 180 9% 33%;
          --rr-primary: 0 0% 100%;
          --rr-primary-foreground: 0 0% 0%;
          --rr-radius: 9999px;
          --rr-heading: ${SYSTEM_FONT};
          --rr-body: ${SYSTEM_FONT};
        }
        .railroad-root, .railroad-root * { box-sizing: border-box; }
        .railroad-root .rr-heading {
          font-family: ${SYSTEM_FONT};
          color: hsl(205 52% 5%);
          font-weight: 500;
        }
        .railroad-root .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .railroad-root .liquid-glass::before {
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
      <RailroadHero />
    </>
  );
}
