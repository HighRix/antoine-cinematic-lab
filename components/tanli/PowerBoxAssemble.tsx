'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const MODEL_URL = '/tanli/power-box/power_box_01_4k.gltf';

const CYCLE_DURATION = 7.0; // sec : cable pulse + door open + ignition + close + pause

/**
 * Single source of truth for the animation cycle.
 * Both the door and the cable pulse derive their phase from this.
 */
function getCycleTime(elapsedTime: number) {
  return elapsedTime % CYCLE_DURATION;
}

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/* ────────────────────────────────────────────────────────────── */

function PowerBoxModel() {
  const { scene } = useGLTF(MODEL_URL);
  const doorRef = useRef<THREE.Object3D | null>(null);
  const greenLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    scene.traverse((node) => {
      if (node.name === 'power_box_01_door') {
        doorRef.current = node;
        // Initial state = fully closed (-180°, door flush against box).
        node.rotation.y = -Math.PI;
      }
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    const t = getCycleTime(clock.elapsedTime);

    let openAmount = 0;
    let glow = 0;

    if (t < 1.4) {
      openAmount = ease(t / 1.4);
    } else if (t < 4.4) {
      openAmount = 1;
      const local = (t - 1.4) / 3.0;
      glow = Math.sin(local * Math.PI * 3) * 0.5 + 0.5;
    } else if (t < 5.6) {
      openAmount = 1 - ease((t - 4.4) / 1.2);
    } else {
      openAmount = 0;
    }

    if (doorRef.current) {
      // Closed = -180° (flush). Open = -90° (perpendicular to box).
      // Lerp from closed (openAmount=0) to open (openAmount=1).
      doorRef.current.rotation.y = -Math.PI + (Math.PI / 2) * openAmount;
    }
    if (greenLightRef.current) {
      greenLightRef.current.intensity = glow * 4.5;
    }
  });

  return (
    <group>
      <primitive object={scene} />
      <pointLight
        ref={greenLightRef}
        position={[0, 0, -0.05]}
        color="#03E840"
        intensity={0}
        distance={1.6}
        decay={1.8}
      />
    </group>
  );
}

/* ────────────────────────────────────────────────────────────── */

/**
 * PowerCable : a thick black power cable that runs from off-screen
 * (right) to the bottom of the electrical box. A bright green pulse
 * travels along it during phase 1 (0..1.4s), staying at the end
 * during the open/ignition phase to "feed" the box.
 */
function PowerCable() {
  // Cable curve : sag from off-screen right, then approaches the box VERTICALLY
  // from below. The last 3 control points share the same X and Z so the tangent
  // at the end is strictly (0, +1, 0) — gland aligns flush with the box's bottom face.
  const curve = useMemo(() => {
    const endX = 0.05;
    const endZ = 0.02;
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.4, -0.50, 0.35),     // off-screen right
      new THREE.Vector3(1.7, -0.78, 0.25),     // gravity sag starts
      new THREE.Vector3(1.0, -0.90, 0.12),     // lowest sag point
      new THREE.Vector3(0.5, -0.75, 0.06),     // rising back toward box
      new THREE.Vector3(0.18, -0.55, endZ),    // turning vertical
      new THREE.Vector3(endX, -0.46, endZ),    // straight column begins
      new THREE.Vector3(endX, -0.38, endZ),    // mid vertical
      new THREE.Vector3(endX, -0.32, endZ),    // ENDS flush against the box bottom
    ], false, 'catmullrom', 0.5);
  }, []);

  // Gland sits at the very end of the cable (curve.getPoint(1)) which is
  // positioned just below the box bottom. The gland's hex nut points UP
  // (along the cable's upward tangent) toward the box surface, looking like
  // the cable is screwed into the bottom of the box.
  const glandData = useMemo(() => {
    const endPoint = curve.getPoint(1);
    const tangent = curve.getTangent(1);
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, tangent.clone().normalize());
    return { endPoint, quat };
  }, [curve]);

  const pulseMesh = useRef<THREE.Mesh>(null);
  const pulseLight = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = getCycleTime(clock.elapsedTime);

    let progress = 0;
    let visible = true;
    let lightIntensity = 0;

    if (t < 1.4) {
      progress = ease(t / 1.4);
      lightIntensity = 2.8;
    } else if (t < 4.4) {
      progress = 1;
      const local = (t - 1.4) / 3.0;
      lightIntensity = 1.8 + Math.sin(local * Math.PI * 3) * 0.9;
    } else if (t < 5.6) {
      progress = 1 - ease((t - 4.4) / 1.2);
      lightIntensity = 1.5;
    } else {
      visible = false;
      lightIntensity = 0;
    }

    if (pulseMesh.current && pulseLight.current) {
      const point = curve.getPoint(progress);
      pulseMesh.current.position.copy(point);
      pulseLight.current.position.copy(point);
      pulseMesh.current.visible = visible;
      pulseLight.current.intensity = lightIntensity;
    }
  });

  // Geometries built once
  const innerTube = useMemo(
    () => new THREE.TubeGeometry(curve, 120, 0.024, 20, false),
    [curve]
  );
  // Slightly thicker outer "ribbed" sheath layer for depth illusion
  const outerTube = useMemo(
    () => new THREE.TubeGeometry(curve, 120, 0.028, 20, false),
    [curve]
  );

  return (
    <>
      {/* Outer sheath — slightly larger, very dark and matte (PVC outer jacket) */}
      <mesh geometry={outerTube} castShadow receiveShadow>
        <meshStandardMaterial
          color="#080808"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>

      {/* Inner tube — slight gloss highlight catches the light (texture variation) */}
      <mesh geometry={innerTube} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.55}
          metalness={0.15}
          opacity={0.65}
          transparent
        />
      </mesh>

      {/* Cable gland — brushed steel fitting where cable enters the box */}
      <group position={glandData.endPoint} quaternion={glandData.quat}>
        {/* Main gland body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 24]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.35} metalness={0.92} />
        </mesh>
        {/* Hex nut detail (slightly larger, ribbed) */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.058, 0.058, 0.025, 6]} />
          <meshStandardMaterial color="#3d3d3d" roughness={0.3} metalness={0.95} />
        </mesh>
        {/* Strain relief ring (subtle ridge near the cable side) */}
        <mesh castShadow position={[0, -0.045, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.012, 16]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.6} />
        </mesh>
      </group>

      {/* Pulse : bright green emissive sphere, non-tone-mapped for max brightness */}
      <mesh ref={pulseMesh} visible={false}>
        <sphereGeometry args={[0.048, 24, 24]} />
        <meshBasicMaterial color="#03E840" toneMapped={false} />
      </mesh>

      {/* Halo light following the pulse */}
      <pointLight
        ref={pulseLight}
        color="#03E840"
        intensity={0}
        distance={0.8}
        decay={1.6}
      />
    </>
  );
}

/* preload model so first paint is fast */
useGLTF.preload(MODEL_URL);

/* ────────────────────────────────────────────────────────────── */

function Scene() {
  return (
    <>
      <Environment preset="studio" environmentIntensity={0.55} />
      <directionalLight position={[3, 4, 3]} intensity={2.4} castShadow />
      <directionalLight position={[-2, -1, 2]} intensity={0.5} color="#88a4ff" />
      <ambientLight intensity={0.3} />
      {/* No initial rotation — camera + OrbitControls handle the view angle */}
      <group>
        <PowerBoxModel />
        <PowerCable />
      </group>
    </>
  );
}

export function PowerBoxAssemble({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
    >
      <Canvas
        // Camera positioned for a slight 3/4 frontal view (closer to face-on than before)
        camera={{ position: [0.45, 0.25, 1.7], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', touchAction: 'none' }}
      >
        <Suspense fallback={null}>
          <Scene />
          {/* Mouse rotation: drag to rotate, no zoom, no pan, smooth damping,
              limited polar so user can't flip upside down */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.6}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI * 2 / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
