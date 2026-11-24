import type { Metadata } from 'next';
import { EraHero } from '@/components/era/HeroSection';

export const metadata: Metadata = {
  title: 'New Era of Design — Starts Now',
  description: 'New era of design starts now.',
};

export default function EraRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap"
      />
      <EraHero />
    </>
  );
}
