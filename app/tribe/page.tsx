import type { Metadata } from 'next';
import { TribeHero } from '@/components/tribe/HeroSection';

export const metadata: Metadata = {
  title: 'Fearless Vision Delivered — Creative Studios',
  description: 'Creative studios shaping bold visions into power for your tribe.',
};

export default function TribeRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <TribeHero />
    </>
  );
}
