import type { Metadata } from 'next';
import { HeroSection } from '@/components/orbis/HeroSection';
import { AboutSection } from '@/components/orbis/AboutSection';
import { CollectionSection } from '@/components/orbis/CollectionSection';
import { CtaSection } from '@/components/orbis/CtaSection';

export const metadata: Metadata = {
  title: 'Orbis.Nft — Beyond Earth',
  description: 'Orbis NFT collection — a digital exploration of distance, form, and silence in space.',
};

// SVG noise texture (data URI) — used for the global texture overlay.
// Inline so it works without dropping a file in /public.
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")";

export default function OrbisPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap');
        html, body {
          background: #010828;
        }
        .orbis-page, .orbis-page * {
          box-sizing: border-box;
        }
        .orbis-page {
          background: #010828;
          color: #EFF4FF;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          overflow-x: clip;
          margin: 0;
          padding: 0;
        }
        .orbis-page .font-grotesk { font-family: 'Anton', system-ui, sans-serif; letter-spacing: 0.01em; }
        .orbis-page .font-condiment { font-family: 'Condiment', cursive; }
        .orbis-page .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }

        /* Liquid glass scoped to Orbis (different params than the lab default) */
        .orbis-page .orbis-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.10);
          position: relative;
          overflow: hidden;
        }
        .orbis-page .orbis-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%,
            rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%,
            rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Texture overlay — noise SVG, lighten blend, sits above content */
        .orbis-texture {
          position: fixed;
          inset: 0;
          z-index: 50;
          pointer-events: none;
          background-image: ${NOISE_DATA_URI};
          background-size: cover;
          mix-blend-mode: lighten;
          opacity: 0.6;
        }
      `}</style>

      <main className="orbis-page">
        <HeroSection />
        <AboutSection />
        <CollectionSection />
        <CtaSection />
        <div className="orbis-texture" aria-hidden />
      </main>
    </>
  );
}
