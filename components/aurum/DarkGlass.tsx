'use client';
import type { CSSProperties, ReactNode } from 'react';

const DARK_GLASS: CSSProperties = {
  background: 'rgba(0, 0, 0, 0.4)',
  backgroundBlendMode: 'luminosity',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  border: 'none',
  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
};

function DarkBorderGradient() {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1.4px',
        background: `linear-gradient(180deg,
          rgba(255,255,255,0.3) 0%,
          rgba(255,255,255,0.1) 20%,
          rgba(255,255,255,0) 40%,
          rgba(255,255,255,0) 60%,
          rgba(255,255,255,0.1) 80%,
          rgba(255,255,255,0.3) 100%)`,
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      }}
    />
  );
}

export function DarkGlass({
  children,
  className = '',
  style,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'nav' | 'span';
}) {
  const Tag = as as 'div';
  return (
    <Tag className={`relative ${className}`} style={{ ...DARK_GLASS, ...style }}>
      {children}
      <DarkBorderGradient />
    </Tag>
  );
}
