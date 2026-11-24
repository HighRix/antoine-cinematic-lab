import type { Metadata } from 'next';
import { VelocePage } from '@/components/veloce/HeroSection';

export const metadata: Metadata = {
  title: 'veloce — Fast payments at lightspeed',
  description:
    'veloce: handle finances with ease and power. Real-time data, smarter spending, instant payment clarity.',
};

export default function VeloceRoute() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .veloce-root, .veloce-root * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .veloce-root .font-manrope { font-family: 'Manrope', sans-serif; }
        .veloce-root .font-inter { font-family: 'Inter', sans-serif; }
        .veloce-root .font-helvetica { font-family: 'Helvetica', 'Arial', sans-serif; }
        .veloce-root .font-helvetica-neue { font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; }
        .veloce-root .font-product-sans { font-family: 'Product Sans', sans-serif; }
        .veloce-root .font-sf-compact { font-family: 'SF Compact Display', 'SF Compact Text', system-ui, sans-serif; }
      `}</style>
      <VelocePage />
    </>
  );
}
