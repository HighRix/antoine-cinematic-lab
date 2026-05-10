'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Refresh ScrollTrigger after font load to avoid layout-shift bugs
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}
