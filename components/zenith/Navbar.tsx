'use client';
import { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Process', href: '#process' },
  { label: 'Cabinet', href: '#cabinet' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 py-5 md:py-6 flex items-center justify-between gap-6">
          {/* Logo : image directe, sans pill liquid glass */}
          <a
            href="#"
            aria-label="FT Design — accueil"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ft/logo.png"
              alt="FT Design"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </a>

          {/* Desktop nav : zenith-glass pill */}
          <nav className="hidden md:flex zenith-glass rounded-full px-6 py-3 items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="flex items-center gap-1 text-[13px] font-medium tracking-tight text-[#141414] hover:opacity-60 transition-opacity"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Action button : zenith-glass */}
          <a
            href="#contact"
            className="hidden md:inline-flex zenith-glass items-center gap-2 px-6 py-3 rounded-full text-[13px] font-medium text-[#141414] hover:bg-white/30 transition-colors"
          >
            <Home size={14} strokeWidth={2} />
            Prendre RDV
          </a>

          {/* Mobile burger : zenith-glass square */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden zenith-glass w-11 h-11 rounded-xl flex items-center justify-center text-[#141414]"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[360px] bg-[#F8F8F8] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ft/logo.png"
                  alt="FT Design"
                  className="w-12 h-12 object-contain"
                  draggable={false}
                />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="text-[#141414]"
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>
              <nav className="flex-1 flex flex-col gap-1 px-6 mt-6">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-[18px] font-medium text-[#141414] py-3 border-b border-black/10"
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
                  className="flex items-center justify-center gap-2 bg-[#141414] text-white px-6 py-4 text-[13px] font-medium uppercase tracking-wider"
                >
                  <Home size={14} strokeWidth={2} />
                  Prendre RDV
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
