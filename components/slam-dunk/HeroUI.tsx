'use client';

import React, { useEffect, useRef } from 'react';
import { Product } from './types';
import gsap from 'gsap';
import { BackgroundTitle } from './BackgroundTitle';
import { Navigation } from './Navigation';
import { audio } from './utils/audio';

interface HeroUIProps {
  product: Product;
  onNext: () => void;
  onPrev: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  cartCount: number;
  onAddToCart: () => void;
  onCustomize: () => void;
  onOpenCart: () => void;
}

export const HeroUI: React.FC<HeroUIProps> = ({ product, onNext, onPrev, scrollRef, cartCount, onAddToCart, onCustomize, onOpenCart }) => {
  const priceRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (priceRef.current) {
        gsap.fromTo(priceRef.current, 
            { y: 30, opacity: 0, filter: 'blur(8px)' }, 
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", delay: 0.4 }
        );
    }
  }, [product.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
             entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (scrollRef.current) {
        const elements = scrollRef.current.querySelectorAll('.animate-item');
        elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [product]);

  return (
    <div ref={scrollRef} data-lenis-prevent className="absolute inset-0 z-30 w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar snap-y snap-mandatory">
      
      {/* --- SECTION 1: HERO (Snap Start) --- */}
      <div className="relative w-full h-full min-h-full flex flex-col md:block snap-start">
          <div className="absolute top-0 left-0 w-full z-50"><Navigation cartCount={cartCount} onCustomize={onCustomize} onOpenCart={onOpenCart} /></div>
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none"><BackgroundTitle product={product} scrollRef={scrollRef} /></div>
          <div className="relative w-full h-full pointer-events-none flex flex-col justify-end z-10">
            <div className="md:hidden w-full h-[20vh] shrink-0"></div>
            
            <div 
              className="hidden md:flex absolute left-[10%] top-[20%] items-center gap-4 pointer-events-auto cursor-pointer group hover:scale-105 transition-transform duration-300 interactive"
              onMouseEnter={() => audio.playHover()}
              onClick={() => audio.playClick()}
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all backdrop-blur-sm">
                 <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
              </div>
              <div className="text-white text-xs font-light leading-tight opacity-70 group-hover:opacity-100 transition-opacity">Promotion<br/>video</div>
            </div>

            <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent">
               <span className="absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-widest font-mono" style={{ color: product.accentColor }}>90/10</span>
            </div>

            <div className="w-full px-6 md:px-16 pb-6 md:pb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mt-auto md:mt-0 pointer-events-none">
              <div className="flex flex-col gap-2 w-full md:w-auto text-center md:text-left pointer-events-auto items-center md:items-start">
                 <div key={`price-${product.id}`} ref={priceRef} className="font-sans text-6xl md:text-5xl font-light tracking-wide drop-shadow-2xl" style={{ color: product.accentColor }}>${product.price}</div>
                 <div className="text-gray-400 text-xs tracking-wider uppercase font-medium flex items-center gap-2">Size: <span className="text-white">29.5"</span> <span className="w-1 h-1 bg-white/50 rounded-full"></span> Official</div>
              </div>

              <div className="w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-12 pointer-events-auto order-last md:order-none mt-4 md:mt-0 flex justify-center gap-4">
                 
                 {/* ADD TO CART BUTTON (Customize button removed from here) */}
                 <button 
                    onClick={onAddToCart} 
                    onMouseEnter={() => audio.playHover()}
                    className="interactive group relative w-full md:w-auto overflow-hidden rounded-sm px-14 py-5 shadow-[0_0_20px_rgba(255,85,0,0.5)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
                    style={{ backgroundColor: product.accentColor }}
                 >
                    <div className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                    <span className="relative z-10 text-white font-bold text-sm tracking-[0.2em] uppercase">Add to cart</span>
                 </button>
              </div>

              <div className="absolute top-1/2 right-4 -translate-y-1/2 md:static md:translate-y-0 flex flex-col items-end gap-8 pointer-events-auto">
                 <div className="flex flex-col md:flex-row items-center gap-4">
                    <button onClick={onPrev} onMouseEnter={() => audio.playHover()} className="interactive nav-btn group" aria-label="Previous"><div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></div></button>
                    <button onClick={onNext} onMouseEnter={() => audio.playHover()} className="interactive nav-btn group" aria-label="Next"><div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></div></button>
                 </div>
              </div>
            </div>
          </div>
      </div>

      {/* --- SECTION 2: HIGH-END TECH SPECS --- */}
      <div className="relative w-full h-full min-h-full flex items-center px-6 md:px-20 py-20 pointer-events-none snap-start overflow-hidden">
         <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10"></div>
             <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/5"></div>
             <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white/5"></div>
             <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5"></div>
         </div>

         <div className="w-full h-full relative z-10 pointer-events-auto flex items-center justify-between">
            {/* Left Panel: Stats */}
            <div className="w-full md:w-1/3 flex flex-col justify-center gap-12 pl-2 md:pl-0">
                <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-100">
                    <div className="text-xs font-mono text-[#FF5500] mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF5500]"></span>
                        PERFORMANCE METRICS
                    </div>
                    <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-7xl text-white leading-[0.9] tracking-tight">
                        ELITE<br/>
                        CONTROL
                    </h2>
                </div>
                <div className="space-y-8">
                    <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-200 border-l border-white/20 pl-6">
                        <div className="text-4xl font-bold text-white mb-1">100%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Microfiber Composite</div>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-[250px]">
                            Exclusive coating material providing superior grip management in all weather conditions.
                        </p>
                    </div>
                     <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-300 border-l border-white/20 pl-6">
                        <div className="text-4xl font-bold text-white mb-1">0.5<span className="text-lg text-gray-500">mm</span></div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Pebble Depth</div>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-[250px]">
                            Optimized surface texture for precision handling and rotational feedback.
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Panel */}
            <div className="hidden md:flex w-1/3 flex-col justify-center items-end text-right gap-6 pr-4">
                 <div className="animate-item transition-all duration-1000 opacity-0 -translate-x-10 delay-500 p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-lg max-w-[200px]">
                     <div className="text-[10px] text-gray-400 font-mono mb-2">WEIGHT BALANCE</div>
                     <div className="w-full h-1 bg-gray-700 rounded-full mb-2 overflow-hidden">
                         <div className="w-[95%] h-full bg-white"></div>
                     </div>
                     <div className="flex justify-between text-white font-bold text-sm">
                         <span>95%</span>
                         <span>PERFECT</span>
                     </div>
                 </div>
                 <div className="animate-item transition-all duration-1000 opacity-0 -translate-x-10 delay-700 p-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-lg max-w-[200px]">
                     <div className="text-[10px] text-gray-400 font-mono mb-2">BOUNCE CONSISTENCY</div>
                     <div className="w-full h-1 bg-gray-700 rounded-full mb-2 overflow-hidden">
                         <div className="w-[99%] h-full bg-[#FF5500]"></div>
                     </div>
                     <div className="flex justify-between text-white font-bold text-sm">
                         <span>99%</span>
                         <span>UNIFORM</span>
                     </div>
                 </div>
            </div>
         </div>
      </div>

      {/* --- SECTION 3: AERODYNAMICS --- */}
      <div className="relative w-full h-full min-h-full flex items-center justify-end px-6 md:px-16 py-20 pointer-events-none snap-start overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
             <svg width="100%" height="100%" preserveAspectRatio="none">
                 {[...Array(10)].map((_, i) => (
                    <path key={i} d={`M -100 ${100 + i * 80} C 400 ${100 + i * 80}, 600 ${150 + i * 80}, 2000 ${100 + i * 80}`} fill="none" stroke="white" strokeWidth="1" strokeDasharray="10 5" className="animate-pulse" style={{ animationDuration: `${3 + i}s` }} />
                 ))}
             </svg>
        </div>
        <div className="w-full md:w-5/12 relative z-10 pointer-events-auto text-right">
             <div className="animate-item transition-all duration-1000 opacity-0 translate-x-10 delay-100">
                <div className="inline-block px-3 py-1 border border-white/30 rounded-full text-[10px] font-mono text-white mb-4 tracking-widest">
                    AERODYNAMICS
                </div>
                <h2 className="font-[family-name:var(--font-anton)] text-5xl md:text-8xl text-white mb-6">
                    PERFECT<br/>FLIGHT
                </h2>
             </div>
             <div className="animate-item transition-all duration-1000 opacity-0 translate-x-10 delay-200 flex flex-col items-end gap-6">
                 <div className="flex items-center gap-4 group">
                     <div className="text-right">
                         <div className="text-3xl font-bold font-mono text-white group-hover:text-[#FF5500] transition-colors">0.85</div>
                         <div className="text-[10px] text-gray-400 uppercase">Drag Coefficient</div>
                     </div>
                     <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full"></div>
                     </div>
                 </div>
                 <div className="flex items-center gap-4 group">
                     <div className="text-right">
                         <div className="text-3xl font-bold font-mono text-white group-hover:text-[#FF5500] transition-colors">28.5</div>
                         <div className="text-[10px] text-gray-400 uppercase">Rotational Stability</div>
                     </div>
                     <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full"></div>
                     </div>
                 </div>
             </div>
             <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-400 mt-12 pt-12">
                 <p className="text-gray-400 text-sm leading-relaxed max-w-sm ml-auto">
                     Symmetrically balanced weight distribution ensures true flight path and consistent rotation speed, critical for long-range precision.
                 </p>
             </div>
        </div>
      </div>

      {/* --- SECTION 4: RINGS --- */}
      <div className="relative w-full h-full min-h-full flex items-center justify-center px-8 pointer-events-none snap-start overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-60">
             <svg className="w-full h-full animate-spin [animation-duration:30s]">
                 <circle cx="275" cy="275" r="270" stroke="white" strokeWidth="1" fill="none" strokeDasharray="20 10" opacity="0.3" />
                 <path d="M 275 0 L 275 20 M 275 530 L 275 550 M 0 275 L 20 275 M 530 275 L 550 275" stroke={product.accentColor} strokeWidth="2" />
             </svg>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-80">
             <svg className="w-full h-full animate-spin [animation-duration:20s] [animation-direction:reverse]">
                 <circle cx="200" cy="200" r="198" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
                 <circle cx="200" cy="200" r="190" stroke={product.accentColor} strokeWidth="1" fill="none" strokeDasharray="50 150" opacity="0.6" />
             </svg>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-40">
            <svg className="w-full h-full">
                <line x1="350" y1="350" x2="350" y2="50" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
                <line x1="350" y1="350" x2="650" y2="350" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
                <line x1="350" y1="350" x2="350" y2="650" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
                <line x1="350" y1="350" x2="50" y2="350" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
                <circle cx="350" cy="350" r="100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
                <circle cx="350" cy="350" r="340" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <line key={deg} x1="350" y1="10" x2="350" y2="30" stroke="white" strokeWidth="1" transform={`rotate(${deg} 350 350)`} />
                ))}
            </svg>
         </div>
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 L1,3 Z" fill="white" />
                </marker>
            </defs>
            <g className="animate-item opacity-0 transition-opacity duration-1000 delay-200">
                <path d="M 20% 25% L 35% 25% L 40% 40%" stroke="white" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
                <rect x="19%" y="23%" width="2" height="20" fill="white" />
                <text x="20%" y="22%" fill="white" fontSize="10" fontFamily="monospace">MICRO-TEXTURE</text>
            </g>
            <g className="animate-item opacity-0 transition-opacity duration-1000 delay-500">
                <path d="M 80% 75% L 65% 75% L 60% 60%" stroke="white" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
                <rect x="80%" y="73%" width="2" height="20" fill="white" />
                <text x="75%" y="79%" fill="white" fontSize="10" fontFamily="monospace" textAnchor="end">CHANNEL DEPTH</text>
            </g>
            <text x="90%" y="50%" fill="white" fontSize="9" fontFamily="monospace" textAnchor="end" opacity="0.6" className="animate-pulse">AZIMUTH: 45.2°</text>
            <text x="10%" y="50%" fill="white" fontSize="9" fontFamily="monospace" textAnchor="start" opacity="0.6" className="animate-pulse">ELEVATION: 12.8°</text>
            <rect x="48%" y="90%" width="4%" height="2" fill={product.accentColor} className="animate-pulse" />
         </svg>
         <div className="absolute top-[20%] left-6 md:top-[25%] md:left-[10%] pointer-events-auto animate-item opacity-0 -translate-x-5 transition-all duration-700 delay-100">
             <div className="border-l-2 border-white pl-4">
                <div className="text-3xl text-white font-bold tracking-tighter">1.2mm</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Pebble Height</div>
             </div>
         </div>
         <div className="absolute bottom-[20%] right-6 md:bottom-[25%] md:right-[10%] pointer-events-auto animate-item opacity-0 translate-x-5 transition-all duration-700 delay-300 text-right">
             <div className="border-r-2 border-white pr-4">
                <div className="text-3xl text-white font-bold tracking-tighter">High-Tack</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Coating Spec</div>
             </div>
         </div>
      </div>

      {/* --- SECTION 5: PODIUM --- */}
      <div className="relative w-full h-full min-h-full flex flex-col items-center justify-start pt-16 px-6 pointer-events-none snap-start">
         
         {/* Top Header */}
         <div className="text-center pointer-events-auto z-20 relative -mt-7">
             <div className="inline-flex flex-col items-center">
                 <div className="text-xs font-mono text-gray-400 tracking-[0.5em] mb-2">LIMITED EDITION</div>
                 <h2 className="animate-item transition-all duration-1000 opacity-0 translate-y-[-20px] delay-100 font-[family-name:var(--font-anton)] text-5xl md:text-7xl text-white tracking-[0.1em] drop-shadow-lg">
                     THE CHAMPION
                 </h2>
             </div>
         </div>

         {/* Info Columns */}
         <div className="flex w-full items-start justify-between pointer-events-none px-2 md:px-10 mt-32 max-w-full">
             <div className="flex flex-col items-start text-left pointer-events-auto z-10">
                <div className="animate-item transition-all duration-1000 opacity-0 -translate-x-10 delay-200">
                   <div className="text-xs font-mono text-[#FF5500] mb-2 tracking-widest">RANK 01</div>
                   <h3 className="text-white font-sans font-bold text-2xl mb-1">Elite Tier</h3>
                   <div className="h-[1px] w-20 bg-white/30 my-2"></div>
                   <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                      Constructed for the highest level of competition. 
                   </p>
                </div>
             </div>

             <div className="flex flex-col items-end text-right pointer-events-auto z-10">
                <div className="animate-item transition-all duration-1000 opacity-0 translate-x-10 delay-300">
                   <div className="text-xs font-mono text-[#FF5500] mb-2 tracking-widest">CERTIFIED</div>
                   <h3 className="text-white font-sans font-bold text-2xl mb-1">Gold Standard</h3>
                    <div className="h-[1px] w-20 bg-white/30 my-2 ml-auto"></div>
                   <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                      Meets all regulation weight and size requirements.
                   </p>
                </div>
             </div>
         </div>
      </div>

      {/* --- SECTION 6: FOOTER (Game Time) --- */}
      <div className="relative w-full h-full min-h-full flex flex-col items-center justify-center pb-20 pointer-events-none snap-start overflow-hidden">
         
         <div className="z-20 pointer-events-auto text-center flex flex-col items-center justify-center w-full px-6 max-w-7xl mx-auto">
             
            <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-100 relative w-full">
                <div className="inline-block px-4 py-1 border border-[#FF5500] rounded-full text-[10px] font-mono text-[#FF5500] tracking-widest mb-10 bg-black/50 backdrop-blur-sm">
                    NEXT LEVEL PERFORMANCE
                </div>
                
                <h3 className="flex flex-col items-center justify-center text-[15vw] md:text-[9rem] font-[family-name:var(--font-anton)] uppercase tracking-tight leading-[0.8] mb-8 drop-shadow-2xl">
                    <span className="text-outline text-transparent stroke-white" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>DEFY</span>
                    <span className="text-white font-bold relative flex items-center gap-2">
                        GRAVITY<span className="text-[#FF5500]">.</span>
                    </span>
                </h3>
                
                <div className="flex flex-col md:flex-row items-center justify-between border-y border-white/10 py-8 my-10 gap-6 md:gap-0 bg-black/20 backdrop-blur-sm px-8">
                    {/* Left: Store Info */}
                    <div className="flex gap-8 text-[11px] font-mono tracking-[0.2em] text-gray-400 uppercase">
                        <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#FF5500] rounded-full"></div>OFFICIAL STORE</span>
                        <span className="hidden md:inline text-white/20">|</span>
                        <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#FF5500] rounded-full"></div>GLOBAL SHIPPING</span>
                    </div>

                    {/* Center: Socials */}
                    <div className="flex items-center gap-10 text-white opacity-80 mt-4 md:mt-0">
                        <a href="#" className="interactive hover:text-[#FF5500] transition-colors hover:scale-110 transform duration-200" onMouseEnter={() => audio.playHover()}><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                        <a href="#" className="interactive hover:text-[#FF5500] transition-colors hover:scale-110 transform duration-200" onMouseEnter={() => audio.playHover()}><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                        <a href="#" className="interactive hover:text-[#FF5500] transition-colors hover:scale-110 transform duration-200" onMouseEnter={() => audio.playHover()}><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
                    </div>

                    {/* Right: Payment/Trust */}
                    <div className="flex gap-4 text-[11px] font-mono tracking-[0.2em] text-gray-400 uppercase mt-4 md:mt-0">
                         <span>SECURE CHECKOUT</span>
                    </div>
                </div>
                
                <button 
                    onClick={onAddToCart} 
                    onMouseEnter={() => audio.playHover()}
                    className="interactive group relative overflow-hidden bg-white text-black px-16 py-5 font-bold uppercase tracking-wider hover:bg-[#FF5500] hover:text-white transition-all duration-300 ease-out shadow-lg hover:shadow-[0_0_20px_rgba(255,85,0,0.5)]"
                >
                     <span className="relative z-10">Shop Collection</span>
                </button>
            </div>
            
            <div className="animate-item transition-all duration-1000 opacity-0 translate-y-10 delay-400 absolute bottom-8 left-0 w-full text-center">
                 <p className="text-white/10 text-[10px] tracking-widest uppercase">
                    © 2024 SLAM DUNK STORE. ENGINEERED FOR GREATNESS.
                </p>
            </div>
         </div>
      </div>

      <style>{`
        .in-view {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  );
};