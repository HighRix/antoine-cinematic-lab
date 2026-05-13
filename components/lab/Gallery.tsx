'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Lock, X } from 'lucide-react';
import { PromptCard } from '@/components/lab/PromptCard';
import type { Prompt, PromptType } from '@/data/prompts';

const TYPES: ('Tous' | PromptType)[] = [
  'Tous',
  'Hero section',
  'Landing page',
  'Footer',
  'CTA section',
  'Pricing section',
  'Composant',
];

export function Gallery({ prompts }: { prompts: Prompt[] }) {
  const [type, setType] = useState<(typeof TYPES)[number]>('Tous');
  const [open, setOpen] = useState(false);
  const [modalPrompt, setModalPrompt] = useState<Prompt | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside closes dropdown
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Esc closes modal
  useEffect(() => {
    if (!modalPrompt) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalPrompt(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalPrompt]);

  const filtered = useMemo(() => {
    if (type === 'Tous') return prompts;
    return prompts.filter((p) => p.type === type);
  }, [type, prompts]);

  // Hide type options that don't have prompts yet (except 'Tous')
  const available = useMemo(() => {
    const set = new Set(prompts.map((p) => p.type));
    return TYPES.filter((t) => t === 'Tous' || set.has(t as PromptType));
  }, [prompts]);

  return (
    <>
      {/* Filter dropdown */}
      <div className="flex items-center justify-between gap-4 mb-8 md:mb-10">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-[13px] text-white hover:bg-white/10 transition-colors"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="text-white/55 mr-1">Type</span>
            <span className="font-medium">{type}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <div
              role="listbox"
              className="absolute top-full left-0 mt-2 min-w-[220px] bg-[#141414] border border-white/15 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.6)] overflow-hidden z-30"
            >
              {available.map((opt) => {
                const isActive = opt === type;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setType(opt);
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

        <span className="text-[11px] tracking-[0.22em] uppercase font-mono text-white/40">
          {filtered.length} {filtered.length > 1 ? 'prompts' : 'prompt'}
        </span>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
        {filtered.map((p) => (
          <PromptCard
            key={p.slug}
            prompt={p}
            onPremiumClick={() => setModalPrompt(p)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/55 text-sm py-16">
          Pas encore de prompt dans cette catégorie. Reviens dans quelques semaines.
        </p>
      )}

      {/* Premium modal */}
      {modalPrompt && (
        <PremiumModal
          prompt={modalPrompt}
          onClose={() => setModalPrompt(null)}
        />
      )}
    </>
  );
}

function PremiumModal({ prompt, onClose }: { prompt: Prompt; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Aperçu ${prompt.name}`}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#0C0C0C]/85 backdrop-blur-md animate-[fadeIn_0.25s_ease-out_forwards]"
      />

      {/* Content (clicking the card body redirects to pricing) */}
      <div
        className="relative w-full max-w-[1200px] max-h-[88vh] flex flex-col animate-[zoomIn_0.35s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 left-3 z-30 w-9 h-9 rounded-full bg-[#0C0C0C]/70 backdrop-blur-sm border border-white/15 text-white grid place-items-center hover:bg-[#0C0C0C] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Lock badge → redirects to pricing */}
        <a
          href="/lab/pricing"
          className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 bg-[#0C0C0C]/85 backdrop-blur-sm text-white border border-white/25 px-3.5 py-2 rounded-full hover:bg-[#F27D26] hover:text-[#0C0C0C] hover:border-[#F27D26] transition-all"
          aria-label="Débloquer ce prompt"
        >
          <Lock size={13} strokeWidth={2.2} />
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase">Premium</span>
        </a>

        {/* Enlarged video */}
        <a
          href="/lab/pricing"
          className="relative block rounded-2xl overflow-hidden bg-[#141414] ring-1 ring-white/10 cursor-pointer"
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

          {/* Bottom gradient + info */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent pointer-events-none"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif italic text-3xl md:text-5xl tracking-[-0.02em] leading-[1] text-white">
                {prompt.name}
              </h2>
              <p className="text-white/75 text-sm md:text-base mt-2 max-w-[480px] leading-relaxed">
                {prompt.tagline}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#F27D26] text-[#0C0C0C] font-medium text-sm px-5 py-3 rounded-full shadow-[0_8px_24px_rgba(242,125,38,0.35)]">
              Tout débloquer
              <span aria-hidden>→</span>
            </span>
          </div>
        </a>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
