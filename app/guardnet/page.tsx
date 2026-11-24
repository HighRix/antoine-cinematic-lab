import type { Metadata } from 'next';
import { GuardnetPage } from '@/components/guardnet/HeroSection';

export const metadata: Metadata = {
  title: 'guardnet — shelter user info',
  description:
    'guardnet shields user info with premier tech, granting safety across files, ventures, and transfers.',
};

export default function GuardnetRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://db.onlinewebfonts.com/c/e55e9079ee863276569c8a68d776ef04?family=Futura+Md+BT+Medium"
      />
      <style>{`
        .guardnet-root, .guardnet-root * {
          font-family: 'Futura Md BT Medium', system-ui, -apple-system, sans-serif;
        }
        .guardnet-root .hero-title {
          letter-spacing: -0.04em;
          line-height: 0.95;
        }
      `}</style>
      <GuardnetPage />
    </>
  );
}
