import type { ReactNode } from 'react';
import { SessionProvider } from '@/lib/supabase/session-context';

/**
 * Layout commun à toutes les pages /lab/*.
 * Le SessionProvider fait UN seul fetch /api/me partagé entre toutes les
 * cartes / boutons (au lieu de N fetches sur la galerie).
 */
export default function LabLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
