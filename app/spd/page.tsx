import type { Metadata } from 'next';
import { SpdHero } from '@/components/spd/HeroSection';

export const metadata: Metadata = {
  title: 'S.P.D — Intelligent Daily Routine Automation',
  description: 'S.P.D: intelligent daily routine automation for your business. You relax.',
};

export default function SpdRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@400;600&family=Marck+Script&display=swap"
      />
      <style>{`
        .spd-root .font-italiana { font-family: 'Italiana', serif; }
      `}</style>
      <SpdHero />
    </>
  );
}
