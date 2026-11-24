import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Client Supabase ADMIN — bypass RLS via la service_role key.
 * À utiliser EXCLUSIVEMENT côté serveur (API routes, webhook handler).
 * Ne JAMAIS importer ce fichier dans un Client Component.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Supabase admin client : NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant.'
    );
  }

  return createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
