import type { Metadata } from 'next';
import { NexaHero } from '@/components/nexa/HeroSection';

export const metadata: Metadata = {
  title: 'Nexa — Unlock the Power of AI for Your Business',
  description:
    'AI platform that automates, analyzes, and accelerates your workflows so you can focus on what really matters.',
};

export default function NexaRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .nexa-root, .nexa-root * { font-family: 'Inter', sans-serif; }
        .nexa-root .italic { font-family: 'Instrument Serif', serif; font-style: italic; }
      `}</style>
      <NexaHero />
    </>
  );
}
