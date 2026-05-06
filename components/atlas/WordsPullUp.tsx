'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function WordsPullUp({
  text,
  className = '',
  staggerDelay = 0.08,
  showAsterisk = false,
}: {
  text: string;
  className?: string;
  staggerDelay?: number;
  showAsterisk?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative whitespace-pre"
          >
            {word}
            {isLast && showAsterisk && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
            {!isLast && ' '}
          </motion.span>
        );
      })}
    </span>
  );
}

export function WordsPullUpMultiStyle({
  segments,
  staggerDelay = 0.08,
  className = '',
}: {
  segments: { text: string; className?: string }[];
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  let wordIdx = 0;

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {segments.map((seg, segIdx) => {
        const words = seg.text.split(' ');
        return words.map((word, i) => {
          const idx = wordIdx++;
          return (
            <motion.span
              key={`${segIdx}-${i}`}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: idx * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block whitespace-pre ${seg.className || ''}`}
            >
              {word}
              {' '}
            </motion.span>
          );
        });
      })}
    </span>
  );
}
