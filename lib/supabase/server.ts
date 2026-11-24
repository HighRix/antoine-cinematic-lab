import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Indique si Supabase est configuré côté serveur.
 * Permet aux Server Components de basculer en mode "visiteur" gracieusement
 * tant que les env vars ne sont pas fournies.
 */
export function isSupabaseConfigured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Client Supabase pour Server Components et Route Handlers.
 * Lit la session via les cookies Next.js.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll appelé depuis un Server Component, ce qui est OK
            // car le middleware gère le refresh des sessions.
          }
        },
      },
    }
  );
}
