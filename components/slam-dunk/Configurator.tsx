'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, SpotLight, Environment } from '@react-three/drei';
import { Basketball } from './Basketball';
import { Product } from './types';
import { audio } from './utils/audio';

interface ConfiguratorProps {
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct: Product;
}

const COLORS = ['#C25E00', '#004d25', '#0077b6', '#6a040f', '#ff0080', '#1a1a1a', '#ffffff'];
const LINE_COLORS = ['#1a1a1a', '#ffffff', '#ffba08', '#aaffaa', '#00C2FF'];
const PATTERNS = ['classic', 'street', 'tech', 'cross'] as const;

export const Configurator: React.FC<ConfiguratorProps> = ({ onClose, onSave, initialProduct }) => {
  const [configProduct, setConfigProduct] = useState<Product>({ ...initialProduct });
  
  // AI Lab State
  const [promptInput, setPromptInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');

  const accentColor = configProduct.accentColor || '#FF5500';

  const handleColorChange = (color: string) => {
      // Heuristic for accent color when picking manually
      let newAccent = color;
      if (color === '#1a1a1a') newAccent = '#ffffff';
      if (color === '#ffffff') newAccent = '#000000';
      if (color === '#004d25') newAccent = '#00ff41'; // Forest green -> Neon Green
      if (color === '#0077b6') newAccent = '#00C2FF'; // Blue -> Cyan
      if (color === '#6a040f') newAccent = '#ffba08'; // Deep Red -> Gold
      
      setConfigProduct(prev => ({ 
          ...prev, 
          primaryColor: color,
          accentColor: newAccent // Update accent so UI matches
      }));
      audio.playClick();
  };

  const handleLineColorChange = (color: string) => {
      setConfigProduct(prev => ({ ...prev, lineColor: color }));
      audio.playClick();
  };

  const handlePatternChange = (pattern: any) => {
      setConfigProduct(prev => ({ ...prev, texturePattern: pattern }));
      audio.playClick();
  };
  
  // AI Lab via Next.js API route — fallback gracieux si pas de clé Gemini configurée
  const handleAiGenerate = async () => {
    if (!promptInput.trim()) return;
    setIsAiLoading(true);
    setAiExplanation('');
    audio.playClick();

    try {
      const res = await fetch('/api/slam-dunk-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptInput }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'API error' }));
        throw new Error(error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setConfigProduct(prev => ({
        ...prev,
        primaryColor: data.primaryColor,
        lineColor: data.lineColor,
        accentColor: data.accentColor,
        texturePattern: data.texturePattern,
      }));
      setAiExplanation(data.explanation);
      audio.playSuccess();
    } catch (error: any) {
      console.error('AI Generation failed', error);
      setAiExplanation(
        error?.message?.includes('GEMINI')
          ? 'Set GEMINI_API_KEY in .env.local to enable AI Lab.'
          : 'Connection error. Try again.'
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    onSave(configProduct);
    audio.playSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col md:flex-row animate-in fade-in duration-500">
        
        {/* 3D View - Desktop Right, Mobile Top */}
        <div className="w-full md:w-2/3 h-[40vh] md:h-full relative order-1 md:order-2 cursor-move interactive bg-[#050505]">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 40, position: [0, 0, 4.5] }}>
                {/* Simple Background Color */}
                <color attach="background" args={['#050505']} />
                
                <Suspense fallback={null}>
                    {/* Lighting setup matches Hero Scene EXACTLY (Fixed Studio) */}
                    <ambientLight intensity={0.4} />
                    <SpotLight 
                        position={[-5, 10, 5]} 
                        angle={0.3} 
                        penumbra={1} 
                        intensity={2} 
                        castShadow 
                        shadow-bias={-0.0001} 
                        color="#ffffff" 
                    />
                    <spotLight 
                        position={[5, 0, -5]} 
                        angle={0.5} 
                        penumbra={1} 
                        intensity={5} 
                        color={configProduct.accentColor} 
                    />
                    <pointLight position={[-5, 0, 5]} intensity={0.8} color="#4a5568" />
                    <Environment preset="studio" />

                    <Basketball product={configProduct} isConfigurator={true} />
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={2} target={[0, 0, 0]} />
                </Suspense>
            </Canvas>
            
            {/* Overlay Title */}
            <div className="absolute top-8 right-8 pointer-events-none text-right z-10">
                <h1 className="text-white/20 font-[family-name:var(--font-anton)] text-4xl md:text-8xl tracking-widest uppercase">Custom</h1>
                <p className="text-white/30 font-mono text-xs md:text-sm tracking-[0.5em] uppercase -mt-2">Lab Edition</p>
            </div>
        </div>

        {/* Controls Panel - Desktop Left, Mobile Bottom */}
        <div className="w-full md:w-1/3 h-[60vh] md:h-full bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-white/10 flex flex-col order-2 md:order-1 relative z-20 shadow-2xl">
            
            {/* Header (Fixed) */}
            <div className="p-6 md:p-8 pb-4 border-b border-white/5 flex items-center justify-between">
                 <button 
                    onClick={() => { audio.playClick(); onClose(); }}
                    className="text-gray-500 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest interactive"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Shop
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                
                <div>
                    <h2 className="text-white font-[family-name:var(--font-anton)] text-3xl md:text-4xl mb-1">DESIGN YOUR<br/>LEGACY</h2>
                    <p className="text-gray-400 text-sm">Create a ball that matches your game.</p>
                </div>

                {/* Colors */}
                <div>
                    <label className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-3 block">Base Color</label>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => handleColorChange(color)}
                                className={`w-10 h-10 rounded-full border-2 transition-all interactive ${configProduct.primaryColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Line Colors */}
                <div>
                    <label className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-3 block">Line Color</label>
                    <div className="flex flex-wrap gap-3">
                        {LINE_COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => handleLineColorChange(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all interactive ${configProduct.lineColor === color ? 'border-white scale-110' : 'border-white/10 hover:scale-105'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Patterns */}
                <div>
                    <label className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-3 block">Grip Texture</label>
                    <div className="grid grid-cols-2 gap-3">
                        {PATTERNS.map(pattern => (
                            <button
                                key={pattern}
                                onClick={() => handlePatternChange(pattern)}
                                className={`px-4 py-3 rounded text-xs font-bold uppercase transition-all interactive border ${configProduct.texturePattern === pattern ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}`}
                            >
                                {pattern}
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Texture Lab */}
                <div 
                    className="p-4 border bg-white/5 rounded-lg relative overflow-hidden group transition-colors duration-500"
                    style={{ borderColor: `${accentColor}40` }}
                >
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" style={{ color: accentColor }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                    </div>
                    <label 
                        className="text-xs font-mono uppercase tracking-widest mb-3 block flex items-center gap-2 transition-colors duration-500"
                        style={{ color: accentColor }}
                    >
                        AI Texture Lab
                    </label>
                    
                    <textarea 
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder='Describe a vibe (e.g. "Cyberpunk neon tiger" or "90s Miami Vice")'
                        className="w-full bg-black/50 border border-white/20 rounded p-3 text-xs text-white placeholder-gray-600 outline-none resize-none h-24 mb-3 transition-colors duration-300"
                        style={{ 
                            // Using a subtle border color transition via style
                            borderColor: promptInput ? accentColor : 'rgba(255,255,255,0.2)' 
                        }}
                    />
                    
                    <button 
                        onClick={handleAiGenerate}
                        disabled={isAiLoading || !promptInput.trim()}
                        className="w-full bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest py-3 rounded transition-colors disabled:opacity-50 interactive flex items-center justify-center gap-2"
                    >
                        {isAiLoading ? (
                            <>
                                <span 
                                    className="w-2 h-2 border-2 rounded-full animate-spin"
                                    style={{ borderColor: `${accentColor} transparent ${accentColor} transparent` }}
                                ></span>
                                Generating...
                            </>
                        ) : (
                            "Generate Design"
                        )}
                    </button>
                    
                    {aiExplanation && (
                        <div 
                            className="mt-3 text-[10px] text-gray-400 italic border-l-2 pl-2 animate-in fade-in slide-in-from-bottom-2 transition-colors duration-500"
                            style={{ borderColor: accentColor }}
                        >
                            "{aiExplanation}"
                        </div>
                    )}
                </div>
            </div>

            {/* Footer (Fixed) */}
            <div className="p-6 md:p-8 border-t border-white/10 bg-[#0a0a0a] z-30">
                 <button 
                    onClick={handleSave}
                    className="w-full py-4 font-bold uppercase tracking-widest text-white hover:text-white transition-all duration-300 interactive shadow-[0_0_20px_rgba(255,85,0,0.5)] hover:brightness-110"
                    style={{ backgroundColor: accentColor }}
                 >
                     Add to Collection
                 </button>
            </div>
        </div>
    </div>
  );
};