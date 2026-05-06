'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: ReactNode;
  /** Optional Tailwind class overrides for the outer wrapper */
  className?: string;
  /** Background page color (used for the bottom shadow blend). Default #F8F8F8 (Zenith). */
  pageBg?: string;
  /** Foreground text/border color. Default #141414 (Zenith). */
  fg?: string;
  /** Muted text color. Default #A5A5A5 (Zenith). */
  muted?: string;
}

export const ModemAnimatedFooter = ({
  brandName = 'YourBrand',
  brandDescription = 'Your description here',
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className = '',
  pageBg = '#F8F8F8',
  fg = '#141414',
  muted = '#A5A5A5',
}: FooterProps) => {
  return (
    <section
      id="contact"
      className={`relative w-full mt-0 overflow-hidden ${className}`}
      style={{ background: pageBg }}
    >
      <footer
        className="border-t mt-12 relative"
        style={{ borderColor: `${fg}1A`, background: pageBg }}
      >
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[18rem] sm:min-h-[22rem] md:min-h-[26rem] relative p-4 py-6">
          {/* Top content */}
          <div className="flex flex-col mb-8 sm:mb-12 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold" style={{ color: fg }}>
                    {brandName}
                  </span>
                </div>
                <p
                  className="font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 text-[14px]"
                  style={{ color: muted }}
                >
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="transition-colors"
                      style={{ color: muted }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="duration-300 hover:font-semibold transition-all"
                      href={link.href}
                      style={{ color: muted }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom row: copyright + creator */}
          <div className="mt-12 md:mt-14 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-sm text-center md:text-left" style={{ color: muted }}>
              ©{new Date().getFullYear()} {brandName}. Tous droits réservés.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-sm transition-colors duration-300 hover:font-medium"
                  style={{ color: muted }}
                >
                  Conçu par {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* GIANT semi-visible brand text: the focal effect */}
        <div
          className="leading-none absolute left-1/2 -translate-x-1/2 bottom-28 md:bottom-24 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4 bg-clip-text text-transparent uppercase"
          style={{
            fontSize: 'clamp(2.25rem, 10vw, 7rem)',
            maxWidth: '95vw',
            backgroundImage: `linear-gradient(to bottom, ${fg}33 0%, ${fg}1A 50%, transparent 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom brand badge — minimal: just the logo with a soft halo, no nested frames */}
        <div
          className="absolute bottom-16 md:bottom-14 left-1/2 -translate-x-1/2 z-10 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 flex items-center justify-center"
          style={{
            filter: `drop-shadow(0 6px 20px ${fg}1F) drop-shadow(0 2px 6px ${fg}14)`,
          }}
        >
          {brandIcon || (
            <span
              className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter"
              style={{ color: fg }}
            >
              FT
            </span>
          )}
        </div>

        {/* Hairline divider behind the badge */}
        <div
          className="absolute bottom-22 sm:bottom-24 backdrop-blur-sm h-1 w-full left-1/2 -translate-x-1/2"
          style={{
            background: `linear-gradient(to right, transparent, ${fg}1F, transparent)`,
          }}
        />

        {/* Bottom shadow blending into page bg */}
        <div
          className="absolute bottom-20 w-full h-16 blur-[0.8em]"
          style={{
            background: `linear-gradient(to top, ${pageBg} 0%, ${pageBg}CC 60%, ${pageBg}66 100%)`,
          }}
        />
      </footer>
    </section>
  );
};
