'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Product } from './types';
import { generateBasketballTextures } from './utils/textureGen';

interface FallingBallsProps {
  product: Product;
  active: boolean;
}

export const FallingBalls: React.FC<FallingBallsProps> = ({ product, active }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 11; 
  const { mouse, viewport } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initialize particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const scale = 0.6 + Math.random() * 0.4; // Slightly larger for better visual weight
      temp.push({
        position: new THREE.Vector3(0, 50, 0), // Start hidden high up
        velocity: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        radius: scale * 0.5,
        scale: scale,
        mass: scale * scale * scale,
        active: false,
      });
    }
    return temp;
  }, []);

  const { map, normalMap } = useMemo(() => 
    generateBasketballTextures(product.primaryColor, product.lineColor, product.texturePattern), 
  [product]);

  useEffect(() => {
    if (active) {
        // Immediate drop from top logic
        const width = viewport.width;
        const height = viewport.height;

        particles.forEach(p => {
             // Spawn distributed across the width, just above the visible top edge
             p.position.set(
                 (Math.random() - 0.5) * width * 0.8, 
                 height / 2 + 1.0 + Math.random() * 4.0, // Start just above viewport
                 (Math.random() - 0.5) * 6
             );
             
             // Strong Initial Downward Velocity for instant entry
             p.velocity.set(
                (Math.random() - 0.5) * 5, 
                -20 - Math.random() * 15, // Very fast drop
                (Math.random() - 0.5) * 5
             );
             p.active = true;
        });
    } else {
        // Reset when inactive
        particles.forEach(p => {
             p.position.set(0, 50, 0); 
             p.velocity.set(0, 0, 0);
             p.active = false;
        });
    }
  }, [active, particles, viewport]);

  useFrame((state, delta) => {
    if (!meshRef.current || !active) return;
    
    const floorY = -(state.viewport.height / 2) + 0.5;
    const wallX = state.viewport.width / 2;
    const mouseVec = new THREE.Vector3(mouse.x * state.viewport.width / 2, mouse.y * state.viewport.height / 2, 0);

    // Physics Settings
    const iterations = 8; 
    const dt = Math.min(delta, 0.05) / iterations; 
    const maxVelocity = 40.0; 

    for(let iter=0; iter<iterations; iter++) {
        // 1. Integration & Environment
        particles.forEach(p => {
            if (!p.active) return;

            // Gravity
            p.velocity.y -= 0.6 * dt; 
            
            // Mouse Repel
            const distToMouse = p.position.distanceTo(mouseVec);
            const influenceRadius = 3.0;
            if (distToMouse < influenceRadius) { 
                const forceDir = p.position.clone().sub(mouseVec).normalize();
                const strength = Math.pow(1 - (distToMouse / influenceRadius), 2);
                p.velocity.add(forceDir.multiplyScalar(strength * 40.0 * dt));
            }

            p.velocity.clampLength(0, maxVelocity);
            p.position.add(p.velocity.clone().multiplyScalar(1)); 
            p.velocity.multiplyScalar(0.999); 

            // Floor Collision
            if (p.position.y < floorY + p.radius) {
                p.position.y = floorY + p.radius;
                const bounce = 0.6 + Math.random() * 0.2; 
                p.velocity.y *= -bounce; 
                p.velocity.x *= 0.96; 
                p.velocity.z *= 0.96;
            }

            // Wall Collisions
            if (p.position.x > wallX - p.radius) {
                p.position.x = wallX - p.radius;
                p.velocity.x *= -0.7;
            } else if (p.position.x < -wallX + p.radius) {
                p.position.x = -wallX + p.radius;
                p.velocity.x *= -0.7;
            }
            if (p.position.z > 8) { p.position.z = 8; p.velocity.z *= -0.7; }
            if (p.position.z < -8) { p.position.z = -8; p.velocity.z *= -0.7; }
        });

        // 2. Particle-Particle Collision (Elastic)
        for (let i = 0; i < count; i++) {
            const p1 = particles[i];
            if (!p1.active) continue;

            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j];
                if (!p2.active) continue;

                const dx = p1.position.x - p2.position.x;
                const dy = p1.position.y - p2.position.y;
                const dz = p1.position.z - p2.position.z;
                const distSq = dx*dx + dy*dy + dz*dz;
                const minDist = p1.radius + p2.radius; 

                if (distSq < minDist * minDist) {
                    const dist = Math.sqrt(distSq);
                    if (dist < 0.0001) continue;

                    const normal = new THREE.Vector3(dx/dist, dy/dist, dz/dist);
                    
                    const overlap = minDist - dist;
                    const separation = normal.clone().multiplyScalar(overlap * 0.5);
                    p1.position.add(separation);
                    p2.position.sub(separation);

                    const vRelative = new THREE.Vector3().subVectors(p1.velocity, p2.velocity);
                    const velAlongNormal = vRelative.dot(normal);

                    if (velAlongNormal > 0) continue;

                    const restitution = 0.8; 
                    const j = -(1 + restitution) * velAlongNormal;
                    const invMassSum = (1/p1.mass + 1/p2.mass);
                    const impulseScalar = j / invMassSum;

                    const impulse = normal.multiplyScalar(impulseScalar);
                    
                    p1.velocity.add(impulse.clone().multiplyScalar(1/p1.mass));
                    p2.velocity.sub(impulse.clone().multiplyScalar(1/p2.mass));

                    const tangent = new THREE.Vector3().crossVectors(normal, new THREE.Vector3(0,1,0)).normalize();
                    p1.rotation.add(tangent.multiplyScalar(0.1));
                    p2.rotation.sub(tangent.multiplyScalar(0.1));
                }
            }
        }
    }

    // Render
    particles.forEach((p, i) => {
        if (!p.active) {
            dummy.scale.setScalar(0);
        } else {
            const speed = p.velocity.length();
            if (speed > 0.1) {
                const axis = new THREE.Vector3(p.velocity.z, 0, -p.velocity.x).normalize();
                p.rotation.x += axis.x * speed * 0.03;
                p.rotation.z += axis.z * speed * 0.03;
            }
            dummy.position.copy(p.position);
            dummy.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
            dummy.scale.setScalar(p.scale);
        }
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} visible={active} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        map={map}
        normalMap={normalMap}
        color={product.primaryColor}
        roughness={0.4}
        metalness={0.1}
        envMapIntensity={0.8}
      />
    </instancedMesh>
  );
};