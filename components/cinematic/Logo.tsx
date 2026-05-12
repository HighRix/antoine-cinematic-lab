import type { CSSProperties } from 'react';

const ORANGE = '#F27D26';

export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <rect x="0" y="0" width="32" height="32" rx="6" fill={ORANGE} />
      <path d="M12.5 9 L23 16 L12.5 23 Z" fill="#FFFFFF" />
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
      className={`inline-flex items-center font-extrabold tracking-[-0.045em] leading-none lowercase ${className}`}
      style={style}
    >
      <span>cinematic</span>
      <span
        aria-hidden
        className="inline-block bg-[#F27D26] mx-[0.12em] self-center"
        style={{ width: '0.28em', height: '0.28em', borderRadius: '0.05em' }}
      />
      <span>lab</span>
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
