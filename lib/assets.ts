/**
 * Base URL pour servir les assets statiques (vidéos, GIFs, PNG, etc.).
 *
 * Par défaut, vide → résolution relative depuis /public/ via Vercel.
 * Pour migrer plus tard vers R2/CloudFront, set NEXT_PUBLIC_ASSETS_BASE
 * dans Vercel env vars (ex: 'https://assets.cinematic-lab.com'). Le code
 * référence `${ASSETS_BASE}/{slug}/file.mp4`, aucun fichier à modifier.
 */
export const ASSETS_BASE: string = process.env.NEXT_PUBLIC_ASSETS_BASE ?? '';

/**
 * Helper pour construire une URL d'asset.
 * @example asset('stratus/start.mp4') → '/stratus/start.mp4' (local)
 *                                    → 'https://assets.cinematic-lab.com/stratus/start.mp4' (R2)
 */
export function asset(path: string): string {
  const cleaned = path.startsWith('/') ? path : `/${path}`;
  return `${ASSETS_BASE}${cleaned}`;
}
