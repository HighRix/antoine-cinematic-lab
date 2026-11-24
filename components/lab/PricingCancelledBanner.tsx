'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { X } from 'lucide-react';

/**
 * Affiche un toast discret en haut de la pricing si le user revient de Stripe
 * après avoir annulé le checkout. Auto-dismiss après 6s ou clic sur X.
 * Nettoie aussi le query string pour éviter de re-trigger au refresh.
 */
export function PricingCancelledBanner() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (params.get('cancelled') === '1') {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 6000);
      // Cleanup l'URL
      router.replace(pathname, { scroll: false });
      return () => clearTimeout(t);
    }
  }, [params, router, pathname]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-[#141414] border border-white/15 text-white text-[13px] px-5 py-3 rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.4)] animate-[slideDown_0.4s_ease-out_forwards]"
    >
      <span>Paiement annulé. Aucun montant n&apos;a été prélevé.</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Fermer"
        className="text-white/55 hover:text-white transition-colors"
      >
        <X size={14} strokeWidth={2.2} />
      </button>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
