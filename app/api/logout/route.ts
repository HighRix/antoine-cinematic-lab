import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Logout côté serveur — invalide la session Supabase et nettoie le cookie.
 * Plus sécurisé qu'un signOut() client-only qui ne révoque pas le JWT.
 */
export async function POST(request: NextRequest) {
  // CSRF guard
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== request.nextUrl.host) {
    return NextResponse.json({ error: 'Origine refusée.' }, { status: 403 });
  }

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown';
    console.error(`[logout] ${msg}`);
  }

  return NextResponse.json({ ok: true });
}
