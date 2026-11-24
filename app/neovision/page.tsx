import type { Metadata } from 'next';
import { NeovisionPage } from '@/components/neovision/HeroSection';

export const metadata: Metadata = {
  title: 'NeoVision — The Digital Frontier',
  description:
    'NeoVision: explore hyper-realistic virtual environments, interact with AI-driven avatars, step into the digital frontier.',
};

export default function NeovisionRoute() {
  return (
    <>
      <style>{`
        .neovision-root .app-hero-wrapper {
          min-height: 100vh;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .neovision-root .app-hero-wrapper {
            min-height: auto;
            height: 100vh;
          }
        }
        .neovision-root .video-plus-darker {
          mix-blend-mode: normal !important;
        }
        .neovision-root .hero-description-group { margin-right: 0; }
        .neovision-root .hero-stat-group { margin-right: 0; }
        @media (min-width: 768px) {
          .neovision-root .hero-description-group { margin-right: 50%; }
          .neovision-root .hero-stat-group { margin-right: 20%; }
        }
      `}</style>
      <NeovisionPage />
    </>
  );
}
