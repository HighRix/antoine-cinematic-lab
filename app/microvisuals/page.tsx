import type { Metadata } from 'next';
import MicrovisualsHero from '@/components/microvisuals/Hero';

export const metadata: Metadata = {
  title: 'MicroVisuals · AI image generation',
  description:
    'Hero cinematic AI tool : vidéo CloudFront capturée frame-par-frame en boomerang canvas, parallax curseur GSAP, pill nav liquid glass.',
};

export default function MicrovisualsPage() {
  return <MicrovisualsHero />;
}
