import type { Metadata } from 'next';
import './grenier-bio.css';

const SITE_URL = 'https://antoine-cinematic-lab.vercel.app/grenier-bio';

export const metadata: Metadata = {
  title: 'Le Grenier Bio d’Emberbail · Ferme bio à Nailloux (Haute-Garonne)',
  description:
    'Ferme bio à Nailloux (31). 120 hectares de céréales et oléagineux + 900 poules pondeuses en plein air. Huiles pressées à froid, farine sur meule de pierre, œufs frais. Vente directe.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Le Grenier Bio d’Emberbail · Bio et local c’est idéal',
    description:
      '120 hectares de cultures bio et 900 poules pondeuses en plein air à Nailloux (31). De la graine à votre table, sans intermédiaire.',
    url: SITE_URL,
    siteName: 'Le Grenier Bio d’Emberbail',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/grenier-bio/logo.png',
        width: 1200,
        height: 630,
        alt: 'Le Grenier Bio d’Emberbail',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'Le Grenier Bio d’Emberbail',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      founder: [
        { '@type': 'Person', name: 'Nicole SCIÉ' },
        { '@type': 'Person', name: 'Philippe SCIÉ' },
      ],
      sameAs: [
        'https://www.facebook.com/share/14fqcjg3KQC/?mibextid=wwXIfr',
        'https://www.instagram.com/legrenierbio',
        'https://www.bienvenue-a-la-ferme.com/occitanie/haute-garonne/nailloux/ferme/le-grenier-bio-d-emberbail/549329',
      ],
    },
    {
      '@type': ['LocalBusiness', 'FoodEstablishment'],
      '@id': `${SITE_URL}#localbusiness`,
      name: 'Le Grenier Bio d’Emberbail',
      url: SITE_URL,
      telephone: '+33610346373',
      email: 'legrenierbio31@gmail.com',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chemin de Douyssat, Emberbail du bois',
        addressLocality: 'Nailloux',
        postalCode: '31560',
        addressRegion: 'Occitanie',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.3647,
        longitude: 1.6428,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Friday',
          opens: '15:00',
          closes: '19:00',
        },
      ],
      foundingDate: '1968',
      slogan: 'Bio et local, c’est idéal.',
    },
  ],
};

export default function GrenierBioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Recoleta Regular — onlinewebfonts CDN, hoisted to <head> by Next */}
      <link
        rel="stylesheet"
        href="https://db.onlinewebfonts.com/c/67415ab41a7350f81536b69763e6d031?family=Recoleta+Regular"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SmoothScroll is already provided by the root layout — don't double-wrap. */}
      <div className="grenier-bio-root antialiased min-h-screen">
        {children}
      </div>
    </>
  );
}
