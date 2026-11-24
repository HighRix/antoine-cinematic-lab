import type { Metadata } from 'next';
import { FramelixPage } from '@/components/framelix/HeroSection';

export const metadata: Metadata = {
  title: 'Framelix 3D — Cinematic Motion Studios',
  description: 'Framelix 3D delivers cinematic motion design in 24-48 hours.',
};

export default function FramelixRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .framelix-root, .framelix-root * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }
        @keyframes framelix-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .framelix-root .framelix-marquee-track {
          animation: framelix-marquee 20s linear infinite;
          width: max-content;
        }
      `}</style>
      <FramelixPage />
    </>
  );
}
