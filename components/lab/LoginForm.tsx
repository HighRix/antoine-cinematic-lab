'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setErrorMsg(null);

    // Normalise l'email pour éviter les mismatches Alice@X.COM vs alice@x.com
    // entre auth.users (Supabase) et subscribers (webhook stocke en lowercase)
    const normalized = email.trim().toLowerCase();

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/lab/account`,
      },
    });

    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
      return;
    }

    setStatus('sent');
  };

  if (status === 'sent') {
    return (
      <div className="rounded-3xl bg-[#141414] ring-1 ring-[#F27D26]/40 p-8 md:p-10 text-center">
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F27D26]/15 text-[#F27D26] mb-5"
        >
          <Check size={24} strokeWidth={2.4} />
        </span>
        <h2 className="font-serif italic text-[28px] md:text-[32px] tracking-[-0.02em] text-white leading-tight">
          Lien envoyé.
        </h2>
        <p className="mt-4 text-white/65 text-[15px] leading-relaxed max-w-[400px] mx-auto">
          Va voir ta boîte mail{' '}
          <span className="text-white font-medium">{email}</span>. Clique sur le
          lien dans le mail pour te connecter. Si tu ne le vois pas, vérifie tes
          spams.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-[#141414] ring-1 ring-white/10 p-7 md:p-10"
    >
      <label
        htmlFor="email"
        className="block text-[11px] font-mono tracking-[0.24em] uppercase text-white/50 mb-3"
      >
        Email
      </label>

      <div className="relative">
        <span
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
        >
          <Mail size={16} strokeWidth={2} />
        </span>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="toi@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="w-full bg-[#0C0C0C] border border-white/12 rounded-2xl pl-12 pr-4 py-4 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[#F27D26]/60 transition-colors disabled:opacity-50"
        />
      </div>

      {errorMsg && (
        <p className="mt-4 text-[13px] text-red-400/85 leading-relaxed">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#F27D26] hover:bg-[#FF8A2E] disabled:opacity-50 disabled:cursor-not-allowed text-[#0C0C0C] font-semibold text-[15px] px-5 py-4 rounded-full shadow-[0_10px_30px_rgba(242,125,38,0.35)] transition-all hover:scale-[1.01]"
      >
        {status === 'loading' ? (
          <span>Envoi en cours…</span>
        ) : (
          <>
            <span>Recevoir mon magic link</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </>
        )}
      </button>

      <p className="mt-5 text-center text-[12px] text-white/40 leading-relaxed">
        Pas encore abonné ?{' '}
        <a
          href="/lab/pricing"
          className="text-white/70 underline decoration-[#F27D26]/50 underline-offset-4 hover:text-white hover:decoration-[#F27D26] transition-colors"
        >
          Voir les tarifs
        </a>
      </p>
    </form>
  );
}
