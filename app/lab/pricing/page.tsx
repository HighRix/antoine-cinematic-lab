import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Suspense } from 'react';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';
import { CheckoutButton } from '@/components/lab/CheckoutButton';
import { PricingCancelledBanner } from '@/components/lab/PricingCancelledBanner';
import { TIERS } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'Tarifs · cinematic.lab',
  description:
    'Toute la bibliothèque pour 27€/mois ou 199€ à vie. 499€ à vie pour les agences. Tous les futurs prompts inclus.',
};

const ORDER = ['monthly', 'lifetime', 'agency'] as const;

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Les prompts marchent sur quel outil ?',
    a: "Tous les générateurs IA : Lovable, Cursor, Bolt, Claude Code, Google AI Studio, Kimi, v0, Replit Agent. Le rendu visuel est identique, seul le code généré varie légèrement selon l'outil.",
  },
  {
    q: 'Quelle différence entre Pro mensuel et Pro Lifetime ?',
    a: "Le contenu est identique : toute la bibliothèque et tous les futurs prompts. Mensuel à 27€ tant que tu l'utilises. Lifetime à 199€ une fois pour toutes.",
  },
  {
    q: 'Je peux passer du mensuel au Lifetime ?',
    a: "Oui, à tout moment. Le montant déjà versé sur les 6 derniers mois est déduit du Lifetime. Tu paies juste la différence.",
  },
  {
    q: 'Combien de nouveaux prompts par mois ?',
    a: 'De nouveaux prompts ajoutés tous les jours. Tous inclus dans Pro et Pro Lifetime, à vie.',
  },
  {
    q: 'Je peux utiliser un prompt pour un site client ?',
    a: "Avec Pro (mensuel ou Lifetime) : oui sur 1 projet client à la fois. Pour des projets clients illimités, c'est le tier Agency.",
  },
];

export default function LabPricingPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased overflow-x-hidden">
      {/* Ambient orange glow — anchored top, soft, non-distracting */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-[5] h-[60vh] opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(242,125,38,0.18) 0%, rgba(242,125,38,0.06) 30%, transparent 70%)',
        }}
      />

      <LabHeader />

      <Suspense fallback={null}>
        <PricingCancelledBanner />
      </Suspense>

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-12 md:pb-16 text-center">
          <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[#F27D26] mb-6">
            Tarifs
          </p>
          <h1 className="font-serif italic text-[44px] md:text-[68px] lg:text-[80px] tracking-[-0.025em] leading-[0.95] text-white">
            Un seul paiement.<br />
            <span className="text-[#F27D26]">Tout, à vie.</span>
          </h1>
          <p className="mt-8 text-white/65 text-[16px] md:text-[17px] leading-relaxed max-w-[540px] mx-auto">
            Toute la bibliothèque, tous les futurs prompts. Choisis ta formule, accède à vie.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="pb-16 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {ORDER.map((key) => {
              const tier = TIERS[key];
              const featured = key === 'lifetime';
              const hasBadge = 'badge' in tier && tier.badge;
              const anchor = 'anchorPrice' in tier ? tier.anchorPrice : undefined;
              const suffix = 'priceSuffix' in tier ? tier.priceSuffix : undefined;

              return (
                <div
                  key={key}
                  className={[
                    'relative flex flex-col rounded-3xl p-7 md:p-9 transition-all duration-500 hover:-translate-y-1',
                    featured
                      ? 'bg-[#141414] ring-2 ring-[#F27D26]/55 shadow-[0_24px_70px_rgba(242,125,38,0.18)] md:scale-[1.025]'
                      : 'bg-[#141414] ring-1 ring-white/10 hover:ring-white/20',
                  ].join(' ')}
                >
                  {hasBadge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center text-[10px] font-bold tracking-[0.22em] uppercase font-mono bg-[#F27D26] text-[#0C0C0C] px-3.5 py-1.5 rounded-full whitespace-nowrap">
                      {tier.badge}
                    </span>
                  )}

                  {/* Header */}
                  <div className="pb-7 mb-7 border-b border-white/8">
                    <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50">
                      {tier.name}
                    </p>
                    <div className="mt-5 flex items-baseline gap-2 flex-wrap">
                      {anchor && (
                        <span className="text-white/30 text-xl line-through font-serif italic">
                          {anchor}€
                        </span>
                      )}
                      <span className="font-serif italic text-[56px] md:text-[64px] text-white tracking-[-0.025em] leading-none">
                        {tier.price}€
                      </span>
                      {suffix && (
                        <span className="text-white/55 text-sm">{suffix}</span>
                      )}
                    </div>
                    <p className="mt-5 text-white/65 text-[14px] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3.5 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[14px] text-white/85 leading-[1.55]"
                      >
                        <span
                          className={[
                            'mt-[3px] inline-flex items-center justify-center w-[18px] h-[18px] rounded-full shrink-0',
                            featured ? 'bg-[#F27D26]/15' : 'bg-white/10',
                          ].join(' ')}
                          aria-hidden
                        >
                          <Check
                            size={11}
                            strokeWidth={3}
                            className={featured ? 'text-[#F27D26]' : 'text-white/80'}
                          />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <CheckoutButton tier={key} label={tier.cta} featured={featured} />
                </div>
              );
            })}
          </div>

        </section>

        {/* FAQ */}
        <section className="pb-28 md:pb-36 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.32em] uppercase font-mono text-[#F27D26] mb-5">
              FAQ
            </p>
            <h2 className="font-serif italic text-[34px] md:text-[42px] tracking-[-0.02em] leading-[1.05] text-white">
              Les questions <span className="text-white/55">qui reviennent.</span>
            </h2>
            <p className="mt-5 text-white/55 text-[14px] leading-relaxed max-w-[300px]">
              Une autre question ? Envoie-moi un DM sur{' '}
              <a
                href="https://instagram.com/antoine_s31"
                target="_blank"
                rel="noreferrer"
                className="text-white underline decoration-[#F27D26]/60 underline-offset-4 hover:decoration-[#F27D26] transition-colors"
              >
                @antoine_s31
              </a>
              .
            </p>
          </div>
          <div className="md:col-span-8 flex flex-col">
            {FAQ.map((f, i) => (
              <details
                key={f.q}
                className="group border-t border-white/10 last:border-b py-6 md:py-7"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                  <h3 className="font-serif italic text-[20px] md:text-[22px] tracking-[-0.01em] text-white">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/65 group-hover:bg-[#F27D26]/15 group-hover:text-[#F27D26] transition-colors shrink-0"
                  >
                    <span className="block w-3 h-[1.5px] bg-current relative">
                      <span className="absolute inset-0 m-auto w-[1.5px] h-3 bg-current group-open:hidden" />
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-white/65 text-[15px] leading-[1.65] max-w-[640px]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <LabFooter />
    </main>
  );
}
