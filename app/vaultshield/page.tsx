import type { Metadata } from 'next';
import { VaultShieldHero } from '@/components/vaultshield/HeroSection';

export const metadata: Metadata = {
  title: 'VaultShield — Lock Down Your Passwords',
  description:
    'Zero stress, total control. VaultShield keeps you covered with unbreakable storage, one-tap access, and pro-grade tools.',
};

export default function VaultShieldPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://db.onlinewebfonts.com/c/04e6981992c0e2e7642af2074ebe3901?family=Helvetica+Now+Display+Bold"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
      />
      <style>{`
        :root {
          --font-heading: 'Helvetica Now Display Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;
          --color-text: #192837;
          --color-accent: #7342E2;
          --color-login-bg: #F2F2EE;
        }
        .vaultshield-hero, .vaultshield-hero * { box-sizing: border-box; }
        .vaultshield-hero .vs-nav-link:hover { opacity: 0.6; }
        .vaultshield-hero .vs-btn-primary:hover,
        .vaultshield-hero .vs-btn-secondary:hover { filter: brightness(1.06); transform: translateY(-1px); }

        /* Responsive visibility — overrides inline display because of specificity weight */
        .vs-desktop-only { display: none !important; }
        .vs-mobile-only { display: inline-flex !important; }
        @media (min-width: 768px) {
          .vs-desktop-only { display: flex !important; }
          .vs-mobile-only { display: none !important; }
        }
      `}</style>
      <main>
        <VaultShieldHero />
      </main>
    </>
  );
}
