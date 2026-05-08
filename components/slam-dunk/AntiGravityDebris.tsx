'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Product } from './types';

interface AntiGravityDebrisProps {
  product: Product;
  active: boolean;
}

export const AntiGravityDebris: React.FC<AntiGravityDebrisProps> = ({ product, active }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 50; // Increased count for better density
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorHelper = useMemo(() => new THREE.Color(), []);

  // Initialize particles with full screen vertical spread
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30, 
        (Math.random() - 0.5) * 20, // Spread across entire vertical view (-10 to 10)
        (Math.random() - 0.5) * 12
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02, 
        0.05 + Math.random() * 0.1, // Upward drift speed
        (Math.random() - 0.5) * 0.02
      ),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ),
      baseScale: 0.2 + Math.random() * 0.6,
      currentScale: 0,
      // 30% chance to be accent color
      color: Math.random() > 0.7 ? product.accentColor : '#2a2a2a'
    }));
  }, [product.accentColor]);

  // Update colors when product changes
  useEffect(() => {
    if (meshRef.current) {
        particles.forEach((p, i) => {
            colorHelper.set(p.color);
            meshRef.current!.setColorAt(i, colorHelper);
        });
        meshRef.current.instanceColor!.needsUpdate = true;
    }
  }, [particles, colorHelper, product]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // View bounds approx check
    const topLimit = 12;
    const bottomLimit = -12;

    particles.forEach((p, i) => {
      // Logic: If active, scale up to baseScale. If not, scale down to 0.
      const targetScale = active ? p.baseScale : 0;
      p.currentScale = THREE.MathUtils.lerp(p.currentScale, targetScale, 0.1);

      if (active || p.currentScale > 0.01) {
          // Physics movement
          p.position.add(p.velocity);
          p.rotation.x += p.rotSpeed.x;
          p.rotation.y += p.rotSpeed.y;

          // Wrap around logic
          if (p.position.y > topLimit) {
              p.position.y = bottomLimit;
              p.position.x = (Math.random() - 0.5) * 30; // Randomize X on respawn
          }
      }

      dummy.position.copy(p.position);
      dummy.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
      dummy.scale.setScalar(p.currentScale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#ffffff" 
        roughness={0.7} 
        metalness={0.4} 
        flatShading={true}
      />
    </instancedMesh>
  );
};