import type { ReactNode } from 'react';

export function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl p-8 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
}
