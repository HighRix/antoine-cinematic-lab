import type { Metadata } from 'next';
import { PricingTable } from '@/components/lab/PricingTable';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';

export const metadata: Metadata = {
  title: 'Pricing · cinematic.lab',
  description:
    'Toute la bibliothèque pour €27/mois ou €199 lifetime. €499 lifetime pour les agences.',
};

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
  {
    q: 'Comment je reçois les prompts après achat ?',
    a: 'Email immédiat avec lien vers ton espace Stan.store. Tu y trouves tous les prompts en clair, copiables en un clic. Les futurs prompts t\'arrivent par email à chaque publication.',
  },
];

export default function LabPricingPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased">
      <LabHeader />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <section className="pt-10 md:pt-14 pb-12 md:pb-16">
          <h1 className="font-serif italic text-[44px] md:text-[64px] tracking-[-0.02em] leading-[1] text-white">
            Pricing.
          </h1>
          <p className="mt-6 text-white/65 text-base md:text-lg leading-relaxed max-w-[560px]">
            Toute la bibliothèque, tous les futurs prompts. Mensuel ou lifetime, à toi de choisir.
          </p>
        </section>

        <section className="pb-20 md:pb-24">
          <PricingTable />
          <p className="mt-6 text-[12px] text-white/45 leading-relaxed max-w-[640px]">
            Paiement Stan.store · prix net TTC · accès immédiat par email. Pas de remboursement
            une fois la bibliothèque téléchargée.
          </p>
        </section>

        <section className="pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-12 gap-10">
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
    </main>
  );
}
