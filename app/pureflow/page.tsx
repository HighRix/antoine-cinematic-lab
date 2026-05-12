import type { Metadata } from 'next';
import PureflowHero from '@/components/pureflow/Hero';

export const metadata: Metadata = {
  title: 'PureFlow One · Clean Air, Clear Mind',
  description:
    'Hero cinematic avec spotlight reveal canvas — masque le visage du modèle au survol du curseur pour révéler le produit PureFlow One.',
};

export default function PureflowPage() {
  return <PureflowHero />;
}
