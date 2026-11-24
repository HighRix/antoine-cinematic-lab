import type { Metadata } from 'next';
import { LinkFlowHero } from '@/components/linkflow/HeroSection';

export const metadata: Metadata = {
  title: 'LinkFlow — Close the rift linking signals and action',
  description: 'Shape scattered signals into meaningful outcomes via AI-driven workflows.',
};

export default function LinkFlowRoute() {
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
        href="https://db.onlinewebfonts.com/c/6e47ef470dd19698c911332a9b4d1cf4?family=Neue+Haas+Grotesk+Text+Pro"
      />
      <link
        rel="stylesheet"
        href="https://db.onlinewebfonts.com/c/dec0d9b4e22ca588dc20e1e2e09a59b5?family=Neue+Haas+Grotesk+Display+Pro+55+Roman"
      />
      <style>{`
        .linkflow-root, .linkflow-root * {
          font-family: 'Neue Haas Grotesk Display Pro 55 Roman', 'Neue Haas Grotesk Text Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
      <LinkFlowHero />
    </>
  );
}
