'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/grenier-bio/Logo';

const NAV_LINKS = [
  { href: '#histoire', label: 'Notre histoire' },
  { href: '#ferme', label: 'La ferme' },
  { href: '#produits', label: 'Nos produits' },
  { href: '#ou-trouver', label: 'Où nous trouver' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF7F0]/85 backdrop-blur-md border-b border-[#2D2D2F]/8'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-5 md:py-6 flex items-center justify-between">
          {/* Logo + wordmark — wordmark hidden on very small screens to avoid crowding */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Accueil">
            <Logo
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 transition-transform duration-700 group-hover:rotate-[8deg]"
            />
            <div className="hidden xs:flex sm:flex flex-col leading-none">
              <span className="font-recoleta text-base md:text-lg text-[#2D2D2F] tracking-tight">
                Le Grenier Bio
              </span>
              <span className="text-[10px] md:text-[11px] text-[#2D2D2F]/55 tracking-[0.18em] uppercase font-medium">
                d&rsquo;Emberbail
              </span>
            </div>
          </a>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#2D2D2F] hover:text-[#0E7824] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right CTA */}
          <a
            href="#ou-trouver"
            className="hidden lg:inline-flex rounded-full bg-[#2D2D2F] text-white text-sm font-medium px-7 py-3.5 shadow-sm hover:bg-[#0E7824] transition-colors"
          >
            Où nous trouver
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 -mr-2 text-[#2D2D2F] hover:text-[#0E7824] transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu strokeWidth={1.5} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#FAF7F0] flex flex-col p-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span className="font-recoleta text-lg text-[#2D2D2F]">Le Grenier Bio</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2 text-[#2D2D2F]"
              aria-label="Fermer le menu"
            >
              <X strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 -mt-12">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-recoleta text-[#2D2D2F] hover:text-[#0E7824] transition-colors"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#ou-trouver"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full bg-[#2D2D2F] text-white text-base font-medium px-8 py-4 text-center shadow-md"
          >
            Où nous trouver
          </a>
        </div>
      )}
    </>
  );
}
