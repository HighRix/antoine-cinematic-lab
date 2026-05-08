'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Scene } from './Scene';
import { HeroUI } from './HeroUI';
import { Product } from './types';
import { CustomCursor } from './CustomCursor';
import { Configurator } from './Configurator';
import { CartSidebar } from './CartSidebar';
import { audio } from './utils/audio';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    namePart1: 'SPA',
    namePart2: 'ING',
    price: 34.99,
    primaryColor: '#C25E00',
    lineColor: '#1a1a1a',
    accentColor: '#FF5500',
    texturePattern: 'classic',
  },
  {
    id: 2,
    namePart1: 'VER',
    namePart2: 'TEX',
    price: 49.99,
    primaryColor: '#004d25',
    lineColor: '#aaffaa',
    accentColor: '#00ff41',
    texturePattern: 'street',
  },
  {
    id: 3,
    namePart1: 'NEB',
    namePart2: 'ULA',
    price: 59.99,
    primaryColor: '#0077b6',
    lineColor: '#FFFFFF',
    accentColor: '#00C2FF',
    texturePattern: 'tech',
  },
  {
    id: 4,
    namePart1: 'INF',
    namePart2: 'ERNO',
    price: 64.99,
    primaryColor: '#6a040f',
    lineColor: '#ffba08',
    accentColor: '#d00000',
    texturePattern: 'street',
  },
  {
    id: 5,
    namePart1: 'STE',
    namePart2: 'ALTH',
    price: 79.99,
    primaryColor: '#ff0080',
    lineColor: '#111111',
    accentColor: '#ff0080',
    texturePattern: 'cross',
  },
];

export default function SlamDunkApp() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartTriggerTime, setCartTriggerTime] = useState(0);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);

  // Initialize Audio on first click anywhere
  useEffect(() => {
    const initAudio = () => {
      audio.init();
      window.removeEventListener('click', initAudio);
    };
    window.addEventListener('click', initAudio);
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    audio.playClick();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    audio.playClick();
  };

  const handleAddToCart = () => {
    setCartTriggerTime(Date.now());
    setTimeout(() => {
      setCartItems((prev) => [...prev, products[currentIndex]]);
      audio.playSuccess();
    }, 800);
  };

  const handleSaveConfiguration = (newProduct: Product) => {
    const customProduct = {
      ...newProduct,
      id: Date.now(),
      namePart1: 'CUS',
      namePart2: 'TOM',
    };
    setProducts((prev) => [...prev, customProduct]);
    setCurrentIndex(products.length);
  };

  const currentProduct = products[currentIndex];

  const getBgColor = (product: Product) => {
    if (product.id === 1) return '#FF5500';
    if (product.id === 2) return '#004d25';
    if (product.id === 3) return '#003f5c';
    if (product.id === 4) return '#6a040f';
    if (product.id === 5) return '#9d174d';
    return product.primaryColor;
  };

  return (
    <>
      <CustomCursor />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(index) =>
          setCartItems((prev) => prev.filter((_, i) => i !== index))
        }
      />

      {isConfiguratorOpen && (
        <Configurator
          onClose={() => setIsConfiguratorOpen(false)}
          onSave={handleSaveConfiguration}
          initialProduct={currentProduct}
        />
      )}

      <div
        ref={appRef}
        id="app-root"
        className="slam-dunk-root relative w-full h-screen flex items-center justify-center overflow-hidden p-0 md:p-8 select-none"
        style={{
          backgroundColor: getBgColor(currentProduct),
          transition: 'background-color 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Container */}
        <div className="relative w-full h-full md:max-w-[1600px] md:max-h-[900px] bg-[#050505] md:rounded-[2.5rem] shadow-2xl flex flex-col border-0 md:border border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-black to-black opacity-80 pointer-events-none z-0"></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20 pointer-events-none z-0"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.05) 50px)',
              transform: 'perspective(500px) rotateX(60deg) scale(2)',
              transformOrigin: 'bottom center',
              maskImage: 'linear-gradient(to top, black, transparent)',
            }}
          ></div>

          {/* 1. UI Layer */}
          <HeroUI
            product={currentProduct}
            onNext={nextSlide}
            onPrev={prevSlide}
            scrollRef={scrollRef}
            cartCount={cartItems.length}
            onAddToCart={handleAddToCart}
            onCustomize={() => {
              audio.playClick();
              setIsConfiguratorOpen(true);
            }}
            onOpenCart={() => {
              audio.playClick();
              setIsCartOpen(true);
            }}
          />

          {/* 2. Scene Layer */}
          <div className="absolute inset-0 w-full h-full z-40 pointer-events-none">
            <Scene
              currentProduct={currentProduct}
              scrollContainer={scrollRef}
              eventSource={appRef}
              addToCartTrigger={cartTriggerTime}
            />
          </div>

          <div className="absolute bottom-6 left-8 text-white/30 text-xs font-bold z-50 pointer-events-none hidden md:block">
            CL
          </div>
        </div>
      </div>
    </>
  );
}
