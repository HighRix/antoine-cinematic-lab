import { NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase/session';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/me — retourne l'état de session courant (léger, pour useSession).
 * Toujours dynamique : la réponse dépend du cookie session, jamais cachée.
 */
export async function GET() {
  const session = await getSession();
  const payload = session
    ? {
        email: session.email,
        isActive: session.isActive,
        tier: session.subscriber?.tier ?? null,
      }
    : { session: null };

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}
