import type { Metadata } from 'next';
import AutomationMachinesHero from '@/components/automation-machines/Hero';

export const metadata: Metadata = {
  title: 'Automation Machines · Futuristic landing',
  description:
    'Hero futuriste Spline 3D background, gradient text Orbitron, technical specs card, pill badges JetBrains Mono. Stagger animations Motion.',
};

export default function AutomationMachinesPage() {
  return <AutomationMachinesHero />;
}
