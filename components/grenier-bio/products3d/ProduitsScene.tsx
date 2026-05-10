'use client';

import { Suspense, type RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { GrainJourney } from './GrainJourney';

type ProduitsSceneProps = {
  scrollContainer: RefObject<HTMLDivElement | null>;
};

/**
 * Scène 3D photoréaliste — pas de postprocessing fragile.
 * Le rendu cinematique vient de :
 *   - HDR environment "sunset" intensity 1.0 (reflections riches)
 *   - 3-point lighting pro (key warm + fill cool + rim warm)
 *   - Tone mapping ACES Filmic au niveau Canvas
 *   - Materials PBR avancés (transmission, ior, clearcoat, sheen, attenuation)
 *   - LatheGeometry pour les silhouettes organiques (grain, bouteille, bocal, œuf)
 */
export function ProduitsScene({ scrollContainer }: ProduitsSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows="soft"
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 6.5], fov: 32 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <GrainJourney scrollContainer={scrollContainer} />

          {/* Soft contact shadow for grounding */}
          <ContactShadows
            position={[0, -1.54, 0]}
            opacity={0.55}
            scale={8}
            blur={2.6}
            far={4}
            resolution={1024}
            color="#3a2618"
          />

          {/* HDR environment — cinematic sunset reflections */}
          <Environment preset="sunset" background={false} environmentIntensity={1.0} />
        </Suspense>
      </Canvas>

      {/* Cinematic vignette overlay (CSS, fiable, pas de bug postprocessing) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(45, 30, 15, 0.4) 100%)',
        }}
      />

      {/* Subtle warm color overlay for cohesion */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, rgba(255, 216, 155, 0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
