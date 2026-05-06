'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function BlurText({
  text,
  className = '',
  delay = 200,
  by = 'words',
}: {
  text: string;
  className?: string;
  delay?: number;
  by?: 'words' | 'letters';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const parts = by === 'words' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {parts.map((part, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            inView
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            delay: (i * delay) / 1000,
            ease: 'easeOut',
          }}
        >
          {part}
          {by === 'words' && i < parts.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
}
