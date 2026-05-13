'use client';

import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';

/**
 * Full-viewport fixed background video with boomerang playback :
 * plays forward to end, then reverses via throttled `currentTime` seeks,
 * then plays forward again. Throttle prevents seek stacking.
 */
export function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let direction: 1 | -1 = 1;
    let currentTarget = 0;
    let seekPending = false;
    let lastTs = 0;
    let rafId = 0;

    const doSeek = () => {
      if (!videoRef.current) return;
      if (videoRef.current.seeking) {
        seekPending = true;
        return;
      }
      seekPending = false;
      try {
        videoRef.current.currentTime = currentTarget;
      } catch {}
    };

    const step = (ts: number) => {
      const v = videoRef.current;
      if (!v) return;
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      currentTarget -= dt;
      if (currentTarget <= 0) {
        direction = 1;
        try {
          v.currentTime = 0;
        } catch {}
        v.play().catch(() => {});
        return;
      }
      doSeek();
      rafId = requestAnimationFrame(step);
    };

    const onEnded = () => {
      direction = -1;
      currentTarget = video.duration || 0;
      seekPending = false;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    const onSeeked = () => {
      if (direction === -1 && seekPending) doSeek();
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('seeked', onSeeked);

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('seeked', onSeeked);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      autoPlay
      muted
      playsInline
      preload="auto"
      crossOrigin="anonymous"
      aria-hidden
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
    />
  );
}
