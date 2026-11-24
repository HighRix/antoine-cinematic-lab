'use client';

import { useState } from 'react';

type Props = {
  tier: 'monthly' | 'lifetime' | 'agency';
  label: string;
  featured?: boolean;
};

export function CheckoutButton({ tier, label, featured = false }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Erreur de paiement.');
      }
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
      setLoading(false);
    }
  };

  return (
    <div className="mt-9 flex flex-col gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold transition-all hover:scale-[1.015] disabled:opacity-60 disabled:cursor-not-allowed',
          featured
            ? 'bg-[#F27D26] hover:bg-[#FF8A2E] text-[#0C0C0C] shadow-[0_10px_30px_rgba(242,125,38,0.35)]'
            : 'bg-white text-[#0C0C0C] hover:bg-white/90',
        ].join(' ')}
      >
        <span>{loading ? 'Redirection vers Stripe…' : label}</span>
        {!loading && <span aria-hidden>→</span>}
      </button>
      {error && (
        <p className="text-[12px] text-red-400/85 text-center">{error}</p>
      )}
    </div>
  );
}
