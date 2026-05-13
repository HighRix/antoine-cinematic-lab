import type { Metadata } from 'next';
import NewEraHero from '@/components/new-era/Hero';

export const metadata: Metadata = {
  title: 'New Era · Automotive marketplace',
  description:
    'Hero automotive premium · vidéo background plein écran + NEW ERA gradient Bebas Neue + navbar + dual-CTA bottom (paragraphe + tagline).',
};

export default function NewEraPage() {
  return <NewEraHero />;
}
