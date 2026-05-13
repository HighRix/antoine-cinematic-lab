import type { Metadata } from 'next';
import { Gallery } from '@/components/lab/Gallery';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';
import { PROMPTS } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'cinematic.lab — la bibliothèque de prompts',
  description:
    "Les prompts que j'utilise pour livrer des sites cinematic. Code React + GSAP + Three.js, prêt à coller dans Lovable / Cursor / Bolt.",
};

export default function LabIndex() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <LabHeader />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Minimal hero */}
        <section className="pt-10 md:pt-14 pb-10 md:pb-14">
          <h1 className="font-serif italic text-[44px] md:text-[64px] lg:text-[76px] tracking-[-0.02em] leading-[1] text-white">
            La bibliothèque.
          </h1>
        </section>

        {/* Gallery (the main thing) */}
        <section className="pb-20 md:pb-28">
          <Gallery prompts={PROMPTS} />
        </section>
      </div>

      <LabFooter />
    </main>
  );
}
