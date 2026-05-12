'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * OutletAssemble : SVG hand-coded de prise européenne décomposée
 * en 7 composants qui s'assemblent en boucle, terminant par une
 * mise sous tension verte. Materials simulés via gradients SVG
 * (cuivre poli, acier brossé, noir mat anodisé, fils torsadés).
 */
export function OutletAssemble({ className = '' }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

      // Initial exploded state
      gsap.set('.outlet-wires', { x: 240, y: 60, opacity: 0 });
      gsap.set('.outlet-contact-1', { x: 200, y: -180, opacity: 0 });
      gsap.set('.outlet-contact-2', { x: 200, y: 180, opacity: 0 });
      gsap.set('.outlet-ground', { x: 280, opacity: 0 });
      gsap.set('.outlet-mechanism', { x: -240, y: 110, opacity: 0 });
      gsap.set('.outlet-frame', { x: 240, y: -100, opacity: 0 });
      gsap.set('.outlet-faceplate', { x: -300, opacity: 0 });
      gsap.set('.outlet-glow', { opacity: 0 });

      // Phase 1 (0-0.6s) : fade in à positions éclatées
      tl.to(
        ['.outlet-wires', '.outlet-mechanism', '.outlet-contact-1', '.outlet-contact-2', '.outlet-ground', '.outlet-frame', '.outlet-faceplate'],
        { opacity: 0.9, duration: 0.5, stagger: 0.04, ease: 'power1.out' },
        0
      );

      // Phase 2 (0.6-2.4s) : assemblage séquencé
      tl.to('.outlet-wires', { x: 0, y: 0, duration: 0.7, ease: 'power2.inOut' }, 0.55);
      tl.to('.outlet-mechanism', { x: 0, y: 0, duration: 0.7, ease: 'power2.inOut' }, 0.75);
      tl.to('.outlet-contact-1', { x: 0, y: 0, duration: 0.6, ease: 'power2.inOut' }, 0.95);
      tl.to('.outlet-contact-2', { x: 0, y: 0, duration: 0.6, ease: 'power2.inOut' }, 0.95);
      tl.to('.outlet-ground', { x: 0, duration: 0.55, ease: 'power2.inOut' }, 1.15);
      tl.to('.outlet-frame', { x: 0, y: 0, duration: 0.6, ease: 'power2.inOut' }, 1.35);
      tl.to('.outlet-faceplate', { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out' }, 1.65);
      tl.to(
        ['.outlet-wires', '.outlet-mechanism', '.outlet-contact-1', '.outlet-contact-2', '.outlet-ground', '.outlet-frame'],
        { opacity: 1, duration: 0.3 },
        1.65
      );

      // Phase 3 (2.6-3.8s) : ignition verte
      tl.to('.outlet-glow', { opacity: 1, duration: 0.5, ease: 'power2.out' }, 2.6);
      tl.to(
        '.outlet-glow',
        { opacity: 0.55, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: 2 },
        3.1
      );

      // Phase 4 (5.0-5.6s) : fade out propre pour reset boucle
      tl.to(
        ['.outlet-wires', '.outlet-mechanism', '.outlet-contact-1', '.outlet-contact-2', '.outlet-ground', '.outlet-frame', '.outlet-faceplate', '.outlet-glow'],
        { opacity: 0, duration: 0.6, ease: 'power2.in' },
        5.0
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className={`relative w-full h-full ${className}`} aria-hidden>
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* === Matte black material (face plate, frame) === */}
          <linearGradient id="grad-matte-black" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="40%" stopColor="#181818" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>

          {/* === Polished copper material (contacts, wires) === */}
          <linearGradient id="grad-copper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB680" />
            <stop offset="25%" stopColor="#E89150" />
            <stop offset="55%" stopColor="#B86A2D" />
            <stop offset="100%" stopColor="#5A3014" />
          </linearGradient>

          <linearGradient id="grad-copper-spec" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFE0C0" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#FFE0C0" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#FFE0C0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* === Brushed steel material (mechanism, ground pin) === */}
          <linearGradient id="grad-steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cccccc" />
            <stop offset="40%" stopColor="#888888" />
            <stop offset="100%" stopColor="#3d3d3d" />
          </linearGradient>

          <linearGradient id="grad-steel-spec" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* === Brushed metal pattern (vertical hatching) === */}
          <pattern id="brushed-pattern" x="0" y="0" width="2" height="100%" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#000000" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>

          {/* === Soft drop shadow filter === */}
          <filter id="soft-drop" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="3" result="offsetblur" />
            <feFlood floodColor="#000000" floodOpacity="0.55" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* === Glow blur === */}
          <filter id="green-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>

          {/* === Highlight on top edge === */}
          <linearGradient id="grad-edge-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* === WIRES (back-most) — 3 twisted copper braids === */}
        <g className="outlet-wires" filter="url(#soft-drop)">
          {/* 3 strands with twist effect */}
          <path d="M 380 540 Q 388 595, 360 645 T 305 720" fill="none" stroke="url(#grad-copper)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 380 540 Q 388 595, 360 645 T 305 720" fill="none" stroke="url(#grad-copper-spec)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

          <path d="M 400 540 Q 405 615, 393 700" fill="none" stroke="url(#grad-copper)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 400 540 Q 405 615, 393 700" fill="none" stroke="url(#grad-copper-spec)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

          <path d="M 420 540 Q 412 595, 440 645 T 495 720" fill="none" stroke="url(#grad-copper)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 420 540 Q 412 595, 440 645 T 495 720" fill="none" stroke="url(#grad-copper-spec)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>

        {/* === MECHANISM (brushed steel plate with rounded corners) === */}
        <g className="outlet-mechanism" filter="url(#soft-drop)">
          <rect x="318" y="358" width="164" height="84" rx="6" fill="url(#grad-steel)" />
          <rect x="318" y="358" width="164" height="84" rx="6" fill="url(#brushed-pattern)" />
          <rect x="318" y="358" width="164" height="6" rx="3" fill="url(#grad-edge-highlight)" />
          <rect x="318" y="358" width="164" height="84" rx="6" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
          {/* Two small allen mounting points (visible details, not full screws) */}
          <circle cx="335" cy="375" r="3" fill="#0a0a0a" />
          <circle cx="465" cy="425" r="3" fill="#0a0a0a" />
        </g>

        {/* === LEFT CONTACT (sculpted copper bracket shape) === */}
        <g className="outlet-contact-1" filter="url(#soft-drop)">
          <path
            d="M 365 380 Q 360 380, 360 386 L 360 414 Q 360 420, 365 420 L 380 420 Q 384 420, 384 416 L 384 410 Q 384 406, 380 406 L 372 406 L 372 394 L 380 394 Q 384 394, 384 390 L 384 384 Q 384 380, 380 380 Z"
            fill="url(#grad-copper)"
          />
          <path
            d="M 365 380 Q 360 380, 360 386 L 360 414 Q 360 420, 365 420 L 380 420 Q 384 420, 384 416 L 384 410 Q 384 406, 380 406 L 372 406 L 372 394 L 380 394 Q 384 394, 384 390 L 384 384 Q 384 380, 380 380 Z"
            fill="url(#grad-copper-spec)"
            opacity="0.7"
          />
        </g>

        {/* === RIGHT CONTACT (mirror) === */}
        <g className="outlet-contact-2" filter="url(#soft-drop)">
          <path
            d="M 435 380 Q 440 380, 440 386 L 440 414 Q 440 420, 435 420 L 420 420 Q 416 420, 416 416 L 416 410 Q 416 406, 420 406 L 428 406 L 428 394 L 420 394 Q 416 394, 416 390 L 416 384 Q 416 380, 420 380 Z"
            fill="url(#grad-copper)"
          />
          <path
            d="M 435 380 Q 440 380, 440 386 L 440 414 Q 440 420, 435 420 L 420 420 Q 416 420, 416 416 L 416 410 Q 416 406, 420 406 L 428 406 L 428 394 L 420 394 Q 416 394, 416 390 L 416 384 Q 416 380, 420 380 Z"
            fill="url(#grad-copper-spec)"
            opacity="0.7"
          />
        </g>

        {/* === GROUND PIN (steel cylinder) === */}
        <g className="outlet-ground" filter="url(#soft-drop)">
          <rect x="394" y="346" width="12" height="32" rx="3" fill="url(#grad-steel)" />
          <rect x="394" y="346" width="12" height="32" rx="3" fill="url(#brushed-pattern)" />
          <rect x="395" y="346" width="3" height="32" rx="1.5" fill="#FFFFFF" opacity="0.18" />
        </g>

        {/* === FRAME (intermediate structural piece) === */}
        <g className="outlet-frame" filter="url(#soft-drop)">
          <rect x="288" y="288" width="224" height="224" rx="10" fill="url(#grad-matte-black)" />
          <rect x="288" y="288" width="224" height="224" rx="10" fill="none" stroke="#0a0a0a" strokeWidth="1" />
          {/* Subtle highlight on top edge */}
          <rect x="288" y="288" width="224" height="10" rx="5" fill="url(#grad-edge-highlight)" />
          {/* 4 internal bracket holes (visible structural details) */}
          <circle cx="305" cy="305" r="3" fill="#000" opacity="0.7" />
          <circle cx="495" cy="305" r="3" fill="#000" opacity="0.7" />
          <circle cx="305" cy="495" r="3" fill="#000" opacity="0.7" />
          <circle cx="495" cy="495" r="3" fill="#000" opacity="0.7" />
        </g>

        {/* === FACE PLATE (matte black with cutouts) === */}
        <g className="outlet-faceplate" filter="url(#soft-drop)">
          <path
            fillRule="evenodd"
            fill="url(#grad-matte-black)"
            d="
              M 270 270 H 530 V 530 H 270 Z
              M 377 405 m -16 0 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0 Z
              M 423 405 m -16 0 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0 Z
              M 392 348 H 408 V 376 H 392 Z
            "
          />
          {/* Soft edge highlight on top */}
          <rect x="270" y="270" width="260" height="10" rx="2" fill="url(#grad-edge-highlight)" />
          {/* Inner bevel hairline */}
          <rect x="272" y="272" width="256" height="256" rx="2" fill="none" stroke="#1f1f1f" strokeWidth="0.7" />
          {/* Subtle anodized texture indicator */}
          <rect x="270" y="270" width="260" height="260" rx="2" fill="url(#brushed-pattern)" opacity="0.5" />
        </g>

        {/* === GREEN IGNITION GLOW (visible through cutouts) === */}
        <g className="outlet-glow">
          <circle cx="377" cy="405" r="22" fill="#03E840" filter="url(#green-glow)" opacity="0.5" />
          <circle cx="423" cy="405" r="22" fill="#03E840" filter="url(#green-glow)" opacity="0.5" />
          <rect x="385" y="345" width="30" height="40" fill="#03E840" filter="url(#green-glow)" opacity="0.4" />
          <circle cx="377" cy="405" r="9" fill="#03E840" opacity="0.95" />
          <circle cx="423" cy="405" r="9" fill="#03E840" opacity="0.95" />
          <rect x="394" y="350" width="12" height="22" fill="#03E840" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
