import type { Metadata } from 'next';
import { HeroSection } from '@/components/jack/HeroSection';
import { MarqueeSection } from '@/components/jack/MarqueeSection';
import { AboutSection } from '@/components/jack/AboutSection';
import { ServicesSection } from '@/components/jack/ServicesSection';
import { ProjectsSection } from '@/components/jack/ProjectsSection';

export const metadata: Metadata = {
  title: 'Antoine — 3D Creator',
  description: 'Portfolio of Antoine, a 3D creator crafting striking and unforgettable projects.',
};

export default function JackPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
        html, body, #__next {
          background: #0C0C0C;
        }
        .jack-page, .jack-page * {
          box-sizing: border-box;
        }
        .jack-page {
          font-family: 'Kanit', sans-serif;
          background: #0C0C0C;
          overflow-x: clip;
          margin: 0;
          padding: 0;
        }
        .jack-page .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      `}</style>

      <main className="jack-page">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </main>
    </>
  );
}
