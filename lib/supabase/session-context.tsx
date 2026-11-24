'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createClient } from './client';

export type ClientSession = {
  email: string;
  isActive: boolean;
  tier: 'monthly' | 'lifetime' | 'agency' | null;
};

type Ctx = {
  session: ClientSession | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SessionContext = createContext<Ctx>({
  session: null,
  loading: true,
  refresh: async () => {},
});

/**
 * Provider unique en haut de l'arbre /lab.
 * Fait UN seul fetch /api/me au mount, partage l'état avec tous les enfants.
 * Évite l'effet N+1 sur la galerie de cartes (30 fetches sinon).
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ClientSession | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/me', { cache: 'no-store' });
      if (res.ok) {
        const data = (await res.json()) as ClientSession | { session: null };
        setSession('email' in data ? data : null);
      } else {
        setSession(null);
      }
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();

    const supabaseConfigured =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseConfigured) return;

    const supabase = createClient();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      // INITIAL_SESSION trigger juste après mount → on a déjà fetché
      if (event === 'INITIAL_SESSION') return;
      fetchSession();
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ session, loading, refresh: fetchSession }),
    [session, loading]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

/**
 * Hook léger : lit la session depuis le contexte partagé.
 * Aucun fetch supplémentaire — c'est le Provider qui gère tout.
 */
export function useSession() {
  return useContext(SessionContext);
}
