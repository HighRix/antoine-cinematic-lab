'use client';
import { useEffect, useState } from 'react';

export function AnimatedHeading({
  text,
  className = '',
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
}: {
  text: string;
  className?: string;
  initialDelay?: number;
  charDelay?: number;
  charDuration?: number;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {Array.from(line).map((char, charIndex) => {
            const totalDelay =
              lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                  transition: `opacity ${charDuration}ms ease-out, transform ${charDuration}ms ease-out`,
                  transitionDelay: `${totalDelay}ms`,
                }}
              >
                {char === ' ' ? ' ' : char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}
