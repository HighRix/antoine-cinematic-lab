import type { Metadata } from 'next';
import { PrintBar } from './PrintBar';

export const metadata: Metadata = {
  title: 'Devis · Pizzeria L\'Etna · cinematic.lab',
  description: 'Devis création site web, Pizzeria L\'Etna, Cluses.',
};

const QUOTE = {
  number: 'DEV-2026-001',
  emittedOn: '8 mai 2026',
  validUntil: '7 juin 2026',
  deliveryDays: '2 semaines (10 jours ouvrés)',
};

const FROM = {
  name: 'Antoine SCIÉ',
  brand: 'cinematic.lab',
  vat: 'TVA non applicable, art. 293 B du CGI',
  address: '22 Rue de Mussel, 74950 Scionzier',
  phone: '+33 6 81 94 90 21',
  email: 'antoine.scie@gmail.com',
};

const TO = {
  name: 'Pizzeria L\'Etna',
  legal: 'SAS METALLO-MAZZA',
  siret: 'SIRET 799 140 215 00010',
  contact: 'À l\'attention de Mme Martina METALLO',
  address: '12 Avenue de la Libération, 74300 Cluses',
  phone: '+33 4 50 98 31 48',
  email: 'contact@pizzeria-etna-cluses.com',
};

type Line = {
  num: string;
  title: string;
  detail: string;
  qty: number;
  unit: number;
};

const LINES: Line[] = [
  {
    num: '01',
    title: 'Cadrage projet et wireframes',
    detail:
      'Atelier de cadrage (objectifs, ton, public). Moodboard de référence. Wireframes des 5 pages.',
    qty: 1,
    unit: 100,
  },
  {
    num: '02',
    title: 'Direction artistique et maquettes UI',
    detail:
      'Système de design (couleurs, typographies, composants). Maquettes Figma haute-fidélité des 5 pages, desktop et mobile. Une itération de retouches incluse.',
    qty: 1,
    unit: 350,
  },
  {
    num: '03',
    title: 'Développement front-end (Next.js)',
    detail:
      '5 pages : Accueil, Carte (pizzas et pâtes), Galerie et À propos, Saveur Italiano simplifié, Contact. Animations au scroll. 100 % responsive (mobile, tablette, desktop).',
    qty: 1,
    unit: 480,
  },
  {
    num: '04',
    title: 'Intégration des contenus',
    detail:
      'Mise en page des photos, textes et menus fournis par la cliente. Optimisation des images (WebP, lazy loading).',
    qty: 1,
    unit: 80,
  },
  {
    num: '05',
    title: 'Référencement local (SEO technique)',
    detail:
      'Méta-titres et descriptions, Open Graph, Schema.org Restaurant et LocalBusiness en JSON-LD, sitemap.xml, robots.txt, soumission Google Search Console.',
    qty: 1,
    unit: 100,
  },
  {
    num: '06',
    title: 'Déploiement et mise en ligne',
    detail:
      'Configuration DNS sur le domaine existant (pizzeria-etna-cluses.com). HTTPS automatique. Hébergement Vercel offert à vie. Tests multi-navigateurs.',
    qty: 1,
    unit: 60,
  },
  {
    num: '07',
    title: 'Formation et garantie corrective',
    detail:
      'Prise en main du site sur place (environ 30 min). Garantie corrective de 30 jours après mise en ligne (bugs sans frais).',
    qty: 1,
    unit: 30,
  },
];

const subtotal = LINES.reduce((s, l) => s + l.qty * l.unit, 0); // 1200
const discountPct = 25;
const discountAmount = (subtotal * discountPct) / 100; // 300
const totalHT = subtotal - discountAmount; // 900

const PAYMENT = [
  { label: 'Acompte à la signature', pct: 40, amount: 360 },
  { label: 'Validation des maquettes', pct: 30, amount: 270 },
  { label: 'Livraison du site', pct: 30, amount: 270 },
];

const INCLUDED = [
  '5 pages responsive (mobile · tablette · desktop)',
  'Animations cinématiques fines au scroll',
  'SEO technique + Schema.org Restaurant',
  'Hébergement Vercel offert à vie',
  'Déploiement sur le domaine existant',
  'Garantie corrective 30 jours',
  'Formation prise en main 30 min',
];

const NOT_INCLUDED = [
  'Création / refonte du logo',
  'Photographies professionnelles',
  'Rédaction des textes (fournis par la cliente)',
  'Maintenance évolutive (forfait sur devis)',
  'Achat / renouvellement du nom de domaine',
  'Catalogue détaillé de l\'épicerie (page produits e-commerce)',
  'Création / suivi mensuel SEO local actif',
];

const fmt = (n: number) =>
  n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

export default function DevisEtnaPage() {
  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body { background: #0A0A0A !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .devis-shell { box-shadow: none !important; margin: 0 !important; width: 210mm !important; min-height: 297mm !important; height: 297mm !important; max-height: 297mm !important; overflow: hidden !important; page-break-inside: avoid !important; page-break-after: avoid !important; }
          .devis-no-print { display: none !important; }
        }
        html, body {
          background: #1A1A1A;
        }
        .devis-page, .devis-page * { box-sizing: border-box; }
        .devis-page {
          font-family: var(--font-inter), system-ui, sans-serif;
          color: #F5F5F5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .devis-page .serif {
          font-family: var(--font-instrument-serif), Georgia, serif;
          font-style: italic;
          letter-spacing: -0.02em;
        }
        .devis-page .num { font-variant-numeric: tabular-nums; }
        .devis-shell {
          width: 210mm;
          min-height: 297mm;
          height: 297mm;
          margin: 32px auto;
          padding: 13mm 14mm 13mm 14mm;
          background: #0A0A0A;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .devis-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(232, 114, 26, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(232, 114, 26, 0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .devis-shell > * { position: relative; z-index: 1; }
        .label {
          font-size: 8.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(245,245,245,0.45);
          font-weight: 500;
        }
        .divider {
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%);
        }
        .accent { color: #E8721A; }
        .row-line {
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .row-line:first-child { border-top: none; }
        .total-band {
          background: linear-gradient(135deg, rgba(232, 114, 26, 0.08) 0%, rgba(232, 114, 26, 0.02) 100%);
          border: 1px solid rgba(232, 114, 26, 0.22);
        }
        .pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: rgba(232, 114, 26, 0.10);
          border: 1px solid rgba(232, 114, 26, 0.30);
          color: #E8721A;
          font-weight: 600;
        }
        .signature-box {
          height: 56px;
          border: 1px dashed rgba(255,255,255,0.18);
          border-radius: 6px;
          background: rgba(255,255,255,0.015);
        }
      `}</style>

      <div className="devis-page">
        <PrintBar />

        <article className="devis-shell">
          {/* ── Header ── */}
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 24,
              marginBottom: 14,
            }}
          >
            <div>
              <span className="serif" style={{ fontSize: 26, lineHeight: 1, color: '#FFFFFF' }}>
                cinematic
                <span style={{ color: 'rgba(255,255,255,0.40)' }}>.</span>
                lab
              </span>
              <div style={{ marginTop: 5, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.50)' }}>
                Sites web sur-mesure
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="label" style={{ marginBottom: 6 }}>Devis</div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1, color: '#E8721A' }}>
                N° {QUOTE.number}
              </div>
              <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(245,245,245,0.55)', lineHeight: 1.6 }}>
                <div>
                  <span className="label" style={{ marginRight: 6 }}>Émis le</span>
                  <span className="num" style={{ color: '#F5F5F5' }}>{QUOTE.emittedOn}</span>
                </div>
                <div>
                  <span className="label" style={{ marginRight: 6 }}>Valable jusqu'au</span>
                  <span className="num" style={{ color: '#F5F5F5' }}>{QUOTE.validUntil}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="divider" />

          {/* ── Émetteur & Client ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 32,
              padding: '12px 0',
            }}
          >
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Émetteur</div>
              <div className="serif" style={{ fontSize: 16, color: '#FFFFFF', marginBottom: 5 }}>
                {FROM.name}
              </div>
              <div style={{ fontSize: 10.5, color: 'rgba(245,245,245,0.7)', lineHeight: 1.55 }}>
                <div>{FROM.brand}</div>
                <div>{FROM.address}</div>
                <div className="num">{FROM.phone}</div>
                <div>{FROM.email}</div>
                <div style={{ marginTop: 8, fontSize: 9.5, color: 'rgba(245,245,245,0.5)' }}>{FROM.vat}</div>
              </div>
            </div>
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Adressé à</div>
              <div className="serif" style={{ fontSize: 16, color: '#FFFFFF', marginBottom: 5 }}>
                {TO.name}
              </div>
              <div style={{ fontSize: 10.5, color: 'rgba(245,245,245,0.7)', lineHeight: 1.55 }}>
                <div>{TO.legal}</div>
                <div>{TO.contact}</div>
                <div>{TO.address}</div>
                <div className="num">{TO.phone}</div>
                <div>{TO.email}</div>
                <div className="num" style={{ marginTop: 8, fontSize: 9.5, color: 'rgba(245,245,245,0.5)' }}>
                  {TO.siret}
                </div>
              </div>
            </div>
          </section>

          {/* ── Projet ── */}
          <section
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '8px 0',
              marginBottom: 10,
            }}
          >
            <div className="label" style={{ marginBottom: 4 }}>Projet</div>
            <div className="serif" style={{ fontSize: 17, lineHeight: 1.2, color: '#FFFFFF', marginBottom: 3 }}>
              Refonte du site internet de la Pizzeria L'Etna
            </div>
            <p style={{ fontSize: 10, color: 'rgba(245,245,245,0.7)', lineHeight: 1.45, maxWidth: 620 }}>
              Site vitrine moderne et 100 % responsive, déployé sur le domaine existant. Site simple, sans 3D ni intégrations e-commerce.
            </p>
          </section>

          {/* ── Tableau prestations ── */}
          <section style={{ marginBottom: 10 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr 40px 72px 82px',
                gap: 10,
                padding: '0 0 6px 0',
                borderBottom: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <div className="label">#</div>
              <div className="label">Désignation</div>
              <div className="label" style={{ textAlign: 'right' }}>Qté</div>
              <div className="label" style={{ textAlign: 'right' }}>P.U. HT</div>
              <div className="label" style={{ textAlign: 'right' }}>Total HT</div>
            </div>

            {LINES.map((l) => (
              <div
                key={l.num}
                className="row-line"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr 40px 72px 82px',
                  gap: 10,
                  padding: '5px 0',
                  alignItems: 'flex-start',
                }}
              >
                <div className="serif num" style={{ fontSize: 13, color: '#E8721A' }}>{l.num}</div>
                <div>
                  <div style={{ fontSize: 11, color: '#F5F5F5', fontWeight: 600, marginBottom: 2 }}>
                    {l.title}
                  </div>
                  <div style={{ fontSize: 9.5, color: 'rgba(245,245,245,0.55)', lineHeight: 1.45 }}>
                    {l.detail}
                  </div>
                </div>
                <div className="num" style={{ fontSize: 10.5, color: 'rgba(245,245,245,0.7)', textAlign: 'right' }}>
                  {l.qty}
                </div>
                <div className="num" style={{ fontSize: 10.5, color: 'rgba(245,245,245,0.7)', textAlign: 'right' }}>
                  {fmt(l.unit)}
                </div>
                <div className="num" style={{ fontSize: 11, color: '#F5F5F5', textAlign: 'right', fontWeight: 600 }}>
                  {fmt(l.qty * l.unit)}
                </div>
              </div>
            ))}
          </section>

          {/* ── Totaux ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 300px',
              gap: 24,
              alignItems: 'flex-end',
              marginBottom: 14,
            }}
          >
            <div>
              <span className="pill">Tarif exceptionnel apporteur d'affaires</span>
            </div>

            <div className="total-band" style={{ padding: 14, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: 'rgba(245,245,245,0.7)' }}>Sous-total HT</span>
                <span className="num" style={{ color: '#F5F5F5' }}>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: 'rgba(245,245,245,0.7)' }}>
                  Remise apporteur d'affaires <span className="num">−{discountPct}&nbsp;%</span>
                </span>
                <span className="num" style={{ color: '#E8721A' }}>−{fmt(discountAmount)}</span>
              </div>
              <div style={{ height: 1, background: 'rgba(232,114,26,0.25)', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="serif" style={{ fontSize: 15, color: '#FFFFFF' }}>Total HT</span>
                <span className="serif num" style={{ fontSize: 26, color: '#E8721A', lineHeight: 1 }}>
                  {fmt(totalHT)}
                </span>
              </div>
              <div style={{ marginTop: 6, fontSize: 9, color: 'rgba(245,245,245,0.45)', textAlign: 'right' }}>
                TVA non applicable, art. 293 B du CGI
              </div>
              <div style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: '1px solid rgba(232,114,26,0.18)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
                <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.7)' }}>
                  Net à payer
                </span>
                <span className="num" style={{ fontSize: 15, color: '#FFFFFF', fontWeight: 700 }}>
                  {fmt(totalHT)}
                </span>
              </div>
            </div>
          </section>

          {/* ── Inclus / Non inclus ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              padding: '10px 0',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 10,
            }}
          >
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Inclus dans la prestation</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {INCLUDED.map((it, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 9.5, color: 'rgba(245,245,245,0.78)', lineHeight: 1.45, marginBottom: 3 }}>
                    <span className="accent" style={{ flexShrink: 0 }}>✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Non inclus / hors périmètre</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {NOT_INCLUDED.map((it, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 9.5, color: 'rgba(245,245,245,0.55)', lineHeight: 1.45, marginBottom: 3 }}>
                    <span style={{ flexShrink: 0, color: 'rgba(245,245,245,0.35)' }}>·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Délai & Modalités ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: 24,
              padding: '10px 0',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 12,
            }}
          >
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Délai de livraison</div>
              <div className="serif" style={{ fontSize: 16, color: '#FFFFFF', marginBottom: 4 }}>
                {QUOTE.deliveryDays}
              </div>
              <p style={{ fontSize: 9.5, color: 'rgba(245,245,245,0.55)', lineHeight: 1.45 }}>
                À compter de la signature et de la réception complète des contenus (textes, photos, carte). Mise en ligne incluse.
              </p>
            </div>
            <div>
              <div className="label" style={{ marginBottom: 6 }}>Modalités de paiement</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {PAYMENT.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '3px 0',
                      borderBottom: i < PAYMENT.length - 1 ? '1px dashed rgba(255,255,255,0.08)' : 'none',
                      fontSize: 10.5,
                    }}
                  >
                    <span style={{ color: 'rgba(245,245,245,0.75)' }}>
                      <span className="num accent" style={{ marginRight: 8, fontWeight: 700 }}>{p.pct}%</span>
                      {p.label}
                    </span>
                    <span className="num" style={{ color: '#F5F5F5', fontWeight: 600 }}>{fmt(p.amount)}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6, fontSize: 9.5, color: 'rgba(245,245,245,0.5)', lineHeight: 1.45 }}>
                Paiement par virement bancaire ou en espèces. RIB transmis avec la facture d'acompte. Délai de règlement : 7 jours à réception de chaque facture.
              </div>
            </div>
          </section>

          {/* ── Acceptation ── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginBottom: 10,
            }}
          >
            <div>
              <div className="label" style={{ marginBottom: 5 }}>Pour cinematic.lab</div>
              <div style={{ fontSize: 10.5, color: 'rgba(245,245,245,0.7)', lineHeight: 1.5, marginBottom: 6 }}>
                Antoine SCIÉ
              </div>
              <div className="signature-box" />
            </div>
            <div>
              <div className="label" style={{ marginBottom: 5 }}>
                Bon pour accord, pour la Pizzeria L'Etna
              </div>
              <div style={{ fontSize: 9.5, color: 'rgba(245,245,245,0.55)', lineHeight: 1.45, marginBottom: 6 }}>
                Date, lieu, signature précédée de la mention manuscrite « <strong style={{ color: '#F5F5F5' }}>Bon pour accord</strong> ».
              </div>
              <div className="signature-box" />
            </div>
          </section>

          {/* ── Footer mentions ── */}
          <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8, marginTop: 'auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 16,
                fontSize: 8.5,
                color: 'rgba(245,245,245,0.45)',
                lineHeight: 1.45,
              }}
            >
              <div style={{ maxWidth: 420 }}>
                Devis valable 30 jours à compter de sa date d'émission. Aucun escompte appliqué pour règlement anticipé. En cas de retard de paiement, pénalité de 3 fois le taux d'intérêt légal et indemnité forfaitaire de 40 € pour frais de recouvrement (art. L441-10 et D441-5 du Code de commerce).
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="serif" style={{ color: '#FFFFFF', fontSize: 13 }}>cinematic.lab</div>
                <div className="num">{FROM.phone} · {FROM.email}</div>
              </div>
            </div>
          </footer>
        </article>

        <div className="devis-no-print" style={{ height: 32 }} />
      </div>
    </>
  );
}
