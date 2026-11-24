import type { Metadata } from 'next';
import { AetheraHero } from '@/components/aethera/HeroSection';

export const metadata: Metadata = {
  title: 'Aethera® — Beyond silence, we build the eternal',
  description:
    'Aethera: digital havens for deep work and pure flows. For brilliant minds, fearless makers, and thoughtful souls.',
};

export default function AetheraRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
      />
      <style>{`
        .aethera-root { font-family: 'Inter', sans-serif; }
        .aethera-root .aethera-display {
          font-family: 'Instrument Serif', serif;
        }
        @keyframes aethera-fade-rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aethera-root .aethera-fade-rise {
          animation: aethera-fade-rise 0.8s ease-out both;
        }
        .aethera-root .aethera-fade-rise-delay {
          animation: aethera-fade-rise 0.8s ease-out 0.2s both;
        }
        .aethera-root .aethera-fade-rise-delay-2 {
          animation: aethera-fade-rise 0.8s ease-out 0.4s both;
        }
      `}</style>
      <AetheraHero />
    </>
  );
}
