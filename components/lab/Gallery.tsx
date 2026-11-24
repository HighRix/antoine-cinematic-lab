'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Copy, Lock, X } from 'lucide-react';
import { PromptCard } from '@/components/lab/PromptCard';
import type { Prompt, PromptType } from '@/data/prompts';
import { useSession } from '@/lib/supabase/use-session';
import { usePromptCopy } from '@/lib/hooks/use-prompt-copy';

const TYPES: ('Tous' | PromptType)[] = [
  'Tous',
  'Hero section',
  'Landing page',
  'Footer',
  'CTA section',
  'Pricing section',
  'Composant',
];

type PriceFilter = 'Tous' | 'Gratuit' | 'Premium';
const PRICES: PriceFilter[] = ['Tous', 'Gratuit', 'Premium'];

type DropdownOption = string;

function FilterDropdown<T extends DropdownOption>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-[13px] text-white hover:bg-white/10 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-white/55 mr-1">{label}</span>
        <span className="font-medium">{value}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#141414] border border-white/15 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.6)] overflow-hidden z-30"
        >
          {options.map((opt) => {
            const isActive = opt === value;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                  isActive
                    ? 'bg-[#F27D26]/15 text-[#F27D26]'
                    : 'text-white/75 hover:bg-white/5 hover:text-white'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Gallery({ prompts }: { prompts: Prompt[] }) {
  const [type, setType] = useState<(typeof TYPES)[number]>('Tous');
  const [price, setPrice] = useState<PriceFilter>('Tous');
  const [modalPrompt, setModalPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    if (!modalPrompt) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalPrompt(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalPrompt]);

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      if (type !== 'Tous' && p.type !== type) return false;
      if (price === 'Gratuit' && p.tier !== 'free') return false;
      if (price === 'Premium' && p.tier !== 'premium') return false;
      return true;
    });
  }, [type, price, prompts]);

  const availableTypes = useMemo(() => {
    const set = new Set(prompts.map((p) => p.type));
    return TYPES.filter((t) => t === 'Tous' || set.has(t as PromptType));
  }, [prompts]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10">
        <FilterDropdown
          label="Type"
          value={type}
          options={availableTypes}
          onChange={(v) => setType(v as (typeof TYPES)[number])}
        />
        <FilterDropdown
          label="Prix"
          value={price}
          options={PRICES}
          onChange={(v) => setPrice(v as PriceFilter)}
        />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filtered.map((p) => (
          <PromptCard
            key={p.slug}
            prompt={p}
            onOpen={() => setModalPrompt(p)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/55 text-sm py-16">
          Pas encore de prompt dans cette catégorie. Reviens dans quelques semaines.
        </p>
      )}

      {modalPrompt && (
        <PromptModal
          prompt={modalPrompt}
          onClose={() => setModalPrompt(null)}
        />
      )}
    </>
  );
}

function PromptModal({ prompt, onClose }: { prompt: Prompt; onClose: () => void }) {
  const { session } = useSession();
  const { copy: handleCopy, copied, loading } = usePromptCopy(prompt.slug);
  const isFree = prompt.tier === 'free';
  const isUnlocked = isFree || !!session?.isActive;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Aperçu ${prompt.name}`}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[#0C0C0C]/85 backdrop-blur-md animate-[fadeIn_0.25s_ease-out_forwards]"
      />

      <div
        className="relative w-full max-w-[640px] flex flex-col bg-[#141414] border border-white/10 rounded-3xl overflow-hidden animate-[zoomIn_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#0C0C0C]/70 backdrop-blur-sm border border-white/15 text-white grid place-items-center hover:bg-[#0C0C0C] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Preview — natural aspect (16:10 like the webm source) */}
        <div
          className="relative block bg-[#0a0a0a] shrink-0 w-full"
          style={{ aspectRatio: '16 / 10' }}
        >
          <video
            src={prompt.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden
          />
        </div>

        {/* Info + single action */}
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div className="min-w-0">
            <h2 className="text-white text-xl md:text-2xl font-semibold tracking-[-0.01em] truncate">
              {prompt.name}
            </h2>
            <p className="text-white/50 text-[14px] mt-1">
              {prompt.category}
            </p>
          </div>

          {isUnlocked ? (
            <button
              type="button"
              onClick={handleCopy}
              disabled={loading}
              aria-label="Copier le prompt"
              className="shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[15px] font-medium px-5 py-3 rounded-full transition-colors cursor-pointer disabled:opacity-60"
            >
              {copied ? (
                <>
                  <Check size={16} strokeWidth={2.4} className="text-[#F27D26]" />
                  <span className="text-[#F27D26]">Copié</span>
                </>
              ) : (
                <>
                  <Copy size={16} strokeWidth={2} />
                  <span>{loading ? '…' : 'Copier'}</span>
                </>
              )}
            </button>
          ) : (
            <a
              href="/lab/pricing"
              className="shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-[#F27D26] hover:text-[#0C0C0C] text-white text-[15px] font-medium px-5 py-3 rounded-full transition-colors"
            >
              <Lock size={15} strokeWidth={2} />
              <span>Débloquer</span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
