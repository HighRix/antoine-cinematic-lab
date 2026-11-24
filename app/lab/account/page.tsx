import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Check, Lock } from 'lucide-react';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';
import { LogoutButton } from '@/components/lab/LogoutButton';
import { ManageSubscriptionButton } from '@/components/lab/ManageSubscriptionButton';
import { getSession } from '@/lib/supabase/session';

export const metadata: Metadata = {
  title: 'Mon compte · cinematic.lab',
  description: 'Gère ton abonnement cinematic.lab.',
};

const TIER_LABEL: Record<string, string> = {
  monthly: 'Pro · Mensuel',
  lifetime: 'Pro · Lifetime',
  agency: 'Agency',
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function LabAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/lab/login');

  const { email, subscriber, isActive } = session;
  const params = await searchParams;
  const justPurchased = params.success === '1';

  return (
    <main className="relative min-h-screen bg-[#0C0C0C] text-[#F5F5F5] antialiased overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-[5] h-[60vh] opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(242,125,38,0.18) 0%, rgba(242,125,38,0.06) 30%, transparent 70%)',
        }}
      />

      <LabHeader />

      <div className="relative max-w-[800px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <section className="pt-20 md:pt-28 pb-10 md:pb-12 text-center">
          <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[#F27D26] mb-6">
            Mon compte
          </p>
          <h1 className="font-serif italic text-[40px] md:text-[56px] tracking-[-0.025em] leading-[0.95] text-white">
            {justPurchased ? 'Bienvenue à bord.' : 'Bienvenue.'}
          </h1>
          {justPurchased && (
            <p className="mt-5 text-white/65 text-[15px] md:text-[16px] leading-relaxed max-w-[440px] mx-auto">
              Ton paiement est confirmé. Toute la bibliothèque est débloquée.
            </p>
          )}
        </section>

        <section className="pb-28 md:pb-36 flex flex-col gap-5">
          {/* Account info */}
          <div className="rounded-3xl bg-[#141414] ring-1 ring-white/10 p-7 md:p-9">
            <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-white/8">
              <div className="min-w-0">
                <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-2">
                  Email
                </p>
                <p className="font-serif italic text-[24px] md:text-[28px] tracking-[-0.01em] text-white truncate">
                  {email}
                </p>
              </div>
              <LogoutButton />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              <div>
                <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-2">
                  Formule
                </p>
                {isActive && subscriber ? (
                  <p className="text-white text-[16px] font-medium flex items-center gap-2">
                    <Check
                      size={14}
                      strokeWidth={2.6}
                      className="text-[#F27D26]"
                    />
                    {TIER_LABEL[subscriber.tier]}
                  </p>
                ) : (
                  <p className="text-white/55 text-[16px] flex items-center gap-2">
                    <Lock size={13} strokeWidth={2.2} />
                    Aucune
                  </p>
                )}
              </div>

              <div>
                <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-2">
                  Depuis
                </p>
                <p className="text-white text-[16px]">
                  {subscriber ? formatDate(subscriber.purchased_at) : '—'}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-2">
                  Expire
                </p>
                <p className="text-white text-[16px]">
                  {subscriber?.expires_at
                    ? formatDate(subscriber.expires_at)
                    : isActive
                      ? 'À vie'
                      : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {isActive && subscriber?.stripe_customer_id && (
            <ManageSubscriptionButton />
          )}

          {isActive && !subscriber?.stripe_customer_id && (
            <a
              href="/lab"
              className="block rounded-3xl bg-[#141414] ring-1 ring-white/10 p-7 md:p-9 hover:ring-white/20 transition-all duration-300"
            >
              <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-3">
                Tu es prêt
              </p>
              <p className="font-serif italic text-[24px] md:text-[28px] tracking-[-0.02em] leading-tight text-white">
                Toute la bibliothèque est débloquée.
              </p>
              <p className="mt-4 text-white/65 text-[14px] leading-relaxed">
                Retourne sur le lab pour copier tes prompts.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[#F27D26] text-[14px] font-medium">
                Ouvrir le lab <span aria-hidden>→</span>
              </span>
            </a>
          )}

          {/* Refunded ou expired avec customer Stripe : portail accessible pour récup factures */}
          {!isActive && subscriber?.stripe_customer_id && (
            <ManageSubscriptionButton />
          )}

          {!isActive && (
            <a
              href="/lab/pricing"
              className="block rounded-3xl bg-[#141414] ring-2 ring-[#F27D26]/55 shadow-[0_18px_50px_rgba(242,125,38,0.15)] p-7 md:p-9 hover:-translate-y-1 transition-all duration-500"
            >
              <p className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#F27D26] mb-3">
                {subscriber ? 'Reprendre ton abonnement' : 'Pas encore abonné'}
              </p>
              <p className="font-serif italic text-[28px] md:text-[32px] tracking-[-0.02em] leading-tight text-white">
                Débloquer toute la bibliothèque.
              </p>
              <p className="mt-4 text-white/65 text-[14px] leading-relaxed">
                Tous les prompts, tous les futurs ajouts, accès illimité.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[#F27D26] text-[14px] font-medium">
                Voir les tarifs <span aria-hidden>→</span>
              </span>
            </a>
          )}
        </section>
      </div>

      <LabFooter />
    </main>
  );
}
