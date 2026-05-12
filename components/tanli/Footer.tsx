'use client';
import { motion } from 'framer-motion';
import type { SVGProps } from 'react';

/* ──────────────────────────────────────────────────────────────
 * Tanli Elec brand mark : T-letterform with integrated lightning
 * bolt as the vertical stem. Single-color, scales as currentColor.
 * ────────────────────────────────────────────────────────────── */
export function TanliMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* T horizontal bar */}
      <rect x="6" y="9" width="52" height="9" rx="1.5" />
      {/* Lightning bolt = T stem */}
      <path d="M 37 18 L 23 39 L 32 39 L 26 58 L 42 34 L 33 34 Z" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <span className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ background: '#03E840' }}>
      <TanliMark className="w-[60%] h-[60%] text-[#0A0A0A]" />
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Inline social icons (lucide v1.11 ne fournit pas Linkedin / Instagram)
 * ────────────────────────────────────────────────────────────── */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.85.27-1.5 1.5-1.5h1.7V4.3c-.3-.04-1.27-.13-2.4-.13-2.38 0-4 1.45-4 4.1V10.5H7.5v3h2.8V21h3.2z" />
    </svg>
  );
}
function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18V10H5.67v8h2.67zm-1.33-9.13a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18v-4.4c0-2.5-1.34-3.66-3.13-3.66a2.7 2.7 0 0 0-2.45 1.34V10H10.1v8h2.67v-4.07c0-1.07.2-2.1 1.53-2.1 1.31 0 1.33 1.23 1.33 2.18V18h2.7z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
 * FooterCard : layered card (gray outer + white inner) with grid
 * ────────────────────────────────────────────────────────────── */
function FooterCard() {
  const SOCIALS = [
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Outer gray body */}
      <div className="bg-[#E9EBEE] rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        {/* Inner white box */}
        <div className="bg-white rounded-[26px] m-1.5 shadow-sm">
          <div className="p-6 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand block */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2.5">
                <LogoIcon />
                <span className="text-[20px] font-bold tracking-tight text-[#0F172A]">
                  Tanli Elec
                </span>
              </div>

              <p className="text-[#64748B] leading-relaxed text-[14px] font-normal max-w-[300px]">
                Électricité, rénovation et domotique haut de gamme. Marignier · Haute-Savoie.
              </p>

              <div className="flex items-center gap-2">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-[36px] h-[36px] flex items-center justify-center rounded-lg border border-slate-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-all active:scale-95 group"
                  >
                    <Icon className="w-4 h-4 text-slate-800" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services column */}
            <div className="space-y-4">
              <h4 className="text-[12px] font-medium text-[#94A3B8] uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                {['Installation neuve', 'Domotique', 'Rénovation', 'Dépannage 7j/7'].map((l) => (
                  <li key={l}>
                    <a href="#services" className="text-[15px] font-medium text-[#1E293B] hover:text-[#03A040] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zone d'intervention */}
            <div className="space-y-6">
              <h4 className="text-[14px] font-medium text-[#94A3B8]">Zone</h4>
              <ul className="space-y-4">
                {['Marignier', 'Cluses', 'Bonneville', 'Sallanches', 'Genève frontière'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[15px] font-medium text-[#1E293B] hover:text-[#03A040] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cabinet column */}
            <div className="space-y-6">
              <h4 className="text-[14px] font-medium text-[#94A3B8]">Cabinet</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Réalisations', href: '#realisations' },
                  { label: 'À propos', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-[15px] font-medium text-[#1E293B] hover:text-[#03A040] transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-3.5 flex flex-col md:flex-row justify-between items-center gap-3 text-[12px]">
          <p className="text-[#64748B] font-medium">© 2026 Tanli Elec. Tous droits réservés.</p>
          <div className="flex gap-6 text-[#64748B] font-medium items-center">
            <a href="#" className="hover:text-[#1E293B] transition-colors">Mentions légales</a>
            <div className="w-[1px] h-3.5 bg-slate-300" />
            <a href="#" className="hover:text-[#1E293B] transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * GlassText : massive "tanli elec" with custom SVG glass filter
 * ────────────────────────────────────────────────────────────── */
function GlassText() {
  return (
    <div className="relative w-full flex items-center justify-center select-none pt-0">
      {/* Hidden SVG filter definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" result="outer-shadow" />
            <feComponentTransfer in="SourceAlpha" result="alpha">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
            <feOffset in="alpha" dx="0" dy="4" result="offset-white" />
            <feGaussianBlur in="offset-white" stdDeviation="4" result="blur-white" />
            <feComposite in="alpha" in2="blur-white" operator="out" result="inner-white-mask" />
            <feFlood floodColor="#ffffff" floodOpacity="0.25" result="white-fill" />
            <feComposite in="white-fill" in2="inner-white-mask" operator="in" result="inner-white-final" />
            <feGaussianBlur in="alpha" stdDeviation="6" result="blur-black" />
            <feComposite in="alpha" in2="blur-black" operator="out" result="inner-black-mask" />
            <feFlood floodColor="#000000" floodOpacity="0.25" result="black-fill" />
            <feComposite in="black-fill" in2="inner-black-mask" operator="in" result="inner-black-final" />
            <feMerge>
              <feMergeNode in="outer-shadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="inner-white-final" />
              <feMergeNode in="inner-black-final" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <h1
          className="text-[min(14vw,200px)] font-bold tracking-tight leading-none select-none text-white px-4 whitespace-nowrap"
          style={{ filter: 'url(#glass-effect)' }}
        >
          tanli elec
        </h1>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Default export : the assembled footer wrapped in a light bg zone
 * ────────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer
      id="contact"
      className="w-full flex flex-col items-center gap-0 py-8 md:py-12 px-4"
      style={{ background: '#F0F1F3' }}
    >
      <FooterCard />
      <GlassText />
    </footer>
  );
}
