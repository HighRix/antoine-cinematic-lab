'use client';
import { Award, Building, Compass } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';

const STATS = [
  {
    value: '20+',
    label: 'Années d’expertise',
    description:
      'Vingt années d’exigence au service d’une architecture résidentielle pensée comme un art de vivre.',
    icon: <Award size={28} strokeWidth={1.8} />,
    // Champagne / gold
    gradient:
      'linear-gradient(137deg, #D4B896 0%, #F5E6D0 45%, #B8956B 100%)',
    delay: 0.1,
  },
  {
    value: '7',
    label: 'Logements en cours',
    description:
      'Une résidence contemporaine inspirée des codes alpins : volumes, toitures inclinées, larges balcons.',
    icon: <Building size={28} strokeWidth={1.8} />,
    // Alpine steel blue
    gradient:
      'linear-gradient(137deg, #5A6F88 0%, #B8C8DC 45%, #2C3D52 100%)',
    delay: 0.2,
  },
  {
    value: '100%',
    label: 'Sur mesure',
    description:
      'Aucun plan répliqué : volumes, lumière et circulation sont taillés pour révéler votre site et votre histoire.',
    icon: <Compass size={28} strokeWidth={1.8} />,
    // Sage / alpine forest
    gradient:
      'linear-gradient(137deg, #6B7F5C 0%, #C4D2B0 45%, #3D4F35 100%)',
    delay: 0.3,
  },
];

export function KpiSection() {
  return (
    <section className="bg-[#F8F8F8] pt-16 md:pt-20 pb-24 md:pb-32">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header : same eyebrow + title + subtext + CTA pattern */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="block h-px w-10 bg-[#141414]/30" />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/60">
              En chiffres
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <h2 className="md:col-span-7 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-[#141414]">
              20 ans d&apos;expertise au service de votre projet.
            </h2>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
              <p className="text-[#141414]/70 text-[14px] md:text-[15px] leading-relaxed">
                Chaque projet est pensé avec exigence : implantation, volumes, circulation et qualité des espaces. Nos chantiers parlent pour nous, du croquis à la remise des clés.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#141414] hover:opacity-60 transition-opacity"
              >
                Discuter du projet
                <span aria-hidden className="block h-px w-6 bg-[#141414]" />
              </a>
            </div>
          </div>
        </div>

        {/* Feature stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-3 lg:gap-3 w-full max-w-[1080px] mx-auto">
          {STATS.map((s) => (
            <FeatureCard
              key={s.label}
              value={s.value}
              label={s.label}
              description={s.description}
              icon={s.icon}
              gradient={s.gradient}
              delay={s.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
