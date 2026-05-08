'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Product } from './types';
import { generateBasketballTextures } from './utils/textureGen';

interface MiniBallProps {
  product: Product;
  visible: boolean;
}

export const MiniBall: React.FC<MiniBallProps> = ({ product, visible }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const { map, normalMap } = useMemo(() => 
    generateBasketballTextures(product.primaryColor, product.lineColor, product.texturePattern), 
  [product]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Animate visibility/position
    const targetScale = visible ? 0.35 : 0;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    
    // Float animation in top-left corner
    // Ensure it is positioned well within the viewport
    const x = -state.viewport.width / 2 + 2.0;
    const y = state.viewport.height / 2 - 2.0;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.1) + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    
    // Spin
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={meshRef} position={[-10, 10, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={map}
        normalMap={normalMap}
        color={product.primaryColor}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};