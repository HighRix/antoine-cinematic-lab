'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/portal', { method: 'POST' });
      if (!res.ok) throw new Error('Impossible d\'ouvrir le portail.');
      const { url } = await res.json();
      window.location.href = url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-[#141414] ring-1 ring-white/10 p-7 md:p-9">
      <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-3">
        Gestion de l&apos;abonnement
      </p>
      <p className="font-serif italic text-[24px] md:text-[28px] tracking-[-0.02em] leading-tight text-white">
        Factures, carte, annulation.
      </p>
      <p className="mt-4 text-white/65 text-[14px] leading-relaxed">
        Tu es redirigé sur le portail sécurisé Stripe.
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white text-[14px] font-medium px-5 py-3 rounded-full transition-colors disabled:opacity-50"
      >
        <span>{loading ? 'Ouverture…' : 'Gérer mon abonnement'}</span>
        <ExternalLink size={14} strokeWidth={2} />
      </button>
      {error && (
        <p className="mt-4 text-[13px] text-red-400/85">{error}</p>
      )}
    </div>
  );
}
