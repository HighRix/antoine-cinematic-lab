import type { Metadata } from 'next';
import { HeroSectionV2 as HeroSection } from '@/components/tanli/HeroSectionV2';
import { ServicesSection } from '@/components/tanli/ServicesSection';
import { ProcessSectionElectric } from '@/components/tanli/ProcessSectionElectric';
import { AboutSection } from '@/components/tanli/AboutSection';
import { Footer } from '@/components/tanli/Footer';

export const metadata: Metadata = {
  title: 'Tanli Elec · Électricité & domotique haut de gamme · Marignier',
  description:
    'Installation, rénovation, domotique et dépannage 7j/7 en Haute-Savoie. Tanli Elec à Marignier · Cluses · Bonneville · Sallanches.',
};

export default function TanliPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        html, body {
          background: #1A1A1A;
        }
        .tanli-page, .tanli-page * {
          box-sizing: border-box;
        }
        .tanli-page {
          font-family: 'Sora', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #1A1A1A;
          color: #F5F5F5;
          margin: 0;
          padding: 0;
        }
        .tanli-page section[id] {
          scroll-margin-top: 96px;
        }
        @keyframes tanli-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tanli-page .tanli-fade-up {
          opacity: 0;
          animation: tanli-fade-up 600ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }
      `}</style>

      <main className="tanli-page">
        <HeroSection />
        <ServicesSection />
        <ProcessSectionElectric />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
