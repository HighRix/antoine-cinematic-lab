'use client';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export function HlsVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    video.src = src;
  }, [src]);
  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={style}
    />
  );
}
