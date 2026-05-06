'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const total = chars.length;

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <Letter key={i} char={char} progress={scrollYProgress} index={i} total={total} />
      ))}
    </p>
  );
}

function Letter({
  char,
  progress,
  index,
  total,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  index: number;
  total: number;
}) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  );

  return <motion.span style={{ opacity }}>{char}</motion.span>;
}
