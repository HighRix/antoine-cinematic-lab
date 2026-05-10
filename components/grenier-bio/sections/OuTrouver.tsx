'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar } from 'lucide-react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    type: 'À la ferme',
    name: 'Vente directe à Emberbail',
    address: 'Chemin de Douyssat, 31560 Nailloux',
    schedule: 'Vendredi · 15h à 19h',
    hours: 'Visite conseillée sur contact préalable',
    accent: '#0E7824',
  },
  {
    type: 'Marché',
    name: 'Marché Saint-Aubin',
    address: 'Toulouse · Place Saint-Aubin',
    schedule: 'Tous les dimanches matin',
    hours: '8h00 à 13h00',
    accent: '#D4A574',
  },
  {
    type: 'AMAP',
    name: 'AMAP de Pinsaguel',
    address: 'Pinsaguel · Haute-Garonne',
    schedule: 'Distribution hebdomadaire',
    hours: 'Sur abonnement panier',
    accent: '#5C3A2E',
  },
];

export function OuTrouver() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.point-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="ou-trouver" className="relative py-20 sm:py-24 md:py-32 lg:py-40 bg-paper">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-14 md:mb-24">
          <div className="md:col-span-2 flex md:flex-col items-start gap-3">
            <span className="w-8 h-px bg-[#0E7824] mt-3" />
            <span className="text-xs tracking-[0.22em] uppercase text-[#0E7824] font-medium">
              Où nous trouver
            </span>
          </div>
          <div className="md:col-span-7">
            <h2 className="font-recoleta text-[#2D2D2F] text-[34px] sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              De la ferme à Toulouse,
              <br />
              <span className="italic text-[#0E7824]">en circuit court.</span>
            </h2>
          </div>
          <div className="md:col-span-3 md:col-start-10 flex md:items-end">
            <p className="text-[#2D2D2F]/75 text-sm md:text-base leading-relaxed max-w-xs">
              Vente directe à la ferme tous les vendredis, marché Saint-Aubin chaque dimanche
              matin, AMAP de Pinsaguel le reste de la semaine.
            </p>
          </div>
        </div>

        {/* Carte stylisée — Lauragais avec Garonne, A66, et 3 points de vente */}
        <div className="relative aspect-[4/3] sm:aspect-[16/8] md:aspect-[16/6] mb-12 sm:mb-16 md:mb-20 bg-[#F2EBD9] rounded-sm overflow-hidden border-warm">
          <svg
            viewBox="0 0 1200 450"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="mapBg" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#FAF7F0" />
                <stop offset="100%" stopColor="#E8DDC4" />
              </radialGradient>
              <linearGradient id="riverGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#7DA7C9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7DA7C9" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            <rect width="1200" height="450" fill="url(#mapBg)" />

            {/* Topographic contour lines (Lauragais hills) */}
            {[...Array(7)].map((_, i) => (
              <path
                key={`topo-${i}`}
                d={`M -50 ${110 + i * 55} Q 350 ${70 + i * 55}, 700 ${130 + i * 55} T 1250 ${110 + i * 55}`}
                fill="none"
                stroke="#0E7824"
                strokeOpacity={0.07}
                strokeWidth="1.2"
                strokeDasharray="3 8"
              />
            ))}

            {/* La Garonne */}
            <path
              d="M 280 410 C 320 350, 340 280, 360 210 S 380 100, 420 30"
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <text
              x="290"
              y="395"
              fontSize="10"
              fill="#7DA7C9"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
              opacity="0.7"
              transform="rotate(-72 290 395)"
            >
              LA GARONNE
            </text>

            {/* A66 highway */}
            <path
              d="M 380 195 Q 540 180, 760 165"
              fill="none"
              stroke="#5C3A2E"
              strokeOpacity={0.35}
              strokeWidth="2.5"
            />
            <path
              d="M 380 195 Q 540 180, 760 165"
              fill="none"
              stroke="#FAF7F0"
              strokeOpacity={0.5}
              strokeWidth="1"
              strokeDasharray="6 8"
            />
            <text
              x="560"
              y="170"
              fontSize="9"
              fill="#5C3A2E"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              opacity="0.55"
            >
              A66
            </text>

            {/* Secondary roads */}
            <path
              d="M 380 195 Q 420 220, 470 245"
              fill="none"
              stroke="#5C3A2E"
              strokeOpacity={0.2}
              strokeWidth="1.5"
            />
            <path
              d="M 760 165 Q 820 200, 880 270"
              fill="none"
              stroke="#5C3A2E"
              strokeOpacity={0.15}
              strokeWidth="1.2"
            />

            {/* Vegetation patches */}
            {[
              [610, 260], [890, 200], [1020, 130], [180, 290], [950, 320], [680, 90],
            ].map((p, i) => (
              <circle
                key={`forest-${i}`}
                cx={p[0]}
                cy={p[1]}
                r="14"
                fill="#0E7824"
                fillOpacity="0.06"
              />
            ))}

            {/* Pins */}
            {[
              { x: 760, y: 165, label: 'Ferme', sublabel: 'Nailloux', primary: true },
              { x: 380, y: 195, label: 'Marché Saint-Aubin', sublabel: 'Toulouse' },
              { x: 470, y: 245, label: 'AMAP', sublabel: 'Pinsaguel' },
            ].map((p) => (
              <g key={p.label} transform={`translate(${p.x} ${p.y})`}>
                {p.primary && (
                  <circle r="40" fill="#0E7824" fillOpacity="0.1">
                    <animate attributeName="r" values="20;55;20" dur="3s" repeatCount="indefinite" />
                    <animate
                      attributeName="fill-opacity"
                      values="0.2;0;0.2"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <path
                  d="M 0 -22 C -8 -22 -14 -16 -14 -8 C -14 -2 -8 4 0 12 C 8 4 14 -2 14 -8 C 14 -16 8 -22 0 -22 Z"
                  fill={p.primary ? '#0E7824' : '#2D2D2F'}
                  stroke="#FAF7F0"
                  strokeWidth="2"
                />
                <circle cx="0" cy="-9" r="4" fill="#FAF7F0" />
                <text
                  x="20"
                  y="-2"
                  fontSize="13"
                  fontWeight="600"
                  fill="#2D2D2F"
                  fontFamily="Inter, sans-serif"
                >
                  {p.label}
                </text>
                <text
                  x="20"
                  y="13"
                  fontSize="10"
                  fontWeight="500"
                  fill="#5C3A2E"
                  fontFamily="Inter, sans-serif"
                  opacity="0.7"
                >
                  {p.sublabel}
                </text>
              </g>
            ))}

            {/* Compass */}
            <g transform="translate(1100 70)" opacity="0.55">
              <circle r="22" fill="none" stroke="#2D2D2F" strokeWidth="1" />
              <path d="M 0 -20 L -4 0 L 0 -4 L 4 0 Z" fill="#2D2D2F" />
              <path d="M 0 20 L -4 0 L 0 4 L 4 0 Z" fill="#FAF7F0" stroke="#2D2D2F" strokeWidth="0.5" />
              <text x="0" y="-26" fontSize="9" fontFamily="Inter" fontWeight="700" fill="#2D2D2F" textAnchor="middle">N</text>
            </g>

            {/* Scale bar */}
            <g transform="translate(60 410)">
              <line x1="0" y1="0" x2="80" y2="0" stroke="#2D2D2F" strokeWidth="1" opacity="0.5" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#2D2D2F" strokeWidth="1" opacity="0.5" />
              <line x1="80" y1="-3" x2="80" y2="3" stroke="#2D2D2F" strokeWidth="1" opacity="0.5" />
              <text
                x="40"
                y="15"
                fontSize="9"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
                fill="#2D2D2F"
                opacity="0.55"
                textAnchor="middle"
              >
                ≈ 30 km
              </text>
            </g>
          </svg>

          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-white/85 backdrop-blur-sm rounded-sm px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#2D2D2F]/75 font-medium">
            Lauragais · Haute-Garonne
          </div>

          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 bg-white/85 backdrop-blur-sm rounded-sm px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono tracking-tight text-[#2D2D2F]/75">
            43.3647° N · 1.6428° E
          </div>
        </div>

        {/* Points cards grid (3 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2D2D2F]/10 border-warm">
          {POINTS.map((point) => (
            <div
              key={point.name}
              className="point-card bg-white p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-4 sm:gap-5 hover:bg-[#F2EBD9] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-medium px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: `${point.accent}14`,
                    color: point.accent,
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                  {point.type}
                </span>
              </div>

              <h3 className="font-recoleta text-2xl md:text-3xl text-[#2D2D2F] leading-tight">
                {point.name}
              </h3>

              <div className="space-y-2 text-sm text-[#2D2D2F]/70">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 opacity-60" strokeWidth={1.5} />
                  {point.address}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 opacity-60" strokeWidth={1.5} />
                  {point.schedule}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 opacity-60" strokeWidth={1.5} />
                  {point.hours}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span
                  className="text-xs tracking-[0.18em] uppercase font-medium group-hover:text-[#0E7824] transition-colors"
                  style={{ color: point.accent }}
                >
                  Itinéraire →
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: point.accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
