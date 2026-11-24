import type { Metadata } from 'next';
import { VelorixHero } from '@/components/velorix/HeroSection';

export const metadata: Metadata = {
  title: 'velorix — Where precision finds its edge',
  description:
    'velorix: a seamless bridge where raw ambition and machine clarity converge as one.',
};

export default function VelorixRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <VelorixHero />
    </>
  );
}
