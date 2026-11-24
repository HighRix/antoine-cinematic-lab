'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLS_SRC = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';
const VIDEO_HUMAN = '/videos/nexus/human.mp4';
const VIDEO_AI = '/videos/nexus/ai.mp4';

function VideoIcon({ src, size = 72 }: { src: string; size?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);
  return (
    <span
      className="inline-block align-middle rounded-full overflow-hidden"
      style={{
        width: `clamp(48px, 10vw, ${size}px)`,
        height: `clamp(48px, 10vw, ${size}px)`,
        flexShrink: 0,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </span>
  );
}

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(90deg, #666666 0%, #d0d0d0 50%, #666666 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'block',
  lineHeight: 1.1,
  marginBottom: '-0.22em',
};

export function NexusHero() {
  const bgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = bgRef.current;
    if (!v) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({ autoStartLoad: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(v);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        v.play().catch(() => {});
      });
    } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = HLS_SRC;
      const onLoaded = () => v.play().catch(() => {});
      v.addEventListener('loadedmetadata', onLoaded);
      return () => v.removeEventListener('loadedmetadata', onLoaded);
    }
    return () => {
      hls?.destroy();
    };
  }, []);

  return (
    <section
      className="nexus-root relative flex flex-col items-center overflow-hidden"
      style={{ minHeight: '100vh', background: '#000' }}
    >
      <video
        ref={bgRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Navbar */}
      <header
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-6"
      >
        <a href="#" className="flex items-center gap-2 text-white">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
            <defs>
              <linearGradient id="nexus-logo-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#27F3A9" />
                <stop offset="100%" stopColor="#0E7A52" />
              </linearGradient>
            </defs>
            <path
              d="M16 3 L28 10 L28 22 L16 29 L4 22 L4 10 Z"
              fill="none"
              stroke="url(#nexus-logo-grad)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="16" r="3.5" fill="url(#nexus-logo-grad)" />
          </svg>
          <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>nexus</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-white/80">
          <a href="#" className="hover:text-white transition-colors">Product</a>
          <a href="#" className="hover:text-white transition-colors">Why nexus</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Company</a>
        </nav>

        <button
          type="button"
          className="hidden sm:inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          style={{
            padding: '8px 18px',
            background: '#000',
            boxShadow: '0px 4px 16px 4px rgba(39, 243, 169, 0.12)',
            borderRadius: 8,
            outline: '1px solid #30463C',
            outlineOffset: -1,
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 13,
          }}
        >
          Get started
        </button>
      </header>

      <div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
        style={{ marginTop: 380 }}
      >
        <h1
          className="leading-tight"
          style={{
            fontFamily: "'YDYoonche L', 'YDYoonche M', sans-serif",
            fontSize: 'clamp(2.2rem, 7vw, 6.5rem)',
            color: '#fff',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          <span style={GRADIENT_TEXT}>The vision</span>
          <span style={GRADIENT_TEXT}>of engineering</span>
          <span className="flex items-center justify-center gap-3 flex-wrap" style={{ color: '#fff' }}>
            <span style={{ color: '#999' }}>is</span>
            <VideoIcon src={VIDEO_HUMAN} size={110} />
            <span>human</span>
            <span
              style={{ color: '#999', position: 'relative', top: '0.15em', marginLeft: '0.25em' }}
            >
              +
            </span>
            <VideoIcon src={VIDEO_AI} size={110} />
            <span>AI</span>
          </span>
        </h1>

        <p
          className="mt-4 max-w-xl text-center px-2"
          style={{
            fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
            color: '#ccc',
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          We help you map the talent you need, track the talent you have, and close your gaps to
          thrive in a GenAI world.
        </p>

        <button
          type="button"
          className="mt-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_6px_32px_8px_rgba(39,243,169,0.22)] active:scale-[0.98]"
          style={{
            padding: '12px 28px',
            background: '#000',
            boxShadow: '0px 6px 24px 6px rgba(39, 243, 169, 0.15)',
            borderRadius: 8,
            outline: '1px solid #30463C',
            outlineOffset: -1,
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 400 }}>Join The Movement!</span>
        </button>
      </div>
    </section>
  );
}
