'use client';
import { useState } from 'react';

const ITEMS = [
  {
    key: 'analysis',
    label: 'Conception sur mesure',
    title: 'Conception sur mesure',
    desc: 'Études de site, esquisses et avant-projets pensés pour révéler le potentiel unique de votre terrain.',
  },
  {
    key: 'collection',
    label: 'Maîtrise d’œuvre',
    title: 'Maîtrise d’œuvre',
    desc: 'De l’avant-projet à la livraison : pilotage des entreprises, suivi qualité et coordination des corps d’état.',
  },
  {
    key: 'policy',
    label: 'Permis & démarches',
    title: 'Permis & démarches',
    desc: 'Constitution du dossier de permis de construire, échanges avec les services de l’urbanisme, gestion des recours.',
  },
  {
    key: 'closing',
    label: 'Suivi de chantier',
    title: 'Suivi de chantier',
    desc: 'Visites hebdomadaires, validation des étapes clés, contrôle des prestations jusqu’à la remise des clés.',
  },
];

const IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260503_150112_2b0e700f-7af4-4459-b326-7d9e2f468daa.png&w=1280&q=85';

export function ProcessSection() {
  const [activeKey, setActiveKey] = useState<string>('collection');
  const active = ITEMS.find((i) => i.key === activeKey) ?? ITEMS[1];

  return (
    <section className="bg-[#F8F8F8] pt-16 md:pt-20 pb-24 md:pb-32">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Header : same pattern as PropertiesSection: eyebrow + title + subtext + CTA */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="block h-px w-10 bg-[#141414]/30" />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/60">
              Notre process
            </span>
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414]/30 ml-auto hidden md:block">
              03 / 04
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <h2 className="md:col-span-7 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-[#141414]">
              Notre approche, du croquis à la livraison.
            </h2>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
              <p className="text-[#141414]/70 text-[14px] md:text-[15px] leading-relaxed">
                Conception sur mesure, gestion des permis, maîtrise d&apos;œuvre et suivi de chantier. Un accompagnement complet pour votre projet de A à Z.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#141414] hover:opacity-60 transition-opacity"
              >
                Demander un devis
                <span aria-hidden className="block h-px w-6 bg-[#141414]" />
              </a>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0">
          {/* Left content block */}
          <div className="md:col-span-4 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[480px]">
            <div>
              <h3 className="text-[22px] md:text-[26px] font-medium text-[#141414] tracking-tight leading-tight">
                {active.title}
              </h3>
              <p className="text-[#A5A5A5] text-[14px] leading-relaxed mt-4">
                {active.desc}
              </p>
              <a
                href="#"
                className="inline-flex items-center mt-8 border border-black/10 bg-transparent hover:bg-gray-50 px-6 py-3 text-[13px] font-medium text-[#141414] transition-colors"
              >
                Devis gratuit
              </a>
            </div>

            <ul className="flex flex-col gap-3 mt-12">
              {ITEMS.map((item) => {
                const isActive = item.key === activeKey;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => setActiveKey(item.key)}
                      className={`text-left text-[13px] font-medium transition-colors ${
                        isActive ? 'text-[#141414]' : 'text-[#A5A5A5] hover:text-[#141414]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right image */}
          <div className="md:col-span-8 aspect-video md:aspect-square overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGE} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
