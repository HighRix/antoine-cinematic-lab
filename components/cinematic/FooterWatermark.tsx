'use client';

import { useEffect, useRef } from 'react';

export function FooterWatermark() {
  const textRef = useRef<SVGTextElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fit = () => {
      const text = textRef.current;
      const svg = svgRef.current;
      if (!text || !svg) return;
      try {
        const bbox = text.getBBox();
        svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      } catch {}
    };

    if (document.fonts && (document.fonts as { ready?: Promise<void> }).ready) {
      (document.fonts as { ready: Promise<void> }).ready.then(fit);
    } else {
      window.addEventListener('load', fit);
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 mt-[-30px] md:mt-[-50px] pointer-events-none select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto overflow-visible"
      >
        <text
          ref={textRef}
          x="500"
          y="160"
          textAnchor="middle"
          fontSize="220"
          fontStyle="italic"
          fontFamily="var(--font-instrument-serif, 'Instrument Serif'), Georgia, serif"
          fill="rgba(255,255,255,0.07)"
          style={{ letterSpacing: '-0.03em' }}
        >
          <tspan>cinematic</tspan>
          <tspan fill="rgba(242,125,38,0.45)">.</tspan>
          <tspan>lab</tspan>
        </text>
      </svg>
    </div>
  );
}
