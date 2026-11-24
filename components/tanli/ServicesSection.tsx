'use client';
import { ASSETS_BASE } from '@/lib/assets';

type Service = {
  num: string;
  title: string;
  desc: string;
  icon: string;
};

const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Installation\nélectrique neuve',
    desc: 'Câblage complet de constructions neuves, du tableau électrique aux luminaires, dans le respect strict de la NF C 15-100.',
    icon: `${ASSETS_BASE}/tanli/asset-a5c97d45.png`,
  },
  {
    num: '02',
    title: 'Domotique\n& smart home',
    desc: 'Pilotage centralisé éclairage, chauffage, volets, alarme. Compatible KNX, Loxone, Schneider Wiser.',
    icon: `${ASSETS_BASE}/tanli/asset-822bb522.png`,
  },
  {
    num: '03',
    title: 'Rénovation\nélectrique',
    desc: 'Remise aux normes de l’existant, intégration discrète dans bâti ancien et chalets de montagne.',
    icon: `${ASSETS_BASE}/tanli/asset-c77cf62b.png`,
  },
  {
    num: '04',
    title: 'Dépannage\n7j/7',
    desc: 'Intervention rapide sur panne, court-circuit, mise en sécurité. Astreinte sur le bassin Cluses-Bonneville.',
    icon: `${ASSETS_BASE}/tanli/asset-81f5b3a1.png`,
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="px-6 sm:px-8 lg:px-16 pt-12 lg:pt-16 pb-24 lg:pb-32"
      style={{ background: '#F5F5F5' }}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left column */}
        <div className="lg:w-[38%] flex flex-col justify-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] tracking-tight font-normal"
            style={{ color: '#1A1A1A' }}
          >
            Électricité, domotique et expertise pour révéler chaque espace.
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg font-semibold uppercase text-[11px] tracking-[0.18em] px-8 h-11 mt-10 self-start transition-all active:scale-[0.97]"
            style={{ background: '#03E840', color: '#0A0A0A' }}
          >
            Demander un devis
          </a>
        </div>

        {/* Right column : 2x2 grid */}
        <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <article
              key={s.num}
              className="pl-7 py-8 sm:py-10"
              style={{
                borderLeft: '1px solid rgba(26, 26, 26, 0.12)',
                borderTop: i >= 2 ? '1px solid rgba(26, 26, 26, 0.12)' : 'none',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.icon}
                alt=""
                className="w-14 h-14 object-contain mb-6"
                loading="lazy"
              />
              <h3
                className="text-xl font-medium leading-tight whitespace-pre-line mb-3"
                style={{ color: '#1A1A1A' }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
