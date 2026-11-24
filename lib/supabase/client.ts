'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Client Supabase pour Client Components.
 * Utilisé uniquement pour signIn / signOut et lecture de la session locale.
 * Ne sert jamais à requêter la table prompts (gérée côté serveur uniquement).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
