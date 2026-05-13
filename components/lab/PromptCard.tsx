'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
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

  const isFree = prompt.tier === 'free';

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
            className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden
          />
        )}
      </div>

      {/* Tier badge — top-right, big and unmistakable */}
      <div className="absolute top-4 right-4 z-20">
        {isFree ? (
          <span className="inline-flex items-center text-[11px] font-bold tracking-[0.18em] uppercase bg-[#F27D26] text-[#0C0C0C] px-3 py-1.5 rounded-full shadow-[0_4px_14px_rgba(242,125,38,0.45)]">
            Gratuit
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] uppercase bg-[#0C0C0C]/85 backdrop-blur-sm text-white border border-white/25 px-3 py-1.5 rounded-full">
            <Lock size={11} strokeWidth={2.2} />
            Premium
          </span>
        )}
      </div>

      {/* Bottom info — always visible name */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent pointer-events-none"
        />
        <div className="relative">
          <p className="font-serif italic text-xl md:text-[22px] tracking-[-0.01em] text-white leading-tight">
            {prompt.name}
          </p>
          <p className="text-[10px] tracking-[0.22em] uppercase font-mono text-white/45 mt-1.5">
            {prompt.category}
          </p>
        </div>
      </div>

      {/* Hover : extended tagline */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/90 to-[#0C0C0C]/30 pointer-events-none"
        />
        <div className="relative">
          <h2 className="font-serif italic text-2xl md:text-[28px] tracking-[-0.02em] leading-[1.05] text-white">
            {prompt.name}
          </h2>
          <p className="text-white/75 text-[13px] leading-relaxed mt-2 max-w-[440px]">
            {prompt.tagline}
          </p>
        </div>
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
