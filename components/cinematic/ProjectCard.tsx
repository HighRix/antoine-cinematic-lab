'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  client: string;
  number: string;
  video: string;
};

const KLEO_ORANGE = '#F27D26';

export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '300px 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, [inView]);

  return (
    <Link
      ref={ref}
      href={project.slug}
      className="group relative block bg-[#0C0C0C] overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F27D26]"
      style={{
        aspectRatio: '16 / 10',
        animationDelay: `${index * 80}ms`,
      }}
      aria-label={`${project.name} — ${project.tagline}`}
    >
      {/* Video preview */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {inView && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden
          />
        )}
      </div>

      {/* Dark gradient bottom (so text always reads) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-transparent pointer-events-none"
      />

      {/* Always-visible: number + slug */}
      <div className="absolute top-5 left-5 right-5 flex items-baseline justify-between gap-4 z-10">
        <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-white/60 font-mono">
          {project.number} / {String(total).padStart(2, '0')}
        </span>
        <span className="text-[10px] tracking-[0.18em] uppercase font-mono text-white/45 group-hover:text-[color:var(--kleo-orange)] transition-colors duration-300"
              style={{ ['--kleo-orange' as never]: KLEO_ORANGE }}>
          {project.slug}
        </span>
      </div>

      {/* Hover overlay: name + tagline */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col gap-2 z-10 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.02em] leading-[1] text-white">
          {project.name}
        </h2>
        <p className="text-white/70 text-[13px] leading-relaxed max-w-[420px]">
          {project.tagline}
        </p>
      </div>

      {/* Visible at rest: project name only (small, bottom-left) */}
      <div className="absolute bottom-5 left-5 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <p className="font-serif text-lg md:text-xl tracking-[-0.01em] text-white">
          {project.name}
        </p>
      </div>

      {/* Hover ring (orange) */}
      <div
        aria-hidden
        className="absolute inset-0 ring-0 group-hover:ring-1 transition-all duration-300 pointer-events-none"
        style={{ ['--tw-ring-color' as never]: `${KLEO_ORANGE}66` }}
      />

      {/* Hover corner accent */}
      <span
        aria-hidden
        className="absolute top-0 left-0 w-0 h-0 group-hover:w-8 group-hover:h-[2px] transition-all duration-500"
        style={{ background: KLEO_ORANGE }}
      />
      <span
        aria-hidden
        className="absolute top-0 left-0 w-0 h-0 group-hover:w-[2px] group-hover:h-8 transition-all duration-500"
        style={{ background: KLEO_ORANGE }}
      />
    </Link>
  );
}
