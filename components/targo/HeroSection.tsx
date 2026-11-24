'use client';

import { Phone } from 'lucide-react';

const CLIP_POLYGON =
  'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';

function TargoLogo() {
  return (
    <svg
      width="116"
      height="28"
      viewBox="0 0 232 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="targo"
    >
      {/* Abstract mark : T + arrow */}
      <g fill="#FFFFFF">
        <rect x="2" y="6" width="44" height="8" />
        <rect x="20" y="6" width="8" height="44" />
        <path d="M30 32 L48 32 L40 22 L56 32 L40 42 L48 32 Z" />
      </g>
      {/* Wordmark */}
      <text
        x="72"
        y="38"
        fontFamily="Rubik, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="-1.2"
      >
        targo
      </text>
    </svg>
  );
}

export function TargoHero() {
  return (
    <section className="targo-hero">
      <video
        className="targo-bg-video"
        src="/videos/hero-targo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <header className="targo-nav">
        <div className="targo-nav-left">
          <a href="#" aria-label="targo home" className="targo-brand">
            <TargoLogo />
          </a>

          <nav className="targo-nav-links">
            <a href="#">HOME</a>
            <a href="#">ABOUT</a>
            <a href="#">CONTACT US</a>
          </nav>
        </div>

        <button type="button" className="targo-btn targo-btn-red targo-nav-cta">
          Contact Us
        </button>
      </header>

      <div className="targo-hero-content">
        <h1 className="targo-headline">
          Swift and Simple
          <br />
          Transport
        </h1>
        <button type="button" className="targo-btn targo-btn-red targo-cta-primary">
          Get Started
        </button>
      </div>

      <aside className="targo-card" aria-label="Book a free consultation">
        <div className="targo-card-shine" aria-hidden />
        <div className="targo-card-inner">
          <img
            src="/images/targo/avatar.jpg"
            alt=""
            className="targo-card-avatar"
            draggable={false}
          />
          <div className="targo-card-body">
            <p className="targo-card-title">
              Book an Free
              <br />
              Consultation
            </p>
            <p className="targo-card-sub">Explore low off menu options</p>
            <button type="button" className="targo-card-cta">
              <Phone size={14} strokeWidth={2.4} />
              <span>BOOK A CALL</span>
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .targo-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #000;
          font-family: 'Rubik', sans-serif;
          color: #fff;
        }

        .targo-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .targo-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 28px 64px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .targo-nav-left {
          display: flex;
          align-items: center;
          gap: 44px;
          flex-wrap: nowrap;
          white-space: nowrap;
        }
        .targo-brand svg { display: block; }

        .targo-brand {
          display: inline-flex;
          align-items: center;
        }

        .targo-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .targo-nav-links a {
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }
        .targo-nav-links a:hover {
          opacity: 1;
        }

        .targo-btn {
          font-family: 'Rubik', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          clip-path: ${CLIP_POLYGON};
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .targo-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .targo-btn-red {
          background: #EE3F2C;
          color: #fff;
          padding: 11px 22px;
        }
        .targo-btn-white {
          background: #fff;
          color: #000;
          padding: 12px 20px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .targo-nav-cta {
          font-size: 13px;
          padding: 10px 18px;
        }

        .targo-hero-content {
          position: relative;
          z-index: 5;
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 64px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 28px;
        }

        .targo-headline {
          font-family: 'Rubik', sans-serif;
          font-weight: 700;
          font-size: clamp(42px, 6vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #fff;
          margin: 0;
          max-width: 720px;
        }

        .targo-cta-primary {
          padding: 13px 26px;
        }

        .targo-card {
          position: absolute;
          left: 64px;
          bottom: 56px;
          z-index: 6;
          width: fit-content;
          max-width: 320px;
          border-radius: 18px;
          padding: 1px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04),
            0 18px 40px rgba(0, 0, 0, 0.3);
        }
        .targo-card-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.14) 0%,
            rgba(255, 255, 255, 0.03) 30%,
            rgba(255, 255, 255, 0) 55%
          );
        }
        .targo-card-inner {
          position: relative;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .targo-card-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.18);
        }
        .targo-card-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .targo-card-title {
          font-family: 'Rubik', sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: #fff;
          margin: 0;
        }
        .targo-card-sub {
          font-size: 11.5px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          letter-spacing: 0.01em;
        }
        .targo-card-cta {
          margin-top: 10px;
          align-self: flex-start;
          background: #fff;
          color: #000;
          border: none;
          padding: 8px 14px;
          font-family: 'Rubik', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .targo-card-cta:hover {
          filter: brightness(0.95);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .targo-nav {
            padding: 20px 32px;
          }
          .targo-nav-links {
            display: none;
          }
          .targo-hero-content {
            padding: 24px 32px 0;
            gap: 20px;
          }
          .targo-headline {
            font-size: 42px;
          }
          .targo-card {
            left: 32px;
            right: 32px;
            bottom: 32px;
            width: auto;
          }
        }
      `}</style>
    </section>
  );
}
