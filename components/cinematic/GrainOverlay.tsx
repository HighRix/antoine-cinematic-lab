'use client';
import { usePathname } from 'next/navigation';

export function GrainOverlay() {
  const pathname = usePathname();
  if (pathname?.startsWith('/devis')) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.08] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
