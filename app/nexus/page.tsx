import type { Metadata } from 'next';
import { NexusHero } from '@/components/nexus/HeroSection';

export const metadata: Metadata = {
  title: 'The vision of engineering is human + AI',
  description:
    'Map the talent you need, track the talent you have, and close your gaps to thrive in a GenAI world.',
};

export default function NexusRoute() {
  return <NexusHero />;
}
