'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Prompt } from '@/data/prompts';

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '300px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, [inView]);

  return (
    <Link
      ref={ref}
      href={`/lab/${prompt.slug}`}
      className="group relative block bg-[#0C0C0C] overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F27D26]"
      style={{ aspectRatio: '16 / 10' }}
      aria-label={`${prompt.name} — ${prompt.tagline}`}
    >
      {/* Video preview */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {inView && (
          <video
            ref={videoRef}
            src={prompt.video}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden
          />
        )}
      </div>

      {/* Bottom gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent pointer-events-none"
      />

      {/* Top row : number + tier badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4 z-10">
        <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-white/60 font-mono">
          {prompt.number}
        </span>
        <span
          className={`text-[10px] tracking-[0.2em] uppercase font-mono px-2 py-1 rounded-full ${
            prompt.tier === 'free'
              ? 'bg-[#F27D26]/15 text-[#F27D26] border border-[#F27D26]/40'
              : 'bg-white/5 text-white/55 border border-white/15'
          }`}
        >
          {prompt.tier === 'free' ? 'Gratuit' : 'Premium'}
        </span>
      </div>

      {/* Always visible : name */}
      <div className="absolute bottom-5 left-5 right-5 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <p className="font-serif italic text-lg md:text-xl tracking-[-0.01em] text-white">
          {prompt.name}
        </p>
        <p className="text-[11px] tracking-[0.18em] uppercase font-mono text-white/40 mt-1">
          {prompt.category}
        </p>
      </div>

      {/* Hover overlay : name + tagline */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col gap-2 z-10 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.02em] leading-[1] text-white">
          {prompt.name}
        </h2>
        <p className="text-white/70 text-[13px] leading-relaxed max-w-[420px]">
          {prompt.tagline}
        </p>
      </div>

      {/* Orange corner accent on hover */}
      <span
        aria-hidden
        className="absolute top-0 left-0 w-0 h-0 group-hover:w-8 group-hover:h-[2px] transition-all duration-500"
        style={{ background: '#F27D26' }}
      />
      <span
        aria-hidden
        className="absolute top-0 left-0 w-0 h-0 group-hover:w-[2px] group-hover:h-8 transition-all duration-500"
        style={{ background: '#F27D26' }}
      />
    </Link>
  );
}
