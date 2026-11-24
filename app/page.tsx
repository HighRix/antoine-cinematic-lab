import { redirect } from 'next/navigation';

/**
 * Racine cinematic-lab.com → redirige vers /lab (produit principal).
 * Le portfolio freelance reste accessible via /portfolio, lien dans la nav.
 */
export default function Root() {
  redirect('/lab');
}
