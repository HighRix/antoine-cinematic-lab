import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const DEFAULT_REDIRECT = '/lab/account';

/**
 * Valide le paramètre `next` pour empêcher les open redirects.
 * Accepte uniquement les paths relatifs qui commencent par `/` mais pas `//`
 * (qui serait interprété comme un protocol-relative URL vers un autre domaine).
 */
function safeNext(raw: string | null): string {
  if (!raw) return DEFAULT_REDIRECT;
  if (!raw.startsWith('/')) return DEFAULT_REDIRECT;
  if (raw.startsWith('//') || raw.startsWith('/\\')) return DEFAULT_REDIRECT;
  if (raw.includes('\\') || raw.includes('://')) return DEFAULT_REDIRECT;
  // Liste blanche stricte de caractères autorisés
  if (!/^\/[a-zA-Z0-9\-_/?&=.%]*$/.test(raw)) return DEFAULT_REDIRECT;
  return raw;
}

/**
 * Callback Supabase Auth après clic sur magic link.
 * Échange le code OTP pour une session, puis redirige vers un path sûr.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeNext(searchParams.get('next'));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  return NextResponse.redirect(
    new URL('/lab/login?error=callback_failed', origin)
  );
}
