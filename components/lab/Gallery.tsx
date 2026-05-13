'use client';

import { useMemo, useState } from 'react';
import { PromptCard } from '@/components/lab/PromptCard';
import type { Prompt, PromptCategory } from '@/data/prompts';

const CATEGORIES: ('Tous' | PromptCategory)[] = [
  'Tous',
  'Hero',
  'SaaS',
  'Agency',
  'Portfolio',
  'E-commerce',
  'Local Business',
];

export function Gallery({ prompts }: { prompts: Prompt[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('Tous');

  const filtered = useMemo(() => {
    if (active === 'Tous') return prompts;
    return prompts.filter((p) => p.category === active);
  }, [active, prompts]);

  // Hide categories that don't have any prompt yet
  const available = useMemo(() => {
    const set = new Set(prompts.map((p) => p.category));
    return CATEGORIES.filter((c) => c === 'Tous' || set.has(c as PromptCategory));
  }, [prompts]);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-10">
        {available.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`text-[12px] font-medium tracking-[0.04em] px-4 py-2 rounded-full transition-colors ${
                isActive
                  ? 'bg-[#F27D26] text-[#0C0C0C]'
                  : 'bg-white/5 text-white/65 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8">
        {filtered.map((p) => (
          <PromptCard key={p.slug} prompt={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/55 text-sm py-16">
          Pas encore de prompt dans cette catégorie.
        </p>
      )}
    </>
  );
}
