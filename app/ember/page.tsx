import type { Metadata } from 'next';
import { EmberHero } from '@/components/ember/HeroSection';

export const metadata: Metadata = {
  title: 'EMBER.dsgn — Striking digital identities',
  description:
    'EMBER.dsgn: bold contrasts and meaningful motion. Striking digital identities, primal turned powerful.',
};

export default function EmberRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
      />
      <style>{`
        .ember-root, .ember-root * {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .ember-root .scrollbar-hide::-webkit-scrollbar { display: none; }
        .ember-root .scrollbar-hide { scrollbar-width: none; }
      `}</style>
      <EmberHero />
    </>
  );
}
