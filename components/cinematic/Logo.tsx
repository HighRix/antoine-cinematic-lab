import type { CSSProperties } from 'react';

export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  const id = 'cl-front';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB070" />
          <stop offset="55%" stopColor="#F27D26" />
          <stop offset="100%" stopColor="#C25A18" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9A4716" />
          <stop offset="100%" stopColor="#5F2A0A" />
        </linearGradient>
      </defs>
      {/* Side/depth face (3D extrusion seen from bottom-right) */}
      <path d="M16 44 L44 28 L48 30.5 L20 46.5 Z" fill={`url(#${id}-side)`} />
      {/* Top edge slim highlight (catches the light) */}
      <path d="M16 12 L44 28 L42 27.5 L16 13.5 Z" fill="#FFE2BC" opacity="0.55" />
      {/* Front face with vertical light gradient */}
      <path d="M16 12 L44 28 L16 44 Z" fill={`url(#${id})`} />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  style?: CSSProperties;
};

export function LogoWordmark({ className = '', style }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline font-serif italic tracking-[-0.02em] leading-none ${className}`}
      style={style}
    >
      cinematic<span className="text-[#F27D26]">.</span>lab
    </span>
  );
}

export function Logo({
  size = 32,
  gap = 10,
  wordmarkClassName = '',
  className = '',
}: {
  size?: number;
  gap?: number;
  wordmarkClassName?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap }}>
      <LogoMark size={size} />
      <LogoWordmark className={wordmarkClassName} />
    </span>
  );
}
