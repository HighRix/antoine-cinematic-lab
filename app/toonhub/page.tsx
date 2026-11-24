import type { Metadata } from 'next';
import { ToonhubHero } from '@/components/toonhub/HeroSection';

export const metadata: Metadata = {
  title: 'TOONHUB — 3D Shape Figurines',
  description:
    'TOONHUB figurines carousel: 4 character figurines rotating with crossfade background and giant ghost type.',
};

export default function ToonhubPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .toonhub-root, .toonhub-root * { box-sizing: border-box; }
        .toonhub-nav-btn:hover { transform: scale(1.08); background-color: rgba(255,255,255,0.12) !important; }
        .toonhub-discover:hover { opacity: 1; }
      `}</style>
      <main>
        <ToonhubHero />
      </main>
    </>
  );
}
