import { NextResponse, type NextRequest } from 'next/server';
import { getPromptBySlug } from '@/data/prompts';
import { getSession } from '@/lib/supabase/session';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/prompts/[slug] — retourne le texte du prompt.
 *
 * Gating :
 *  - tier='free'    → texte servi à tout le monde
 *  - tier='premium' → texte servi UNIQUEMENT si l'utilisateur est connecté
 *                     ET a un abonnement actif (status='active' + non expiré)
 *
 * Le client ne peut JAMAIS récupérer un texte premium sans abonnement actif.
 * Cache-Control: no-store empêche tout proxy intermédiaire de cacher la réponse.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) {
    return NextResponse.json({ error: 'Prompt inconnu.' }, { status: 404 });
  }

  if (prompt.tier === 'premium') {
    const session = await getSession();
    if (!session?.isActive) {
      return NextResponse.json(
        { error: 'Abonnement requis.', code: 'subscription_required' },
        {
          status: 403,
          headers: { 'Cache-Control': 'no-store' },
        }
      );
    }
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('prompts')
    .select('text')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error(`[prompts/${slug}] DB error : ${error.message}`);
    return NextResponse.json(
      { error: 'Erreur lecture prompt.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (!data) {
    return NextResponse.json(
      { slug, text: null, placeholder: true },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  return NextResponse.json(
    { slug, text: data.text, placeholder: false },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
