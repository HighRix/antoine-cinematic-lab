'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  /** Big metric (e.g. "20+") : rendered XL at top of content block */
  value: string;
  /** Caption below value, uppercase tracking-wider */
  label: string;
  /** Longer descriptive sentence */
  description: string;
  icon: ReactNode;
  /** CSS background gradient string used both for the glow and the border */
  gradient: string;
  delay: number;
}

export function FeatureCard({
  value,
  label,
  description,
  icon,
  gradient,
  delay,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className="relative flex flex-col justify-start items-start w-full max-w-[260px] md:max-w-[340px] group mx-auto"
    >
      {/* Blurred glow behind the card */}
      <div
        aria-hidden
        className="absolute w-full h-[260px] md:h-[300px] opacity-60 rounded-[40px] pointer-events-none"
        style={{
          background: gradient,
          filter: 'blur(45px)',
        }}
      />

      {/* Foreground card with gradient border (background-clip technique) */}
      <div
        className="self-stretch h-[260px] md:h-[300px] rounded-[40px] z-10 overflow-hidden"
        style={{
          border: '8px solid transparent',
          background: `linear-gradient(#141414, #141414) padding-box, ${gradient} border-box`,
        }}
      >
        <div className="w-full h-full p-7 flex flex-col justify-between">
          <div className="text-white/90">{icon}</div>

          <div className="flex flex-col">
            <div className="text-white font-medium text-5xl md:text-6xl tracking-tight leading-none">
              {value}
            </div>
            <div className="text-white/70 text-[11px] font-medium uppercase tracking-[0.18em] mt-2">
              {label}
            </div>
            <p className="text-gray-400 text-[13px] leading-[1.55] font-normal mt-4 selection:bg-white/20">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
