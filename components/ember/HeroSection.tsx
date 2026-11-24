'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Hls from 'hls.js';

const HLS_SRC = 'https://stream.mux.com/Q3hYHAcLU82ceOUgwDeO4HiwOc3WZn9JD02PugwzxHOI.m3u8';

function useHls(videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(v);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        v.playbackRate = 0.7;
        v.play().catch(() => {});
      });
    } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = HLS_SRC;
      const onLoaded = () => {
        v.playbackRate = 0.7;
        v.play().catch(() => {});
      };
      v.addEventListener('loadedmetadata', onLoaded);
      return () => {
        v.removeEventListener('loadedmetadata', onLoaded);
      };
    }

    return () => {
      hls?.destroy();
    };
  }, [videoRef]);
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid grid-cols-2 gap-0.5">
        <span className="block w-2 md:w-2.5 h-2 md:h-2.5 bg-[#FF5C35]" />
        <span className="block w-2 md:w-2.5 h-2 md:h-2.5 bg-[#FF5C35]" />
        <span className="block w-2 md:w-2.5 h-2 md:h-2.5 bg-[#FF5C35]" />
        <span className="block w-2 md:w-2.5 h-2 md:h-2.5 bg-[#FF5C35]" />
      </div>
      <span className="text-lg md:text-xl font-black tracking-tighter">EMBER.dsgn</span>
    </div>
  );
}

const NAV_ITEMS = ['WORKS', 'SERVICES', 'ABOUT', 'TEAM'] as const;

function Navigation({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 lg:py-8 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-10">
        <Logo />
        <div className="hidden lg:flex items-center gap-6 text-[10.5px] uppercase font-medium tracking-[0.2em] text-white/70">
          {NAV_ITEMS.map((label) => (
            <a key={label} href="#" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="w-1 h-1 bg-white rounded-full opacity-50" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        <div className="hidden sm:flex border border-white/20 rounded-full px-4 py-1.5 text-[10.5px] font-medium tracking-widest uppercase items-center gap-3 bg-white/5 backdrop-blur-sm">
          <span>EN</span>
          <span className="text-white/20">|</span>
          <span className="text-white/40">RU</span>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden p-2"
        >
          <Menu size={22} />
        </button>

        <a
          href="#"
          className="hidden sm:flex items-center gap-2 border border-white/20 rounded-full px-6 py-2 text-[10.5px] font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-sm"
        >
          <span className="w-1 h-1 bg-white rounded-full opacity-50" />
          <span>CONTACTS</span>
        </a>
      </div>
    </nav>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-black pointer-events-auto lg:hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <Logo />
            <button type="button" aria-label="Close menu" onClick={onClose} className="p-2">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow flex flex-col justify-center px-12 gap-8">
            {['WORKS', 'SERVICES', 'ABOUT', 'TEAM', 'CONTACTS'].map((label, i) => (
              <motion.a
                key={label}
                href="#"
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-4xl font-bold tracking-tighter hover:text-[#FF5C35] transition-colors"
              >
                {label}
              </motion.a>
            ))}
          </div>

          <div className="p-12 border-t border-white/10 flex justify-between items-center text-[10.5px] uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span>EN</span>
              <span className="text-white/30">|</span>
              <span className="text-white/40">RU</span>
            </div>
            <span className="text-white/60">UKRAINE / LONDON</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LeftPanel() {
  return (
    <div className="relative w-full lg:w-1/2 min-h-screen lg:h-full flex flex-col pointer-events-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
      {/* Blur layer with EMBER cutout via SVG mask + foreignObject */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 640 900"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <mask id="emberMask" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="900">
            <rect width="640" height="900" fill="white" />
            <text
              x="50"
              y="340"
              textLength="540"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="200"
              fontWeight="900"
              fill="black"
              style={{ letterSpacing: '-10px' }}
            >
              EMBER
            </text>
          </mask>
        </defs>
        <foreignObject width="640" height="900" mask="url(#emberMask)">
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(195, 195, 195, 0.96)',
              backdropFilter: 'blur(40px) saturate(80%)',
              WebkitBackdropFilter: 'blur(40px) saturate(80%)',
            }}
          />
        </foreignObject>
      </svg>

      {/* Content stack */}
      <div className="relative z-20 pt-[12vh] lg:pt-[8vh] px-6 md:px-12 flex flex-col h-full">
        <div className="h-[20vh] lg:h-[25vh]" />

        <div className="flex-grow flex flex-col pt-4 min-h-[100px]">
          <div className="w-px h-full bg-white/20" />
        </div>

        <div className="pb-12 flex flex-col gap-6 pt-4">
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/40">ABOUT</p>
          <h2 className="text-xl md:text-2xl font-normal leading-[1.3] text-white/90 max-w-md">
            We shape striking digital identities through bold contrasts and meaningful motion.
            <br />
            <br />
            Our design process transforms the primal into the powerful.
          </h2>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/10 pt-8 w-full gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Double Click and
              </span>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-2">
                Explore Our Work
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-widest">
              <a href="#" className="flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full opacity-50" />
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full opacity-50" />
                Telegram
              </a>
            </div>

            <div className="hidden sm:flex flex-col gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60 text-right">
              <span>23 Industrial Lane, Unit 5</span>
              <span>London, UK, E2 8AA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:h-full flex flex-col justify-end pb-8 lg:pb-2 pointer-events-auto overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
        <div className="relative h-full aspect-square flex flex-col items-center">
          <div
            className="absolute w-[40vh] lg:w-[60vh] h-[40vh] lg:h-[60vh] border border-white/20 lg:border-white/35 rounded-full"
            style={{ top: '-10vh' }}
          />
          <div
            className="absolute w-[40vh] lg:w-[60vh] h-[40vh] lg:h-[60vh] border border-white/20 lg:border-white/35 rounded-full"
            style={{ top: '30vh' }}
          />
        </div>
      </div>

      <div className="z-10 relative w-full mb-1 px-6 md:px-[8%]">
        <svg viewBox="0 0 320 100" className="w-full block" aria-hidden>
          <text
            x="0"
            y="80"
            textLength="320"
            lengthAdjust="spacingAndGlyphs"
            className="font-[900] tracking-tighter"
            fill="#FFFFFF"
            style={{ fontSize: 100 }}
          >
            STUDIO
          </text>
        </svg>
      </div>
    </div>
  );
}

export function EmberHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useHls(videoRef);

  return (
    <div className="ember-root relative h-screen w-full font-sans text-white selection:bg-white/20 overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />

      <div className="absolute inset-0 flex flex-col lg:flex-row z-10 pointer-events-none overflow-y-auto lg:overflow-hidden scrollbar-hide">
        <LeftPanel />
        <RightPanel />
      </div>

      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
