import type { Metadata } from 'next';
import { PowerAIHero } from '@/components/powerai/HeroSection';

export const metadata: Metadata = {
  title: 'Power AI — The most powerful AI in talent acquisition',
  description: 'Power AI: the most powerful AI ever deployed in talent acquisition.',
};

export default function PowerAIRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .powerai-root {
          --pai-bg: 260 87% 3%;
          --pai-fg: 40 6% 95%;
          --pai-hero-sub: 40 6% 82%;
          font-family: 'Geist', system-ui, -apple-system, sans-serif;
        }
        .powerai-root, .powerai-root * { box-sizing: border-box; }
        .powerai-root .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .powerai-root .liquid-glass::before {
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
        @keyframes powerai-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .powerai-root .powerai-marquee-track {
          animation: powerai-marquee 20s linear infinite;
          width: max-content;
        }
      `}</style>
      <PowerAIHero />
    </>
  );
}
