'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TanliMark } from './Footer';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 lg:px-16 py-5 flex items-center justify-between">
        {/* Logo : copper hex tile + brandname */}
        <a href="#" className="flex items-center gap-3" aria-label="Tanli Elec — accueil">
          <span
            className="w-9 h-9 rounded-md flex items-center justify-center"
            style={{ background: '#03E840' }}
          >
            <TanliMark className="w-[62%] h-[62%] text-[#0A0A0A]" />
          </span>
          <span className="text-lg sm:text-xl font-semibold tracking-tight" style={{ color: '#F5F5F5' }}>
            Tanli<span style={{ color: '#03E840' }}> </span>Elec
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] uppercase tracking-[0.18em] transition-colors"
              style={{ color: '#999999' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center rounded-lg uppercase text-[11px] tracking-[0.18em] px-6 h-11 transition-all active:scale-[0.97]"
          style={{ background: '#2E2E2E', color: '#F5F5F5' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#3A3A3A')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#2E2E2E')}
        >
          Devis gratuit
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen(true)}
          className="md:hidden w-10 h-10 rounded-md flex items-center justify-center"
          style={{ background: '#2E2E2E', color: '#F5F5F5' }}
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="pn"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[360px] flex flex-col md:hidden"
              style={{ background: '#1A1A1A' }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-xl font-semibold tracking-tight" style={{ color: '#F5F5F5' }}>
                  Tanli Elec
                </span>
                <button onClick={() => setOpen(false)} aria-label="Fermer" style={{ color: '#F5F5F5' }}>
                  <X size={22} />
                </button>
              </div>
              <nav className="flex-1 flex flex-col gap-1 px-6 mt-6">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[16px] font-medium py-3 border-b"
                    style={{ color: '#F5F5F5', borderColor: '#333333' }}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="p-6">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-lg uppercase text-[12px] tracking-[0.18em] py-4"
                  style={{ background: '#03E840', color: '#0A0A0A' }}
                >
                  Devis gratuit
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
