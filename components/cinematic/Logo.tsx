import type { CSSProperties } from 'react';

/**
 * cinematic.lab logo mark — abstract geometric glyph.
 * A single italic-slanted bar (parallelogram) in Kleo orange.
 * Echoes the italic of the Instrument Serif wordmark.
 * No literal reference (not a play, not a frame, not a lens).
 */
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
      {/* Italic-slanted bar, ~14° forward slant to match Instrument Serif italic */}
      <path d="M14.5 3 L23 3 L17.5 29 L9 29 Z" fill="#F27D26" />
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
  gap = 12,
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
