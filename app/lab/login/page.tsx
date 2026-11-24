import type { Metadata } from 'next';
import { LabHeader, LabFooter } from '@/components/lab/LabChrome';
import { LoginForm } from '@/components/lab/LoginForm';

export const metadata: Metadata = {
  title: 'Se connecter · cinematic.lab',
  description:
    'Connecte-toi pour débloquer ta bibliothèque de prompts cinematic. Pas de mot de passe : on t\'envoie un magic link par email.',
};

export default function LabLoginPage() {
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

      <div className="relative max-w-[640px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <section className="pt-20 md:pt-28 pb-12 md:pb-16 text-center">
          <p className="text-[11px] font-mono tracking-[0.32em] uppercase text-[#F27D26] mb-6">
            Connexion
          </p>
          <h1 className="font-serif italic text-[40px] md:text-[56px] tracking-[-0.025em] leading-[0.95] text-white">
            Content de te revoir.
          </h1>
          <p className="mt-6 text-white/65 text-[15px] md:text-[16px] leading-relaxed max-w-[440px] mx-auto">
            On t&apos;envoie un magic link par email. Pas de mot de passe à retenir.
          </p>
        </section>

        <section className="pb-28 md:pb-36">
          <LoginForm />
        </section>
      </div>

      <LabFooter />
    </main>
  );
}
