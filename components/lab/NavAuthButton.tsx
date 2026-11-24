'use client';

import { User } from 'lucide-react';
import { useSession } from '@/lib/supabase/use-session';

/**
 * Bouton de nav réactif : "Se connecter" si non logué,
 * "Mon compte" si logué.
 */
export function NavAuthButton() {
  const { session, loading } = useSession();

  if (loading) {
    return (
      <span className="hidden md:inline-block w-[100px] h-[18px] rounded-full bg-white/5 animate-pulse" />
    );
  }

  if (!session) {
    return (
      <a
        href="/lab/login"
        className="text-white/65 hover:text-white transition-colors"
      >
        Se connecter
      </a>
    );
  }

  return (
    <a
      href="/lab/account"
      className="inline-flex items-center gap-1.5 text-white/65 hover:text-white transition-colors"
    >
      <User size={13} strokeWidth={2} />
      Mon compte
    </a>
  );
}
