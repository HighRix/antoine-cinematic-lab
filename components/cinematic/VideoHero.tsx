'use client';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export function VideoHero({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (Hls.isSupported() && src.endsWith('.m3u8')) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(ref.current);
      return () => hls.destroy();
    }
    ref.current.src = src;
  }, [src]);
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    />
  );
}
