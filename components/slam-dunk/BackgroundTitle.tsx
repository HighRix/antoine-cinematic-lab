'use client';

import React, { useEffect, useRef } from 'react';
import { Product } from './types';
import gsap from 'gsap';

interface BackgroundTitleProps {
  product: Product;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

const CinematicText = ({ text, delay }: { text: string, delay: number }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.killTweensOf(chars);
    
    gsap.fromTo(chars, 
        { 
            y: 120,          
            opacity: 0,
            scale: 0.8,      
            filter: 'blur(15px)', 
            rotateX: -45,    
        },
        { 
            y: 0, 
            opacity: 0.4,    
            scale: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            duration: 1.4, 
            stagger: 0.06,   
            ease: "power4.out",
            delay: delay 
        }
    );
  }, [text, delay]);

  return (
    <span ref={containerRef} className="inline-flex relative perspective-1000" style={{ perspective: '1000px' }}>
      {text.split('').map((char, i) => (
        <span key={`${text}-${i}`} className="char inline-block will-change-transform origin-bottom" style={{ transformStyle: 'preserve-3d' }}>
          {char}
        </span>
      ))}
    </span>
  );
};

export const BackgroundTitle: React.FC<BackgroundTitleProps> = ({ product, scrollRef }) => {
  const slamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax logic or visibility logic for SLAM text could go here
    const handleScroll = () => {
        if (!scrollRef?.current || !slamRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
        
        // Show SLAM text only near end (Section 6 start > 0.83)
        if (progress > 0.8) {
            slamRef.current.style.opacity = '0.1';
            slamRef.current.style.transform = `translateY(${(progress - 0.8) * -50}px)`;
        } else {
            slamRef.current.style.opacity = '0';
        }
    };

    const container = scrollRef?.current;
    if (container) {
        container.addEventListener('scroll', handleScroll);
    }
    return () => {
        if (container) container.removeEventListener('scroll', handleScroll);
    }
  }, [scrollRef]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Hero Section Title */}
        {/* Mobile: Pushed down to 48vh (to clear the ball at y=1.2). Increased text size to 16vw. */}
        <div className="flex absolute inset-0 flex-row items-start justify-center pt-[48vh] md:items-center md:pt-0">
            <h1 key={`title-dt-${product.id}`} className="font-[family-name:var(--font-anton)] font-bold text-[16vw] md:text-[18vw] leading-none text-white tracking-widest mix-blend-overlay flex flex-row items-center gap-3 md:gap-[12vw]">
                <CinematicText text={product.namePart1} delay={0} />
                <CinematicText text={product.namePart2} delay={0.2} />
            </h1>
        </div>

        {/* Footer SLAM Title (Behind Ball) */}
        <div ref={slamRef} className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-1000">
             <h1 className="font-[family-name:var(--font-anton)] text-[25vw] text-white tracking-widest translate-y-[-10vh]">SLAM</h1>
        </div>
    </div>
  );
};