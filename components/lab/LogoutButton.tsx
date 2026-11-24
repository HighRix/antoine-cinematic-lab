'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // 1) Invalidation server-side du JWT Supabase + nettoyage des cookies
      await fetch('/api/logout', { method: 'POST' }).catch(() => {});
      // 2) Cleanup local du browser client (storage + listeners)
      const supabase = createClient();
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      // Quoi qu'il arrive, on redirige
    } finally {
      router.push('/lab');
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="shrink-0 inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 text-white text-[13px] font-medium px-4 py-2.5 rounded-full transition-colors disabled:opacity-50"
    >
      <LogOut size={14} strokeWidth={2} />
      <span>{loading ? 'Déconnexion…' : 'Se déconnecter'}</span>
    </button>
  );
}
