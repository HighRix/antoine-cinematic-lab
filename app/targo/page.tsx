import type { Metadata } from 'next';
import { TargoHero } from '@/components/targo/HeroSection';

export const metadata: Metadata = {
  title: 'targo — Swift and Simple Transport',
  description:
    'targo logistics: swift and simple transport. Book a free consultation and get started on your next shipment.',
};

export default function TargoPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
      />
      <TargoHero />
    </>
  );
}
