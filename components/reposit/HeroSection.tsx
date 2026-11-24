'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';

const LIGHT_IMG = '/images/reposit/hero-light.jpg';
const DARK_IMG = '/images/reposit/hero-dark.jpg';

export function RepositHero() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const bgFrontRef = useRef<HTMLDivElement>(null);
  const bgBackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  useEffect(() => {
    if (bgFrontRef.current) bgFrontRef.current.style.backgroundImage = `url(${DARK_IMG})`;
    if (bgBackRef.current) bgBackRef.current.style.backgroundImage = `url(${DARK_IMG})`;
  }, []);

  // Cleanup on unmount: remove light-theme + restore body overflow
  useEffect(() => {
    return () => {
      document.body.classList.remove('light-theme');
      document.body.classList.remove('reposit-active');
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('reposit-active');
  }, []);

  const toggleTheme = (toDark: boolean) => {
    if (isDark === toDark || animatingRef.current) return;
    animatingRef.current = true;
    const target = toDark ? DARK_IMG : LIGHT_IMG;

    if (bgBackRef.current) bgBackRef.current.style.backgroundImage = `url(${target})`;
    if (bgFrontRef.current) bgFrontRef.current.classList.add('pull-down');

    window.setTimeout(() => {
      setIsDark(toDark);
      if (bgFrontRef.current) bgFrontRef.current.style.backgroundImage = `url(${target})`;
      window.setTimeout(() => {
        if (bgFrontRef.current) bgFrontRef.current.classList.remove('pull-down');
        animatingRef.current = false;
      }, 30);
    }, 300);
  };

  return (
    <div className="hero">
      <div className="blur-overlay blur-overlay-top" />
      <div className="blur-overlay blur-overlay-bottom" />

      <div className="hero-bg-wrapper">
        <div ref={bgBackRef} className="hero-bg bg-back" />
        <div ref={bgFrontRef} className="hero-bg bg-front" />
      </div>

      <nav className="navbar">
        <div className="logo-container">
          <Zap className="logo" size={32} strokeWidth={2} />
          <span className="brand-name">reposit</span>
        </div>

        <div className={`nav-links${menuOpen ? ' active' : ''}`}>
          <a href="#">How It Works</a>
          <a href="#">Our Cases</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Resources</a>
          <a href="#">Customers</a>
          <button type="button" className="cta-button drawer-cta">
            Get an Instant Quote
          </button>
        </div>

        <button type="button" className="cta-button nav-cta">
          Get an Instant Quote
        </button>

        <div
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          role="button"
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <div className="hero-content">
        <h1 className="hero-title">
          $0 Electricity Bills
          <br />
          <span className="title-accent">for the next</span> 7 years
        </h1>

        <div className="hero-bottom">
        <div className="theme-toggle">
          <div
            className="toggle-indicator"
            style={{
              transform: isDark ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
            }}
          />
          <button
            type="button"
            className={`toggle-btn${!isDark ? ' active' : ''}`}
            onClick={() => toggleTheme(false)}
          >
            <span className="label">Morning</span>
            <span className="subtext">$0 for Electricity</span>
          </button>
          <button
            type="button"
            className={`toggle-btn${isDark ? ' active' : ''}`}
            onClick={() => toggleTheme(true)}
          >
            <span className="label">Night</span>
            <span className="subtext">$0 for Electricity</span>
          </button>
        </div>

        <p className="hero-footer">
          Forget the energy market, weather conditions and seasons; our Smart Controller
          guarantees you get no electricity bill for seven years.
        </p>
        </div>
      </div>
    </div>
  );
}
