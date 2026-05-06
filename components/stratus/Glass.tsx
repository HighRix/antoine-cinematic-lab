'use client';
import type { CSSProperties, ReactNode, MouseEvent } from 'react';

const GLASS_BASE: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.06)',
  backgroundBlendMode: 'luminosity',
  backdropFilter: 'blur(12px) saturate(140%)',
  WebkitBackdropFilter: 'blur(12px) saturate(140%)',
  border: 'none',
  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.12)',
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
};

const GLASS_STRONG: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.10)',
  backgroundBlendMode: 'luminosity',
  backdropFilter: 'blur(50px) saturate(160%)',
  WebkitBackdropFilter: 'blur(50px) saturate(160%)',
  border: 'none',
  boxShadow:
    '4px 4px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.18)',
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
};

function BorderGradient({ strong = false }: { strong?: boolean }) {
  const stops = strong
    ? '0.65, 0.25, 0, 0, 0.25, 0.65'
    : '0.55, 0.18, 0, 0, 0.18, 0.55';
  const [a, b, c, d, e, f] = stops.split(', ');
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1.4px',
        background: `linear-gradient(180deg,
          rgba(255,255,255,${a}) 0%,
          rgba(255,255,255,${b}) 20%,
          rgba(255,255,255,${c}) 40%,
          rgba(255,255,255,${d}) 60%,
          rgba(255,255,255,${e}) 80%,
          rgba(255,255,255,${f}) 100%)`,
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      }}
    />
  );
}

type GlassProps = {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  style?: CSSProperties;
  as?: 'div' | 'span' | 'button' | 'a';
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  href?: string;
};

export function Glass({
  children,
  className = '',
  strong = false,
  style,
  as = 'div',
  onClick,
  href,
}: GlassProps) {
  const Tag = as as 'div';
  const baseStyle = { ...(strong ? GLASS_STRONG : GLASS_BASE), ...style };
  const props: Record<string, unknown> = {
    className: `relative ${className}`,
    style: baseStyle,
    onClick,
  };
  if (as === 'a' && href) props.href = href;

  return (
    <Tag {...props}>
      {children}
      <BorderGradient strong={strong} />
    </Tag>
  );
}

export function GlassButton({
  children,
  className = '',
  strong = true,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer inline-flex items-center gap-2 ${className}`}
      style={strong ? GLASS_STRONG : GLASS_BASE}
    >
      {children}
      <BorderGradient strong={strong} />
    </button>
  );
}
