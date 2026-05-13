import type { Metadata } from 'next';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';

export const metadata: Metadata = {
  title: 'Contact · cinematic.lab',
  description: 'Une question, une demande sur mesure, un projet à 10 000€ ? Écris-moi.',
};

export default function LabContactPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <LabHeader />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <section className="pt-10 md:pt-14 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h1 className="font-serif italic text-[44px] md:text-[64px] tracking-[-0.02em] leading-[1] text-white">
              Contact.
            </h1>
            <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed max-w-[480px]">
              Une question sur un prompt, un bug, une demande sur mesure ou un site complet à
              5-15&nbsp;000&nbsp;€. Écris-moi, je réponds sous 24h.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-5">
            <a
              href="mailto:antoine.scie@gmail.com"
              className="group flex flex-col gap-1 p-6 rounded-2xl bg-[#141414] ring-1 ring-white/8 hover:ring-[#F27D26]/40 transition-all"
            >
              <span className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40">
                Email
              </span>
              <span className="font-serif italic text-2xl tracking-[-0.01em] text-white group-hover:text-[#F27D26] transition-colors">
                antoine.scie@gmail.com
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/antoinescie/"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-1 p-6 rounded-2xl bg-[#141414] ring-1 ring-white/8 hover:ring-[#F27D26]/40 transition-all"
            >
              <span className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40">
                LinkedIn
              </span>
              <span className="font-serif italic text-2xl tracking-[-0.01em] text-white group-hover:text-[#F27D26] transition-colors">
                /in/antoinescie
              </span>
            </a>

            <a
              href="tel:+33681949021"
              className="group flex flex-col gap-1 p-6 rounded-2xl bg-[#141414] ring-1 ring-white/8 hover:ring-[#F27D26]/40 transition-all"
            >
              <span className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40">
                Téléphone
              </span>
              <span className="font-serif italic text-2xl tracking-[-0.01em] text-white group-hover:text-[#F27D26] transition-colors">
                +33 6 81 94 90 21
              </span>
            </a>
          </div>
        </section>
      </div>

      <LabFooter />
    </main>
  );
}
