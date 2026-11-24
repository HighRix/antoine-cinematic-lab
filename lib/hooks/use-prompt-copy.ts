'use client';

import { useState } from 'react';

const PLACEHOLDER_PROMPT =
  '(Prompt en cours de préparation. Le code complet sera disponible sous peu.)';

/**
 * Hook partagé entre PromptCard et PromptModal pour la logique de copie.
 * Va chercher le texte via /api/prompts/{slug} (qui gère le gating tier).
 */
export function usePromptCopy(slug: string) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/prompts/${slug}`, { cache: 'no-store' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ?? 'Accès refusé.'
        );
      }
      const data = (await res.json()) as { text: string | null };
      await navigator.clipboard.writeText(data.text ?? PLACEHOLDER_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur copie.');
    } finally {
      setLoading(false);
    }
  };

  return { copy, copied, loading, error };
}
