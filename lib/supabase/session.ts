import { cache } from 'react';
import { createClient, isSupabaseConfigured } from './server';
import { createAdminClient } from './admin';

export type Session = {
  email: string;
  subscriber: SubscriberRow | null;
  isActive: boolean;
};

export type SubscriberRow = {
  id: string;
  email: string;
  tier: 'monthly' | 'lifetime' | 'agency';
  status: 'active' | 'expired' | 'refunded';
  purchased_at: string;
  expires_at: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

/**
 * Récupère la session courante côté serveur + le statut d'abonnement.
 *
 * Wrappé dans React `cache()` pour dédupliquer les appels DB pendant le
 * rendu d'une même requête (évite N+1 quand plusieurs Server Components
 * appellent getSession() dans la même page).
 *
 * L'email est comparé en lowercase pour matcher la convention de stockage
 * du webhook (cf. fix #4 RLS et #16 normalisation).
 */
export const getSession = cache(async (): Promise<Session | null> => {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  const normalizedEmail = user.email.trim().toLowerCase();

  const admin = createAdminClient();
  const { data: subscriber } = await admin
    .from('subscribers')
    .select('*')
    .eq('email', normalizedEmail)
    .maybeSingle();

  const isActive =
    !!subscriber &&
    subscriber.status === 'active' &&
    (subscriber.expires_at === null ||
      new Date(subscriber.expires_at) > new Date());

  return {
    email: user.email,
    subscriber: (subscriber as SubscriberRow) ?? null,
    isActive,
  };
});
