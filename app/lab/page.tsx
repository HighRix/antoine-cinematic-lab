import type { Metadata } from 'next';
import { Logo } from '@/components/cinematic/Logo';
import { PromptCard } from '@/components/lab/PromptCard';
import { PricingTable } from '@/components/lab/PricingTable';
import { PROMPTS, FREE_PROMPTS, PREMIUM_PROMPTS, TIERS } from '@/data/prompts';

export const metadata: Metadata = {
  title: 'cinematic.lab — la bibliothèque de prompts',
  description:
    'Les prompts que j\'utilise pour livrer des sites cinematic à 10 000€. Tous les obtenir pour €199 lifetime. Codés à la main, livrés à un seul client à la fois.',
};

const CATEGORIES = [
  'Tous',
  'Hero',
  'SaaS',
  'Agency',
  'Portfolio',
  'E-commerce',
  'Local Business',
] as const;

export default function LabIndex() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <header className="pt-10 md:pt-14 pb-12 md:pb-16 flex items-center justify-between gap-8">
          <a
            href="/"
            className="group inline-flex items-center transition-opacity hover:opacity-80"
            aria-label="cinematic.lab — retour portfolio"
          >
            <Logo
              size={34}
              gap={11}
              wordmarkClassName="text-[22px] md:text-[24px] text-white"
            />
          </a>
          <a
            href="/"
            className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/55 hover:text-white transition-colors"
          >
            ← Portfolio
          </a>
        </header>

        {/* Hero pitch */}
        <section className="pt-4 md:pt-8 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-9">
            <span className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase font-mono text-[#F27D26] bg-[#F27D26]/10 border border-[#F27D26]/30 px-3 py-1.5 rounded-full mb-8">
              · Lancement · Lifetime €199 au lieu de €399
            </span>
            <h1 className="font-serif italic text-[44px] md:text-[64px] lg:text-[80px] tracking-[-0.02em] leading-[1.02] text-white max-w-[1100px]">
              Les prompts que j&apos;utilise pour livrer des sites à 10&nbsp;000&nbsp;€.
              <br />
              <span className="text-[#F27D26]">Tous les obtenir pour 199&nbsp;€.</span>
            </h1>
            <p className="mt-8 text-white/65 text-base md:text-lg leading-relaxed max-w-[560px]">
              Chaque prompt génère un hero animé prêt à coller dans Lovable, Cursor ou Bolt.
              Pas de templates Webflow recyclés, pas de Figma : du code React + GSAP + Three.js
              qui tourne et qui rend exactement ce que tu vois.
            </p>
          </div>
          <div className="md:col-span-3 flex items-end">
            <div className="space-y-4">
              <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40">
                Au sommaire
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>· {PROMPTS.length} prompts au lancement</li>
                <li>· {FREE_PROMPTS.length} accessibles sans payer</li>
                <li>· Code React / Next 16 / GSAP</li>
                <li>· Mise à jour lifetime</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section
          id="prompts"
          className="pb-16 md:pb-24"
          aria-label="Bibliothèque de prompts"
        >
          <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40 mb-2">
                Bibliothèque
              </p>
              <h2 className="font-serif italic text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-white">
                Les {PROMPTS.length} prompts au lancement.
              </h2>
            </div>
            <a
              href="#pricing"
              className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white border-b border-[#F27D26]/60 pb-1 hover:border-[#F27D26] transition-colors"
            >
              Voir le pricing
              <span aria-hidden className="text-[#F27D26]">↓</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
            {PROMPTS.map((p) => (
              <PromptCard key={p.slug} prompt={p} />
            ))}
          </div>

          <p className="mt-6 text-[12px] text-white/45 leading-relaxed max-w-[640px]">
            Les prompts marqués <span className="text-[#F27D26]">Gratuit</span> sont entièrement
            visibles sur leur page. Les prompts <span className="text-white/70">Premium</span> ont
            un aperçu, le texte complet est dans le Lab Pass.
          </p>
        </section>

        {/* Pricing */}
        <section id="pricing" className="pb-20 md:pb-28">
          <div className="mb-10 md:mb-14 max-w-[700px]">
            <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40 mb-3">
              Pricing
            </p>
            <h2 className="font-serif italic text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-white">
              Un prompt motionsites coûte 199&nbsp;€.
              <br />
              <span className="text-white/55">
                Toute la bibliothèque cinematic.lab aussi.
              </span>
            </h2>
          </div>
          <PricingTable />

          <p className="mt-8 text-[12px] text-white/45 leading-relaxed max-w-[640px]">
            Paiement Stan.store · prix net TTC · accès immédiat par email. Licence personnelle =
            1 projet à la fois. Licence agence = projets client illimités. Pas de remboursement
            une fois la bibliothèque téléchargée.
          </p>
        </section>

        {/* FAQ */}
        <section className="pb-20 md:pb-28 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40 mb-3">
              FAQ
            </p>
            <h2 className="font-serif italic text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05] text-white">
              Les questions qui reviennent.
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
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

      {/* Footer */}
      <footer className="border-t border-white/8 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo size={28} gap={10} wordmarkClassName="text-[18px] text-white" />
            <span className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/35">
              le lab
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/55">
            <a href="/" className="hover:text-white transition-colors">Portfolio</a>
            <a href="mailto:antoine.scie@gmail.com" className="hover:text-white transition-colors">
              antoine.scie@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/antoinescie/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <span className="text-[10px] tracking-[0.22em] uppercase font-mono text-white/30">
            © 2026 antoine scie
          </span>
        </div>
      </footer>
    </main>
  );
}

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Les prompts marchent sur quel outil ?',
    a: 'Tous les prompts sont testés sur Lovable, Cursor, Bolt et Claude Code. Le rendu visuel est le même, le code généré varie un peu selon l\'outil mais reste sain.',
  },
  {
    q: 'Quelle est la différence avec motionsites.ai ?',
    a: 'Mes prompts livrent du code React + Next.js + GSAP + Three.js, pas des templates Webflow. Le tier Agency inclut un Slack privé et la licence commerciale agence, ce que Viktor ne propose pas. Et je parle français.',
  },
  {
    q: 'Les futurs prompts du Lab Pass, c\'est combien par mois ?',
    a: 'Je publie 4 à 6 nouveaux prompts par mois. Le Lab Pass les inclut tous, à vie. Pas de paywall ni d\'upsell ultérieur.',
  },
  {
    q: 'Je peux utiliser un prompt pour un site client ?',
    a: 'Avec Starter ou Lab Pass, oui sur 1 projet client à la fois. Pour des projets client illimités, c\'est le tier Agency.',
  },
  {
    q: 'Remboursement possible ?',
    a: 'Pas une fois la bibliothèque téléchargée (c\'est du digital sans retour possible). C\'est pour ça que 5 prompts sont visibles entièrement avant achat. Tu juges la qualité avant de payer.',
  },
];
