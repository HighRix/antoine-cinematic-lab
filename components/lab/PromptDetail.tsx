'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import type { Prompt } from '@/data/prompts';

type LifetimeTier = {
  name: string;
  price: number;
  anchorPrice?: number;
  description: string;
  features: readonly string[];
  cta: string;
  stanUrl: string;
};

const PLACEHOLDER_PROMPT =
  '(prompt à renseigner — me ping si tu en as besoin maintenant, sinon je le reconstruis depuis le code en 30 min)';

export function PromptDetail({
  prompt,
  lifetime,
}: {
  prompt: Prompt;
  lifetime: LifetimeTier;
}) {
  const [copied, setCopied] = useState(false);

  const fullPromptAvailable = prompt.promptText !== null && prompt.tier === 'free';
  const text = prompt.promptText ?? PLACEHOLDER_PROMPT;
  const teaser = text.split('\n').slice(0, 4).join('\n');

  const handleCopy = async () => {
    if (!fullPromptAvailable) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
      {/* Left : preview */}
      <div className="lg:col-span-7">
        <div
          className="relative overflow-hidden rounded-2xl bg-[#141414] ring-1 ring-white/8"
          style={{ aspectRatio: '16 / 10' }}
        >
          <video
            src={prompt.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          />
        </div>

        <a
          href={prompt.livePreviewUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white border-b border-[#F27D26]/60 pb-1 hover:border-[#F27D26] transition-colors"
        >
          Ouvrir le rendu live
          <span aria-hidden className="text-[#F27D26]">↗</span>
        </a>
      </div>

      {/* Right : info + prompt */}
      <div className="lg:col-span-5 flex flex-col gap-7">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-white/60">
              {prompt.number}
            </span>
            <span className="text-white/20">·</span>
            {prompt.tier === 'free' ? (
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase bg-[#F27D26] text-[#0C0C0C] px-2.5 py-1 rounded-full">
                Gratuit
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.18em] uppercase text-white border border-white/25 px-2.5 py-1 rounded-full">
                <Lock size={10} strokeWidth={2.2} />
                Premium
              </span>
            )}
            <span className="text-white/20">·</span>
            <span className="text-[10px] tracking-[0.18em] uppercase font-mono text-white/45">
              {prompt.category}
            </span>
          </div>
          <h1 className="font-serif italic text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-white">
            {prompt.name}
          </h1>
          <p className="mt-3 text-white/70 text-[15px] leading-relaxed">
            {prompt.tagline}
          </p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40 mb-2">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {prompt.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] tracking-[0.05em] uppercase text-white/65 border border-white/15 px-2.5 py-1 font-mono"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40">
              {prompt.tier === 'free' ? 'Prompt complet' : 'Aperçu du prompt'}
            </p>
            {fullPromptAvailable && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] tracking-[0.18em] uppercase font-mono text-[#F27D26] hover:text-white transition-colors"
              >
                {copied ? 'Copié ✓' : 'Copier'}
              </button>
            )}
          </div>

          <div className="relative">
            <pre className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 text-[13px] leading-[1.6] text-white/80 font-mono whitespace-pre-wrap overflow-x-auto">
              {prompt.tier === 'free' ? text : teaser}
            </pre>

            {prompt.tier === 'premium' && (
              <>
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/85 to-transparent rounded-b-xl pointer-events-none"
                />
                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3">
                  <p className="text-white/70 text-sm">
                    Toute la bibliothèque pour{' '}
                    <span className="text-white font-medium">€{lifetime.price}</span>
                    {lifetime.anchorPrice && (
                      <span className="text-white/35 line-through ml-2">€{lifetime.anchorPrice}</span>
                    )}
                  </p>
                  <a
                    href="/lab/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-[#F27D26] hover:bg-[#FF8A2E] text-[#0C0C0C] font-medium text-sm px-5 py-3 rounded-full shadow-[0_8px_24px_rgba(242,125,38,0.35)] transition-all hover:scale-[1.02] w-fit"
                  >
                    Tout débloquer
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
