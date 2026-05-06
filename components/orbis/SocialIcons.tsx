'use client';
import type { SVGProps } from 'react';

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const ICONS = [
  { Icon: MailIcon, label: 'Email' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: GithubIcon, label: 'GitHub' },
];

export function SocialIconsStack({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {ICONS.map(({ Icon, label }) => (
        <button
          key={label}
          aria-label={label}
          className="orbis-glass rounded-[1rem] w-14 h-14 flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors"
        >
          <Icon width={20} height={20} />
        </button>
      ))}
    </div>
  );
}

export function SocialIconsRow({
  className = '',
  size = 'md',
}: {
  className?: string;
  size?: 'sm' | 'md';
}) {
  const sizeCls =
    size === 'sm'
      ? 'w-11 h-11 rounded-[0.75rem]'
      : 'w-14 h-14 rounded-[1rem]';
  const iconPx = size === 'sm' ? 18 : 20;
  return (
    <div className={`flex gap-2 ${className}`}>
      {ICONS.map(({ Icon, label }) => (
        <button
          key={label}
          aria-label={label}
          className={`orbis-glass ${sizeCls} flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors`}
        >
          <Icon width={iconPx} height={iconPx} />
        </button>
      ))}
    </div>
  );
}

export function SocialIconsVerticalLarge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`orbis-glass rounded-[0.75rem] sm:rounded-[1rem] lg:rounded-[1.25rem] flex flex-col overflow-hidden ${className}`}
    >
      {ICONS.map(({ Icon, label }, i) => (
        <button
          key={label}
          aria-label={label}
          className={`flex items-center justify-center text-[#EFF4FF] hover:bg-white/10 transition-colors w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] lg:w-20 lg:h-20 ${i < ICONS.length - 1 ? 'border-b border-white/10' : ''}`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </button>
      ))}
    </div>
  );
}
