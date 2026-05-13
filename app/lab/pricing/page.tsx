import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';
import { BoomerangVideoBg } from '@/components/lab/BoomerangVideoBg';
import { TIERS } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'Pricing · cinematic.lab',
  description:
    'Toute la bibliothèque pour €27/mois ou €199 lifetime. €499 lifetime pour les agences.',
};

const ORDER = ['monthly', 'lifetime', 'agency'] as const;

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Les prompts marchent sur quel outil ?',
    a: 'Tous les prompts sont testés sur Lovable, Cursor, Bolt et Claude Code. Le rendu visuel est le même, le code généré varie un peu selon l\'outil mais reste sain.',
  },
  {
    q: 'Quelle différence entre Pro mensuel et Pro Lifetime ?',
    a: 'Le contenu est identique : toute la bibliothèque + tous les futurs prompts. Mensuel = €27 tu paies tant que tu utilises. Lifetime = €199 une seule fois, accès à vie même si tu n\'utilises plus pendant un an.',
  },
  {
    q: 'Je peux passer du mensuel au Lifetime ?',
    a: 'Oui, à tout moment. Le montant déjà versé sur les 6 derniers mois est déduit du Lifetime. Tu paies juste la différence.',
  },
  {
    q: 'Combien de nouveaux prompts par mois ?',
    a: 'Entre 4 et 6 nouveaux prompts publiés chaque mois. Tous inclus dans Pro et Pro Lifetime, à vie.',
  },
  {
    q: 'Je peux utiliser un prompt pour un site client ?',
    a: 'Avec Pro (mensuel ou lifetime) : oui sur 1 projet client à la fois. Pour des projets client illimités, c\'est le tier Agency.',
  },
  {
    q: 'Remboursement possible ?',
    a: 'Pas une fois la bibliothèque téléchargée (c\'est du digital sans retour possible). C\'est pour ça que 5 prompts sont visibles entièrement avant achat — tu juges la qualité avant de payer.',
  },
];

export default function LabPricingPage() {
  return (
    <main className="relative min-h-screen text-[#F5F5F5] antialiased overflow-x-hidden">
      <BoomerangVideoBg />

      {/* Soft darkening overlay so content reads above the video */}
      <div
        aria-hidden
        className="fixed inset-0 -z-[5] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.78) 60%, rgba(12,12,12,0.92) 100%)',
        }}
      />

      <LabHeader />

      {/* Inline SVG noise filter referenced by the watermark */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="lab-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
      </svg>

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Watermark */}
        <section className="pt-16 md:pt-24 pb-10 text-center">
          <p className="font-serif italic text-[22px] md:text-[28px] text-white/85 tracking-[-0.01em]">
            cinematic<span className="text-[#F27D26]">.</span>lab
          </p>
          <h1
            className="font-serif italic font-extrabold mt-2 md:-mt-3 lg:-mt-6 leading-[0.9] tracking-[-0.04em] bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(96px, 18vw, 256px)',
              backgroundImage:
                'linear-gradient(120deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 35%, #F27D26 75%, #FFB070 100%)',
              filter: 'url(#lab-noise)',
            }}
          >
            Pricing
          </h1>
          <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-[560px] mx-auto">
            Toute la bibliothèque, tous les futurs prompts. Mensuel ou lifetime, à toi de choisir.
          </p>
        </section>

        {/* Cards */}
        <section className="pb-20 md:pb-28">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {ORDER.map((key) => {
              const tier = TIERS[key];
              const isFeatured = key === 'lifetime';
              const hasBadge = 'badge' in tier && tier.badge;

              return (
                <div
                  key={key}
                  className={`relative p-7 md:p-9 flex flex-col gap-7 min-h-[540px] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.005] ${
                    isFeatured ? 'lab-glass-featured' : 'lab-glass'
                  }`}
                  style={{
                    borderRadius: 36,
                  }}
                >
                  {hasBadge && (
                    <span className="absolute -top-3 left-7 inline-flex items-center text-[10px] font-bold tracking-[0.22em] uppercase font-mono bg-[#F27D26] text-[#0C0C0C] px-3 py-1.5 rounded-full z-10">
                      {tier.badge}
                    </span>
                  )}

                  <div className="relative">
                    <p className="text-[12px] tracking-[0.22em] uppercase font-mono text-white/55">
                      {tier.name}
                    </p>
                    <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                      {'anchorPrice' in tier && tier.anchorPrice && (
                        <span className="text-white/35 text-xl line-through font-serif italic">
                          €{tier.anchorPrice}
                        </span>
                      )}
                      <span className="font-serif italic text-[48px] md:text-[56px] text-white tracking-[-0.02em] leading-none">
                        €{tier.price}
                      </span>
                      {'priceSuffix' in tier && tier.priceSuffix && (
                        <span className="text-white/65 text-sm">{tier.priceSuffix}</span>
                      )}
                    </div>
                    <p className="mt-4 text-white/65 text-[14px] leading-relaxed min-h-[48px]">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3.5 flex-1 relative">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[13px] text-white/85 leading-relaxed"
                      >
                        <span
                          className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/12 shrink-0"
                          aria-hidden
                        >
                          <Check size={13} strokeWidth={3} className="text-white" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.stanUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold transition-all hover:scale-[1.02] mt-auto ${
                      isFeatured
                        ? 'bg-[#F27D26] hover:bg-[#FF8A2E] text-[#0C0C0C] shadow-[0_10px_30px_rgba(242,125,38,0.4)]'
                        : 'bg-white text-[#0C0C0C] hover:bg-[#f0f0f0] shadow-[0_8px_20px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <span aria-hidden>→</span>
                  </a>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-[12px] text-white/45 leading-relaxed max-w-[640px] mx-auto">
            Paiement Stan.store · prix net TTC · accès immédiat par email. Pas de remboursement
            une fois la bibliothèque téléchargée.
          </p>
        </section>

        {/* FAQ */}
        <section className="pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-10 max-w-[1200px] mx-auto">
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40 mb-3">
              FAQ
            </p>
            <h2 className="font-serif italic text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] text-white">
              Les questions qui reviennent.
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-7">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-white/10 pb-6 last:border-0">
                <h3 className="font-serif italic text-xl md:text-2xl tracking-[-0.01em] text-white mb-2">
                  {f.q}
                </h3>
                <p className="text-white/65 text-[15px] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <LabFooter />

      <style>{`
        .lab-glass {
          background: linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.30));
          backdrop-filter: blur(14px) brightness(0.92);
          -webkit-backdrop-filter: blur(14px) brightness(0.92);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.12);
        }
        .lab-glass:hover {
          border-color: rgba(255,255,255,0.25);
        }
        .lab-glass-featured {
          background: linear-gradient(135deg, rgba(15,15,15,0.6), rgba(15,15,15,0.35));
          backdrop-filter: blur(18px) brightness(0.95);
          -webkit-backdrop-filter: blur(18px) brightness(0.95);
          border: 1px solid rgba(242,125,38,0.55);
          box-shadow: 0 18px 60px rgba(242,125,38,0.18), inset 0 1px 1px rgba(255,255,255,0.15);
        }
        .lab-glass-featured:hover {
          border-color: rgba(242,125,38,0.75);
        }
      `}</style>
    </main>
  );
}
