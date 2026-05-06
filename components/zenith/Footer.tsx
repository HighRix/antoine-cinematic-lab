'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { SVGProps } from 'react';
import { ModemAnimatedFooter } from '@/components/ui/modem-animated-footer';

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.85.27-1.5 1.5-1.5h1.7V4.3c-.3-.04-1.27-.13-2.4-.13-2.38 0-4 1.45-4 4.1V10.5H7.5v3h2.8V21h3.2z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    icon: <InstagramIcon className="w-6 h-6" />,
    href: 'https://www.instagram.com/ft_architecture_et_design/',
    label: 'Instagram',
  },
  {
    icon: <FacebookIcon className="w-6 h-6" />,
    href: 'https://www.facebook.com/ferhat.tanli',
    label: 'Facebook',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    href: 'mailto:tanli.ferhat@yahoo.fr',
    label: 'Email',
  },
  {
    icon: <Phone className="w-6 h-6" />,
    href: 'tel:+33786285288',
    label: 'Téléphone',
  },
];

const NAV_LINKS = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Process', href: '#process' },
  { label: 'Cabinet', href: '#cabinet' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <ModemAnimatedFooter
      brandName="FT Design"
      brandDescription="Architecture résidentielle sur mesure. Plus qu'un plan, un art de vivre. Cluses, Haute-Savoie. 20 ans d'expertise."
      socialLinks={SOCIAL_LINKS}
      navLinks={NAV_LINKS}
      pageBg="#F8F8F8"
      fg="#141414"
      muted="#A5A5A5"
      brandIcon={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/ft/logo.png"
          alt="FT Design"
          className="w-full h-full object-contain"
          draggable={false}
        />
      }
    />
  );
}
