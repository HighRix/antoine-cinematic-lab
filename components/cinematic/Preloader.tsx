'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function Preloader() {
  const pathname = usePathname();
  const previewMode =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('preview');
  const skip = pathname?.startsWith('/devis') || previewMode;
  const [done, setDone] = useState(skip);
  useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, [skip]);
  if (skip) return null;
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0C0C0C] grid place-items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl tracking-tight"
          >
            ◆
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
