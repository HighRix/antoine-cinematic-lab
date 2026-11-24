'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Lock } from 'lucide-react';
import type { Prompt } from '@/data/prompts';
import { useSession } from '@/lib/supabase/use-session';
import { usePromptCopy } from '@/lib/hooks/use-prompt-copy';

type Props = {
  prompt: Prompt;
  onOpen: () => void;
};

export function PromptCard({ prompt, onOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const { session } = useSession();
  const { copy, copied, loading } = usePromptCopy(prompt.slug);

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
  const isUnlocked = isFree || !!session?.isActive;
  const ariaLabel = `${prompt.name} — ${prompt.tagline}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copy();
  };

  return (
    <div ref={ref} className="flex flex-col bg-[#141414] rounded-2xl overflow-hidden ring-1 ring-white/8 hover:ring-white/15 transition-colors">
      <button
        type="button"
        onClick={onOpen}
        aria-label={ariaLabel}
        className="group relative block w-full overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F27D26] cursor-pointer"
        style={{ aspectRatio: '16 / 10' }}
      >
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
              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
              aria-hidden
            />
          )}
        </div>

        {!isFree && !session?.isActive && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.18em] uppercase bg-[#0C0C0C]/85 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1 rounded-full">
              <Lock size={10} strokeWidth={2.2} />
              Premium
            </span>
          </div>
        )}
      </button>

      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="text-white text-[17px] md:text-[18px] font-semibold tracking-[-0.01em] truncate">
            {prompt.name}
          </p>
          <p className="text-white/45 text-[13px] mt-0.5">
            {prompt.category}
          </p>
        </div>

        {isUnlocked ? (
          <button
            type="button"
            onClick={handleCopy}
            disabled={loading}
            aria-label={`Copier le prompt ${prompt.name}`}
            className="shrink-0 inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white text-[14px] font-medium px-4 py-2.5 rounded-full transition-colors cursor-pointer disabled:opacity-60"
          >
            {copied ? (
              <>
                <Check size={15} strokeWidth={2.4} className="text-[#F27D26]" />
                <span className="text-[#F27D26]">Copié</span>
              </>
            ) : (
              <>
                <Copy size={15} strokeWidth={2} />
                <span>{loading ? '…' : 'Copier'}</span>
              </>
            )}
          </button>
        ) : (
          <a
            href="/lab/pricing"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 inline-flex items-center gap-2 bg-white/8 hover:bg-[#F27D26] hover:text-[#0C0C0C] text-white text-[14px] font-medium px-4 py-2.5 rounded-full transition-colors"
          >
            <Lock size={14} strokeWidth={2} />
            <span>Débloquer</span>
          </a>
        )}
      </div>
    </div>
  );
}
