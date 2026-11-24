'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowRightCircle,
  Zap,
  LockKeyhole,
  Fingerprint,
  Menu,
  X,
} from 'lucide-react';

const NAV_LINKS = ['Vault', 'Plans', 'Install', 'News', 'Help'] as const;

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE_OUT_EXPO },
  }),
};

function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      overflow="visible"
      viewBox="0 0 256 256"
      aria-label="VaultShield"
    >
      <path
        d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z"
        fill="#192837"
      />
    </svg>
  );
}

function PrimaryButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`vs-btn-primary ${className}`}
      style={{
        background: '#7342E2',
        color: '#fff',
        borderRadius: 9999,
        padding: '10px 20px',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.2,
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s',
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`vs-btn-secondary ${className}`}
      style={{
        background: '#F2F2EE',
        color: '#192837',
        borderRadius: 9999,
        padding: '10px 20px',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.2,
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s',
      }}
    >
      {children}
    </button>
  );
}

export function VaultShieldHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      className="vaultshield-hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
        overflow: 'hidden',
      }}
    >
      {/* Full-screen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/hero-vaultshield.mp4" type="video/mp4" />
      </video>

      {/* Navbar */}
      <nav
        className="relative"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <div
          className="px-5 sm:px-8 py-4 sm:py-5"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="#" aria-label="VaultShield home" style={{ display: 'inline-flex' }}>
            <Logo />
          </a>

          {/* Center links — desktop only */}
          <ul
            className="vs-desktop-only"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              gap: 32,
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="vs-nav-link"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#192837',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTAs — desktop only */}
          <div className="vs-desktop-only" style={{ gap: 10, alignItems: 'center' }}>
            <PrimaryButton>Start For Free</PrimaryButton>
            <SecondaryButton>Sign In</SecondaryButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="vs-mobile-only"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 6,
              color: '#192837',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Hero content */}
      <div
        className="relative"
        style={{
          position: 'relative',
          zIndex: 5,
          maxWidth: 1280,
          margin: '0 auto',
          paddingTop: 'clamp(40px, 8vw, 72px)',
          paddingLeft: 'clamp(20px, 4vw, 32px)',
          paddingRight: 'clamp(20px, 4vw, 32px)',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.65rem, 5vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#192837',
              margin: 0,
              marginBottom: 24,
              fontWeight: 700,
            }}
          >
            <Zap
              size={24}
              color="#192837"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: -2,
                marginRight: '0.25em',
              }}
            />
            Lock Down Your Passwords{' '}
            <LockKeyhole
              size={24}
              color="#192837"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: -2,
                margin: '0 0.15em',
              }}
            />
            with
            <br />
            Ironclad Security
            <Fingerprint
              size={24}
              color="#192837"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                position: 'relative',
                top: -2,
                marginLeft: '0.25em',
              }}
            />
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              lineHeight: 1.65,
              opacity: 0.8,
              maxWidth: 560,
              color: '#192837',
              margin: 0,
              marginBottom: 32,
            }}
          >
            Zero stress, total control. VaultShield keeps you covered with unbreakable
            storage, one-tap access, and pro-grade tools for your non-stop world.
          </motion.p>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              style={{
                background: '#7342E2',
                color: '#fff',
                border: 'none',
                borderRadius: 50,
                padding: '17px 24px',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 4px 24px rgba(115,66,226,0.28)',
                minWidth: 210,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 32,
                cursor: 'pointer',
              }}
            >
              <span>Get It Free</span>
              <ArrowRightCircle size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="vs-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(25,40,55,0.35)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 40,
              }}
            />
            <motion.aside
              key="vs-sheet"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 'min(88vw, 360px)',
                height: '100dvh',
                background: '#CFC8C5',
                boxShadow: '-12px 0 48px rgba(25,40,55,0.18)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 24px 28px',
                color: '#192837',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <Logo />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 6,
                    cursor: 'pointer',
                    color: '#192837',
                    display: 'inline-flex',
                  }}
                >
                  <X size={26} />
                </button>
              </div>

              <div
                style={{
                  height: 1,
                  background: 'rgba(25,40,55,0.18)',
                  marginBottom: 24,
                }}
              />

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  flex: 1,
                }}
              >
                {NAV_LINKS.map((label, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.18 + i * 0.07,
                      duration: 0.45,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <a
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: '#192837',
                        textDecoration: 'none',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
                <PrimaryButton>Start For Free</PrimaryButton>
                <SecondaryButton>Sign In</SecondaryButton>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
