import type { Metadata } from 'next';
import WeblexHero from '@/components/weblex/Hero';

export const metadata: Metadata = {
  title: 'Weblex · Smart Website Builder',
  description:
    'Hero dark + vidéo background avec boucle seamless (fade out / fade in synchronisés via requestAnimationFrame), navbar transparent, accent lime green.',
};

export default function WeblexPage() {
  return <WeblexHero />;
}
