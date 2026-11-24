import type { Metadata } from 'next';
import { LaunchexPage } from '@/components/launchex/HeroSection';

export const metadata: Metadata = {
  title: 'Launchex Awards — Prize for ventures',
  description: 'Launchex Prizes: bridging visions with reality, helping ventures soar up to the stars.',
};

export default function LaunchexRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://db.onlinewebfonts.com/c/69f2576e7ca287875bf8d089130e292c?family=TT+Firs+Neue"
      />
      <style>{`
        .launchex-root, .launchex-root * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .launchex-root .font-firs {
          font-family: 'TT Firs Neue', 'Inter', system-ui, sans-serif;
        }
        .launchex-root .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .launchex-root .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <LaunchexPage />
    </>
  );
}
