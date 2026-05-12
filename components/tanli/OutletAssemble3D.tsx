'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * OutletAssemble3D : version Three.js / React Three Fiber.
 * Géométries primitives + matériaux PBR (metalness/roughness)
 * + lumières HDR Environment. Animation autoplay loop avec
 * mise sous tension verte.
 */

type AssemblyState = {
  /** 0 = exploded, 1 = assembled */
  progress: number;
  /** 0..1 ignition glow */
  ignition: number;
};

const CYCLE_DURATION = 6.2; // sec : assemble + hold + ignition + reset

function useAssemblyClock() {
  const ref = useRef<AssemblyState>({ progress: 0, ignition: 0 });
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (startTime.current === null) startTime.current = clock.elapsedTime;
    const t = (clock.elapsedTime - startTime.current) % CYCLE_DURATION;

    // Phase 1 (0..2.4) : assemble
    let p = 0;
    if (t < 2.4) {
      p = ease(t / 2.4);
    }
    // Phase 2 (2.4..3.0) : hold
    else if (t < 3.0) {
      p = 1;
    }
    // Phase 3 (3.0..4.4) : ignition + hold assembled
    else if (t < 4.4) {
      p = 1;
    }
    // Phase 4 (4.4..5.6) : disassemble back
    else if (t < 5.6) {
      p = 1 - ease((t - 4.4) / 1.2);
    }
    // Phase 5 (5.6..6.2) : pause exploded
    else {
      p = 0;
    }

    // Ignition pulse 3.0..4.4
    let ig = 0;
    if (t >= 3.0 && t < 4.4) {
      const local = (t - 3.0) / 1.4;
      ig = Math.sin(local * Math.PI * 2.5) * 0.5 + 0.5; // pulses
    }

    ref.current.progress = p;
    ref.current.ignition = ig;
  });

  return ref;
}

function ease(t: number) {
  // power2.inOut equivalent
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Each piece exposes: assembled position, exploded offset, geometry.
 * The Z axis is the assembly direction (positive Z = toward camera).
 */

function FacePlate({ state }: { state: React.RefObject<AssemblyState> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current || !state.current) return;
    // Exploded : far back on Z (-3) and slightly left
    // Assembled : Z = 0
    const p = state.current.progress;
    ref.current.position.x = THREE.MathUtils.lerp(-2.5, 0, p);
    ref.current.position.z = THREE.MathUtils.lerp(2.5, 0, p);
    const mat = ref.current.children[0] as THREE.Mesh;
    if (mat?.material) (mat.material as THREE.MeshStandardMaterial).opacity = p < 0.05 ? 0 : 1;
  });

  return (
    <group ref={ref}>
      {/* Body — square plate with rounded edges via box + bevel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.6, 0.08]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.55} roughness={0.45} transparent />
      </mesh>
      {/* 2 round holes (rendered as black cylinders punched through) */}
      <mesh position={[-0.18, 0, 0.045]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
        <meshStandardMaterial color="#000000" metalness={0.2} roughness={0.95} />
      </mesh>
      <mesh position={[0.18, 0, 0.045]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
        <meshStandardMaterial color="#000000" metalness={0.2} roughness={0.95} />
      </mesh>
      {/* Ground pin slot (vertical rect) */}
      <mesh position={[0, 0.32, 0.045]}>
        <boxGeometry args={[0.07, 0.16, 0.1]} />
        <meshStandardMaterial color="#000000" metalness={0.2} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Frame({ state }: { state: React.RefObject<AssemblyState> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current || !state.current) return;
    const p = state.current.progress;
    ref.current.position.x = THREE.MathUtils.lerp(1.5, 0, p);
    ref.current.position.y = THREE.MathUtils.lerp(-0.6, 0, p);
    ref.current.position.z = THREE.MathUtils.lerp(1.4, -0.08, p);
  });

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.4, 0.12]} />
        <meshStandardMaterial color="#171717" metalness={0.4} roughness={0.55} />
      </mesh>
      {/* Inner cavity */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.05, 0.55, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Mechanism({ state }: { state: React.RefObject<AssemblyState> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current || !state.current) return;
    const p = state.current.progress;
    ref.current.position.x = THREE.MathUtils.lerp(-1.6, 0, p);
    ref.current.position.y = THREE.MathUtils.lerp(0.6, 0, p);
    ref.current.position.z = THREE.MathUtils.lerp(0.5, -0.18, p);
  });

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.55, 0.1]} />
        <meshStandardMaterial color="#9a9a9a" metalness={0.92} roughness={0.4} />
      </mesh>
      {/* 2 small allen detail holes */}
      <mesh position={[-0.4, 0.18, 0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.05, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.4, -0.18, 0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.05, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function Contact({ side, state }: { side: 'left' | 'right'; state: React.RefObject<AssemblyState> }) {
  const ref = useRef<THREE.Group>(null);
  const xAssembled = side === 'left' ? -0.18 : 0.18;
  const xExploded = side === 'left' ? 1.4 : 1.4;
  const yExploded = side === 'left' ? -0.7 : 0.7;
  const ignitionRef = useRef(0);

  useFrame(() => {
    if (!ref.current || !state.current) return;
    const p = state.current.progress;
    ref.current.position.x = THREE.MathUtils.lerp(xExploded, xAssembled, p);
    ref.current.position.y = THREE.MathUtils.lerp(yExploded, 0, p);
    ref.current.position.z = THREE.MathUtils.lerp(0.3, -0.25, p);
    ignitionRef.current = state.current.ignition;
    // Update emissive based on ignition
    const mesh = ref.current.children[0] as THREE.Mesh;
    if (mesh?.material) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(0x03e840);
      mat.emissiveIntensity = ignitionRef.current * 1.2;
    }
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.06, 0.16, 0.04]} />
        <meshStandardMaterial color="#C8923C" metalness={0.95} roughness={0.25} />
      </mesh>
    </group>
  );
}

function GroundPin({ state }: { state: React.RefObject<AssemblyState> }) {
  const ref = useRef<THREE.Group>(null);
  const ignitionRef = useRef(0);

  useFrame(() => {
    if (!ref.current || !state.current) return;
    const p = state.current.progress;
    ref.current.position.y = THREE.MathUtils.lerp(1.8, 0.32, p);
    ref.current.position.z = THREE.MathUtils.lerp(0.4, -0.1, p);
    ignitionRef.current = state.current.ignition;
    const mesh = ref.current.children[0] as THREE.Mesh;
    if (mesh?.material) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(0x03e840);
      mat.emissiveIntensity = ignitionRef.current * 0.9;
    }
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.16, 16]} />
        <meshStandardMaterial color="#a8a8a8" metalness={0.95} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Wires({ state }: { state: React.RefObject<AssemblyState> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!ref.current || !state.current) return;
    const p = state.current.progress;
    ref.current.position.x = THREE.MathUtils.lerp(2.5, 0, p);
    ref.current.position.z = THREE.MathUtils.lerp(0.6, -0.4, p);
  });

  return (
    <group ref={ref}>
      {[-0.12, 0, 0.12].map((x, i) => (
        <mesh key={i} position={[x, -0.7, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 12]} />
          <meshStandardMaterial color="#C8923C" metalness={0.9} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function GreenGlow({ state }: { state: React.RefObject<AssemblyState> }) {
  const left = useRef<THREE.PointLight>(null);
  const right = useRef<THREE.PointLight>(null);
  const top = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!state.current) return;
    const intensity = state.current.ignition * 4;
    if (left.current) left.current.intensity = intensity;
    if (right.current) right.current.intensity = intensity;
    if (top.current) top.current.intensity = intensity * 0.7;
  });

  return (
    <>
      <pointLight ref={left} position={[-0.18, 0, 0.1]} color="#03E840" intensity={0} distance={1.2} decay={2} />
      <pointLight ref={right} position={[0.18, 0, 0.1]} color="#03E840" intensity={0} distance={1.2} decay={2} />
      <pointLight ref={top} position={[0, 0.32, 0.1]} color="#03E840" intensity={0} distance={1} decay={2} />
    </>
  );
}

function Scene() {
  const state = useAssemblyClock();

  return (
    <>
      {/* HDR environment for realistic metal reflections */}
      <Environment preset="studio" environmentIntensity={0.5} />

      {/* Key light from above-left */}
      <directionalLight position={[3, 4, 3]} intensity={2.4} castShadow />
      {/* Fill from below-right */}
      <directionalLight position={[-2, -1, 2]} intensity={0.6} color="#88a4ff" />
      {/* Ambient */}
      <ambientLight intensity={0.25} />

      {/* Group rotated slightly for 3/4 perspective vibes */}
      <group rotation={[0, -0.45, 0]} position={[-0.2, 0, 0]}>
        <Wires state={state} />
        <Mechanism state={state} />
        <Contact side="left" state={state} />
        <Contact side="right" state={state} />
        <GroundPin state={state} />
        <Frame state={state} />
        <FacePlate state={state} />
        <GreenGlow state={state} />
      </group>
    </>
  );
}

export function OutletAssemble3D({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
