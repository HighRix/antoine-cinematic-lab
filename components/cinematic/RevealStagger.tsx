'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function RevealStagger({ children }: { children: ReactNode[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
    >
      {children.map((c, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {c}
        </motion.div>
      ))}
    </motion.div>
  );
}
