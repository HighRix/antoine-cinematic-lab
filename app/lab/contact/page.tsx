import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

function InstagramGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';

export const metadata: Metadata = {
  title: 'Contact · cinematic.lab',
  description:
    'Une question sur un prompt, un bug ou un projet sur mesure ? DM sur Instagram @antoine_s31, réponse sous 24h.',
};

const TOPICS = [
  {
    title: 'Une question sur un prompt',
    body: 'Comportement étrange après un copier-coller, ou un détail technique qui résiste.',
  },
  {
    title: 'Un bug, un retour',
    body: 'Une vidéo qui ne charge pas, un prompt qui ne tient pas la promesse. Je corrige.',
  },
  {
    title: 'Un site sur mesure',
    body: 'Tu veux du cinematic livré clé en main. On en parle.',
  },
  {
    title: 'Une collab, une idée',
    body: "Tu veux contribuer un prompt, échanger sur un workflow, ou monter un truc ensemble.",
  },
];

export default function LabContactPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased overflow-x-hidden">
      {/* Ambient orange glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-[5] h-[60vh] opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(242,125,38,0.18) 0%, rgba(242,125,38,0.06) 30%, transparent 70%)',
        }}
      />

      <LabHeader />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-12 md:pb-16 text-center">
          <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[#F27D26] mb-6">
            Contact
          </p>
          <h1 className="font-serif italic text-[44px] md:text-[68px] lg:text-[80px] tracking-[-0.025em] leading-[0.95] text-white">
            Une question, une idée,<br />
            <span className="text-[#F27D26]">un projet&nbsp;?</span>
          </h1>
          <p className="mt-8 text-white/65 text-[16px] md:text-[17px] leading-relaxed max-w-[540px] mx-auto">
            Je suis joignable sur Instagram. Réponse sous 24h, week-ends inclus.
          </p>
        </section>

        {/* Instagram focal card */}
        <section className="pb-16 md:pb-20 flex justify-center">
          <a
            href="https://instagram.com/antoine_s31"
            target="_blank"
            rel="noreferrer"
            className="group relative w-full max-w-[640px] block rounded-[28px] bg-[#141414] ring-2 ring-[#F27D26]/55 shadow-[0_24px_70px_rgba(242,125,38,0.18)] p-8 md:p-10 hover:-translate-y-1 hover:ring-[#F27D26]/85 transition-all duration-500"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#F27D26]/15 text-[#F27D26]"
                  >
                    <InstagramGlyph size={20} />
                  </span>
                  <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/55">
                    Instagram · DM
                  </span>
                </div>
                <p className="mt-6 font-serif italic text-[44px] md:text-[56px] text-white tracking-[-0.025em] leading-none">
                  @antoine_s31
                </p>
                <p className="mt-5 text-white/60 text-[14px] leading-relaxed max-w-[420px]">
                  Le canal le plus direct. Tu m&apos;écris, je vois passer la notification, je réponds.
                </p>
              </div>

              <span
                aria-hidden
                className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F27D26] text-[#0C0C0C] shadow-[0_8px_24px_rgba(242,125,38,0.35)] group-hover:scale-110 transition-transform"
              >
                <ArrowUpRight size={20} strokeWidth={2.4} />
              </span>
            </div>
          </a>
        </section>

        {/* Topics */}
        <section className="pb-28 md:pb-36">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-white/40 mb-3">
              Tu peux m&apos;écrire pour
            </p>
            <h2 className="font-serif italic text-[28px] md:text-[36px] tracking-[-0.02em] leading-[1.1] text-white">
              Tout ce qui touche au lab.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[860px] mx-auto">
            {TOPICS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl bg-[#141414] ring-1 ring-white/8 hover:ring-white/15 p-6 md:p-7 transition-colors"
              >
                <h3 className="font-serif italic text-[22px] md:text-[24px] tracking-[-0.01em] text-white leading-[1.1]">
                  {t.title}
                </h3>
                <p className="mt-3 text-white/60 text-[14px] leading-relaxed">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <LabFooter />
    </main>
  );
}
