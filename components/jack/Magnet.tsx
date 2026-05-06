'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  /** Max pixels Jack can travel upward (negative y). 0 = cannot move up at all. */
  maxUp?: number;
  /** Max pixels of downward travel. */
  maxDown?: number;
  /** Max pixels of horizontal travel each side. */
  maxX?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  maxUp,
  maxDown,
  maxX,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const within =
        Math.abs(dx) < rect.width / 2 + padding &&
        Math.abs(dy) < rect.height / 2 + padding;
      if (within) {
        let nx = dx / strength;
        let ny = dy / strength;
        if (maxX !== undefined) nx = Math.max(-maxX, Math.min(maxX, nx));
        // ny < 0 = moving up, ny > 0 = moving down
        if (maxUp !== undefined) ny = Math.max(-maxUp, ny);
        if (maxDown !== undefined) ny = Math.min(maxDown, ny);
        setActive(true);
        setPos({ x: nx, y: ny });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [padding, strength, maxUp, maxDown, maxX]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
