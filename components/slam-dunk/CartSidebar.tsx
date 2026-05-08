'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Product } from './types';
import { audio } from './utils/audio';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (index: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    // Prevent animation on initial mount if closed
    if (!hasOpened && !isOpen) return;
    
    if (isOpen) {
      setHasOpened(true);
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, pointerEvents: 'auto' });
      gsap.fromTo(sidebarRef.current, 
        { x: '100%' },
        { x: '0%', duration: 0.6, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, pointerEvents: 'none' });
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
    }
  }, [isOpen, hasOpened]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={onClose}
      />
      
      {/* Sidebar - translate-x-full ensures it starts off-screen */}
      <div 
        ref={sidebarRef}
        className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-[#080808] border-l border-white/10 shadow-2xl flex flex-col pointer-events-auto translate-x-full"
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-anton)] text-3xl text-white tracking-wide">YOUR CART ({cartItems.length})</h2>
            <button 
                onClick={onClose}
                onMouseEnter={() => audio.playHover()}
                className="text-gray-400 hover:text-white transition-colors interactive p-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>
                    <p className="text-sm uppercase tracking-widest">Your cart is empty</p>
                </div>
            ) : (
                cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5 animate-in slide-in-from-right-4 fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                         <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-md flex items-center justify-center shrink-0">
                             <div className="w-12 h-12 rounded-full" style={{ backgroundColor: item.primaryColor, border: `2px solid ${item.lineColor}` }}></div>
                         </div>
                         <div className="flex-1 flex flex-col justify-between">
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h3 className="text-white font-bold tracking-wider">{item.namePart1}{item.namePart2}</h3>
                                     <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{item.texturePattern} Edition</p>
                                 </div>
                                 <button onClick={() => onRemoveItem(index)} className="text-gray-500 hover:text-red-500 interactive transition-colors">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                     </svg>
                                 </button>
                             </div>
                             <div className="flex justify-between items-end">
                                 <div className="text-[#FF5500] text-sm font-mono">{item.primaryColor}</div>
                                 <div className="text-white font-mono">${item.price.toFixed(2)}</div>
                             </div>
                         </div>
                    </div>
                ))
            )}
        </div>

        {cartItems.length > 0 && (
            <div className="p-8 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 text-sm uppercase tracking-widest">Subtotal</span>
                    <span className="text-white text-2xl font-[family-name:var(--font-anton)] tracking-wide">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-[0.2em] hover:bg-[#FF5500] hover:text-white transition-all duration-300 interactive shadow-lg">
                    Checkout
                </button>
                <p className="text-center text-xs text-gray-600 mt-4 uppercase tracking-widest">Free shipping worldwide</p>
            </div>
        )}
      </div>
    </div>
  );
};