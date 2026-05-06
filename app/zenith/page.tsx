import type { Metadata } from 'next';
import { HeroSection } from '@/components/zenith/HeroSection';
import { PropertiesSection } from '@/components/zenith/PropertiesSection';
import { ProcessSectionBlueprint as ProcessSection } from '@/components/zenith/ProcessSectionBlueprint';
import { FounderSection } from '@/components/zenith/FounderSection';
import { KpiSection } from '@/components/zenith/KpiSection';
import { Footer } from '@/components/zenith/Footer';

export const metadata: Metadata = {
  title: 'FT Design · Architecture résidentielle sur mesure',
  description:
    "Concevoir des villas sur mesure et des projets immobiliers où l'usage, les volumes et la lumière trouvent leur équilibre. 20 ans d'expertise. Ferhat Tanli, designer et maître d'œuvre à Cluses (Haute-Savoie).",
};

export default function ZenithPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        html, body {
          background: #F8F8F8;
          scroll-behavior: smooth;
        }
        .zenith-page, .zenith-page * {
          box-sizing: border-box;
        }
        .zenith-page {
          font-family: 'Lato', system-ui, sans-serif;
          background: #F8F8F8;
          color: #141414;
          margin: 0;
          padding: 0;
        }

        /* Anchor offset so navbar doesn't cover the section title when navigating to a #anchor */
        .zenith-page section[id] {
          scroll-margin-top: 96px;
        }

        /* Zenith liquid glass : visible on bright sky thanks to a dark hairline outline */
        .zenith-page .zenith-glass {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          border: 1px solid rgba(20, 20, 20, 0.22);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.65),
            inset 0 -1px 1px rgba(20, 20, 20, 0.05),
            0 0 0 1px rgba(20, 20, 20, 0.06),
            0 6px 24px rgba(20, 20, 20, 0.10),
            0 1px 3px rgba(20, 20, 20, 0.08);
          position: relative;
        }
        .zenith-page .zenith-glass:hover {
          background: rgba(255, 255, 255, 0.32);
          border-color: rgba(20, 20, 20, 0.30);
        }
      `}</style>

      <main className="zenith-page">
        <HeroSection />
        <PropertiesSection />
        <ProcessSection />
        <FounderSection />
        <KpiSection />
        <Footer />
      </main>
    </>
  );
}
