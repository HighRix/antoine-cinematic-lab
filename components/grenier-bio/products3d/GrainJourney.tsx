'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { RefObject } from 'react';

type GrainJourneyProps = {
  scrollContainer: RefObject<HTMLDivElement | null>;
};

/**
 * Le grain qui voyage — version photoréaliste.
 * Geometry primitives + LatheGeometry pour silhouettes organiques.
 * Materials PBR avancés (transmission, clearcoat, sheen, ior, attenuation).
 */
export function GrainJourney({ scrollContainer }: GrainJourneyProps) {
  const groupRef = useRef<THREE.Group>(null);

  const seedRef = useRef<THREE.Group>(null);
  const sproutRef = useRef<THREE.Group>(null);
  const earRef = useRef<THREE.Group>(null);
  const harvestRef = useRef<THREE.Group>(null);
  const jarRef = useRef<THREE.Group>(null);
  const finalRef = useRef<THREE.Group>(null);

  // === SHARED GEOMETRIES (computed once) ===

  // Realistic wheat grain : LatheGeometry from a half-silhouette profile
  const wheatGrainGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    // Profile: tear-drop shape, fatter in the middle, pointed germ end at top
    points.push(new THREE.Vector2(0, -0.5));
    points.push(new THREE.Vector2(0.18, -0.45));
    points.push(new THREE.Vector2(0.32, -0.32));
    points.push(new THREE.Vector2(0.4, -0.15));
    points.push(new THREE.Vector2(0.42, 0.05));
    points.push(new THREE.Vector2(0.38, 0.22));
    points.push(new THREE.Vector2(0.28, 0.38));
    points.push(new THREE.Vector2(0.14, 0.48));
    points.push(new THREE.Vector2(0, 0.5));
    return new THREE.LatheGeometry(points, 24);
  }, []);

  // Realistic egg : ovoid asymmetric (fatter at bottom, pointier at top)
  const eggGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -0.55));
    points.push(new THREE.Vector2(0.22, -0.5));
    points.push(new THREE.Vector2(0.38, -0.35));
    points.push(new THREE.Vector2(0.46, -0.15));
    points.push(new THREE.Vector2(0.48, 0.05));
    points.push(new THREE.Vector2(0.44, 0.25));
    points.push(new THREE.Vector2(0.34, 0.42));
    points.push(new THREE.Vector2(0.2, 0.52));
    points.push(new THREE.Vector2(0, 0.55));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // Wine-bottle-shaped oil bottle (Bordeaux style)
  const oilBottleGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -0.6));
    points.push(new THREE.Vector2(0.32, -0.6));
    points.push(new THREE.Vector2(0.34, -0.55));
    points.push(new THREE.Vector2(0.34, 0.1));
    points.push(new THREE.Vector2(0.34, 0.32));
    points.push(new THREE.Vector2(0.28, 0.48));
    points.push(new THREE.Vector2(0.16, 0.55));
    points.push(new THREE.Vector2(0.13, 0.62));
    points.push(new THREE.Vector2(0.13, 0.75));
    points.push(new THREE.Vector2(0.1, 0.78));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // Mason-jar-shaped flour container
  const flourJarGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -0.6));
    points.push(new THREE.Vector2(0.4, -0.6));
    points.push(new THREE.Vector2(0.42, -0.55));
    points.push(new THREE.Vector2(0.42, 0.4));
    points.push(new THREE.Vector2(0.4, 0.5));
    points.push(new THREE.Vector2(0.36, 0.55));
    points.push(new THREE.Vector2(0.36, 0.62));
    points.push(new THREE.Vector2(0.38, 0.65));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // === FALLING GRAINS DATA ===
  const grainsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const GRAIN_COUNT = 120;
  const grainData = useMemo(
    () =>
      Array.from({ length: GRAIN_COUNT }, () => ({
        x: (Math.random() - 0.5) * 1.6,
        y: 1.8 + Math.random() * 2.4,
        z: (Math.random() - 0.5) * 0.9,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        scale: 0.85 + Math.random() * 0.35,
        delay: Math.random() * 0.55,
        spinSpeed: 0.6 + Math.random() * 1.4,
      })),
    []
  );

  const fillRef = useRef<THREE.Mesh>(null);
  const oilLevelRef = useRef<THREE.Mesh>(null);

  // Wheat color variations for natural ear look
  const wheatColors = useMemo(
    () => ['#D4A574', '#C89460', '#DEB07F', '#BC8852', '#E0B585', '#C9985E'],
    []
  );

  useFrame((state) => {
    const scroller = scrollContainer.current;
    if (!groupRef.current || !scroller) return;

    const rect = scroller.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    const acts = [
      { start: 0, end: 0.17, ref: seedRef },
      { start: 0.17, end: 0.33, ref: sproutRef },
      { start: 0.33, end: 0.5, ref: earRef },
      { start: 0.5, end: 0.67, ref: harvestRef },
      { start: 0.67, end: 0.83, ref: jarRef },
      { start: 0.83, end: 1.0, ref: finalRef },
    ];

    acts.forEach((act) => {
      const ref = act.ref.current;
      if (!ref) return;

      const fadeIn = 0.04;
      let opacity = 0;
      if (progress < act.start - fadeIn) opacity = 0;
      else if (progress < act.start) opacity = (progress - (act.start - fadeIn)) / fadeIn;
      else if (progress < act.end) opacity = 1;
      else if (progress < act.end + fadeIn) opacity = 1 - (progress - act.end) / fadeIn;
      else opacity = 0;

      ref.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            const m = mat as THREE.MeshPhysicalMaterial;
            const baseOpacity = (m.userData?.baseOpacity as number) ?? 1;
            const finalOpacity = opacity * baseOpacity;
            // Materials with transmission (glass) MUST stay transparent for the transmission
            // render pass to work. Solid materials (flour, oil fill) only need transparent=true
            // during the fade transitions, otherwise they break adjacent transmission renders.
            const hasTransmission = (m.transmission ?? 0) > 0;
            if (hasTransmission) {
              m.transparent = true;
              m.opacity = finalOpacity;
              m.depthWrite = false;
            } else {
              const isFading = finalOpacity < 0.98;
              m.transparent = isFading;
              m.opacity = finalOpacity;
              m.depthWrite = !isFading;
            }
          });
        }
      });

      ref.visible = opacity > 0.01;
    });

    const t = state.clock.elapsedTime;

    // Acte 1 — graine : float + rotation lente
    if (seedRef.current) {
      seedRef.current.position.y = Math.sin(t * 0.6) * 0.08;
      seedRef.current.rotation.y = t * 0.2;
      seedRef.current.rotation.z = Math.sin(t * 0.4) * 0.1;
    }

    // Acte 2 — pousse : grow + sway
    if (sproutRef.current) {
      const local = THREE.MathUtils.clamp((progress - 0.17) / 0.16, 0, 1);
      const eased = 1 - Math.pow(1 - local, 3);
      sproutRef.current.scale.set(0.5 + eased * 0.5, 0.3 + eased * 0.7, 0.5 + eased * 0.5);
      sproutRef.current.rotation.y = t * 0.18;
      sproutRef.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    }

    // Acte 3 — épi : rotation. Décalé vers le bas pour rester dans le cadre vertical.
    if (earRef.current) {
      earRef.current.rotation.y = t * 0.18;
      earRef.current.position.y = -0.5 + Math.sin(t * 0.4) * 0.1;
      earRef.current.rotation.z = Math.sin(t * 0.25) * 0.04;
    }

    // Acte 4 — moisson : grains qui tombent
    if (harvestRef.current && grainsRef.current && progress >= 0.46 && progress <= 0.71) {
      const localProgress = THREE.MathUtils.clamp((progress - 0.5) / 0.17, 0, 1);
      grainData.forEach((g, i) => {
        const fallProg = THREE.MathUtils.clamp((localProgress - g.delay) * 1.6, 0, 1);
        const eased = fallProg * fallProg;
        const yPos = THREE.MathUtils.lerp(g.y, -1.45, eased);
        dummy.position.set(g.x, yPos, g.z);
        dummy.rotation.set(
          g.rotX + t * g.spinSpeed * 0.4,
          g.rotY + t * g.spinSpeed * 0.3,
          g.rotZ + t * g.spinSpeed * 0.5
        );
        const sc = fallProg > 0.02 ? 0.13 * g.scale : 0;
        dummy.scale.setScalar(sc);
        dummy.updateMatrix();
        grainsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      grainsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Acte 5 — flour fill rises.
    // Le fill est un mesh enfant de jarRef. Le traverse plus haut a forcé son material à
    // transparent=true, ce qui interfère avec la transmission du verre (le fill devient invisible
    // au lieu d'être visible à travers le verre). On force le material du fill à rester opaque
    // après le traverse pour qu'il se rende correctement à l'intérieur du bocal.
    if (fillRef.current) {
      const localProgress = THREE.MathUtils.clamp((progress - 0.67) / 0.16, 0, 1);
      const eased = 1 - Math.pow(1 - localProgress, 2);
      const fillHeight = Math.max(0.001, eased * 0.85);
      fillRef.current.scale.y = fillHeight;
      fillRef.current.position.y = -0.55 + fillHeight / 2;

      // Override material : forcer opaque pour qu'il reste visible à travers le verre
      const fillMat = fillRef.current.material as THREE.MeshStandardMaterial;
      fillMat.transparent = false;
      fillMat.opacity = 1;
      fillMat.depthWrite = true;
    }

    // Acte 6 — produits finis float
    if (finalRef.current) {
      finalRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(t * 0.55 + i * 1.3) * 0.06;
        child.rotation.y = t * 0.12 + (i * Math.PI) / 3;
      });
      if (oilLevelRef.current) {
        oilLevelRef.current.position.y = -0.05 + Math.sin(t * 1.5) * 0.005;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* === LIGHTING — pro photographic 3-point + fill === */}

      {/* Key light : warm directional sun, casts shadows */}
      <directionalLight
        position={[4, 7, 4]}
        intensity={3.2}
        color="#FFD89B"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />

      {/* Fill light : cool sky tone from opposite side */}
      <directionalLight
        position={[-4, 3, -2]}
        intensity={0.9}
        color="#A8C5DA"
      />

      {/* Rim light : warm spotlight from behind for silhouette separation */}
      <spotLight
        position={[-2, 2, -4]}
        angle={0.7}
        penumbra={1}
        intensity={1.4}
        color="#FFB870"
        distance={10}
      />

      {/* Bottom kicker for matter-fill on undersides */}
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#FAF7F0" />

      {/* Soft ambient — minimal so shadows breathe */}
      <ambientLight intensity={0.2} color="#FFE6BC" />

      {/* === ACTE 1 — Graine de blé photoréaliste === */}
      <group ref={seedRef}>
        <mesh geometry={wheatGrainGeometry} castShadow scale={[0.9, 1.4, 0.9]}>
          <meshPhysicalMaterial
            color="#C89460"
            roughness={0.55}
            metalness={0.04}
            clearcoat={0.45}
            clearcoatRoughness={0.55}
            sheen={0.4}
            sheenColor="#FFD89B"
          />
        </mesh>
        {/* Ventral crease (darker line along the long axis) */}
        <mesh position={[0, 0, 0]} scale={[0.91, 1.41, 0.91]}>
          <torusGeometry args={[0.42, 0.012, 4, 32, Math.PI]} />
          <meshStandardMaterial color="#5A3A20" roughness={0.85} />
        </mesh>
        {/* Tip darker (germ end) */}
        <mesh position={[0, 0.62, 0]} scale={[0.18, 0.22, 0.18]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color="#7A5230" roughness={0.7} />
        </mesh>
      </group>

      {/* === ACTE 2 — Jeune pousse === */}
      <group ref={sproutRef} position={[0, -0.5, 0]}>
        {/* Soil */}
        <mesh position={[0, -0.05, 0]} receiveShadow>
          <cylinderGeometry args={[0.42, 0.5, 0.15, 32]} />
          <meshStandardMaterial color="#4A3020" roughness={0.95} />
        </mesh>
        {/* Stem with slight gradient via emissive subtle */}
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.028, 0.052, 1.3, 16, 4]} />
          <meshPhysicalMaterial
            color="#1f9c34"
            roughness={0.55}
            metalness={0.02}
            sheen={0.5}
            sheenColor="#7fdc8c"
            clearcoat={0.2}
          />
        </mesh>
        {/* Leaves with proper curve via group rotation */}
        <group position={[0, 0.55, 0]} rotation={[0, 0, -0.55]}>
          <mesh position={[0.18, 0, 0]} scale={[0.05, 0.36, 0.2]} castShadow>
            <sphereGeometry args={[1, 24, 16]} />
            <meshPhysicalMaterial
              color="#0E7824"
              roughness={0.5}
              sheen={0.6}
              sheenColor="#7fdc8c"
              clearcoat={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        <group position={[0, 0.9, 0]} rotation={[0, 0, 0.65]}>
          <mesh position={[-0.2, 0, 0]} scale={[0.05, 0.4, 0.22]} castShadow>
            <sphereGeometry args={[1, 24, 16]} />
            <meshPhysicalMaterial
              color="#0E7824"
              roughness={0.5}
              sheen={0.6}
              sheenColor="#7fdc8c"
              clearcoat={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        {/* Apex bud — like a tiny grain forming */}
        <mesh
          geometry={wheatGrainGeometry}
          position={[0, 1.32, 0]}
          castShadow
          scale={[0.18, 0.22, 0.18]}
        >
          <meshPhysicalMaterial
            color="#C8A878"
            roughness={0.55}
            clearcoat={0.3}
            sheen={0.3}
          />
        </mesh>
      </group>

      {/* === ACTE 3 — Épi de blé doré, version riche === */}
      <group ref={earRef} position={[0, 0, 0]}>
        {/* Tapered stem */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <cylinderGeometry args={[0.022, 0.045, 1.6, 12, 4]} />
          <meshStandardMaterial color="#A89060" roughness={0.85} />
        </mesh>

        {/* 28 grains in tight double-row spiral */}
        {Array.from({ length: 14 }).map((_, level) => {
          const t = level / 13;
          const y = -0.05 + t * 1.4;
          const baseAngle = level * 0.55;
          return (
            <group key={`level-${level}`} position={[0, y, 0]}>
              {[0, Math.PI].map((offset, idx) => {
                const angle = baseAngle + offset;
                const radius = 0.11;
                const tilt = Math.PI / 7 + (level / 13) * 0.1;
                const colorIdx = (level + idx * 3) % wheatColors.length;
                return (
                  <mesh
                    key={idx}
                    geometry={wheatGrainGeometry}
                    position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
                    rotation={[Math.cos(angle) * tilt, angle, Math.sin(angle) * tilt]}
                    scale={[0.18, 0.22, 0.18]}
                    castShadow
                  >
                    <meshPhysicalMaterial
                      color={wheatColors[colorIdx]}
                      roughness={0.5}
                      metalness={0.05}
                      clearcoat={0.35}
                      clearcoatRoughness={0.5}
                      sheen={0.4}
                      sheenColor="#FFD89B"
                    />
                  </mesh>
                );
              })}
            </group>
          );
        })}

        {/* Long awns (bristles) at the top — 16 longer ones */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const tilt = -Math.PI / 9 - (i % 2) * 0.08;
          const r = 0.08;
          return (
            <group
              key={`awn-${i}`}
              position={[Math.cos(angle) * r, 1.4, Math.sin(angle) * r]}
              rotation={[Math.cos(angle) * tilt, angle, Math.sin(angle) * tilt]}
            >
              <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.0015, 0.0035, 0.85, 4]} />
                <meshStandardMaterial color="#9a8050" roughness={0.95} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* === ACTE 4 — Moisson : 120 grains tombent === */}
      <group ref={harvestRef} position={[0, 0, 0]}>
        <instancedMesh
          ref={grainsRef}
          args={[wheatGrainGeometry, undefined, GRAIN_COUNT]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#C89460"
            roughness={0.55}
            metalness={0.05}
            clearcoat={0.3}
            clearcoatRoughness={0.55}
            sheen={0.35}
            sheenColor="#FFD89B"
          />
        </instancedMesh>
        {/* Soft soil patch */}
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.6, 64]} />
          <meshStandardMaterial color="#4A3020" roughness={0.95} transparent opacity={0.55} />
        </mesh>
      </group>

      {/* === ACTE 5 — Bocal de farine en verre === */}
      <group ref={jarRef} position={[0, 0, 0]}>
        {/* Glass body via lathe — fully transparent with proper transmission */}
        <mesh
          geometry={flourJarGeometry}
          castShadow
          userData={{ baseOpacity: 1 }}
        >
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={1.0}
            roughness={0.02}
            thickness={0.5}
            ior={1.5}
            transparent
            attenuationColor="#F8F4E8"
            attenuationDistance={0.7}
            clearcoat={1}
            clearcoatRoughness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Copper lid — flat disc */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.43, 0.43, 0.12, 48]} />
          <meshPhysicalMaterial
            color="#B87333"
            roughness={0.32}
            metalness={0.92}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
        {/* Lid horizontal rim band — torus rotated to be flat on top of the lid */}
        <mesh position={[0, 0.77, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.41, 0.012, 8, 64]} />
          <meshStandardMaterial color="#8B5A2B" metalness={0.95} roughness={0.3} />
        </mesh>
        {/* Flour fill (animated) — frustumCulled disabled + non-zero initial scale to avoid 3D culling bugs */}
        <mesh
          ref={fillRef}
          position={[0, -0.55, 0]}
          scale={[1, 0.001, 1]}
          frustumCulled={false}
          renderOrder={-1}
        >
          <cylinderGeometry args={[0.4, 0.38, 1.0, 48]} />
          <meshStandardMaterial color="#F2EBD9" roughness={0.95} />
        </mesh>
        {/* Paper label */}
        <mesh position={[0, -0.05, 0.43]}>
          <planeGeometry args={[0.55, 0.42]} />
          <meshStandardMaterial color="#FAF7F0" roughness={0.85} />
        </mesh>
        {/* Green band on label */}
        <mesh position={[0, 0.13, 0.431]}>
          <planeGeometry args={[0.55, 0.04]} />
          <meshStandardMaterial color="#0E7824" roughness={0.7} />
        </mesh>
      </group>

      {/* === ACTE 6 — Produits finis === */}
      <group ref={finalRef} position={[0, 0, 0]}>
        {/* Bouteille d'huile (gauche) */}
        <group position={[-1.15, 0, 0]}>
          {/* Glass bottle */}
          <mesh geometry={oilBottleGeometry} castShadow userData={{ baseOpacity: 1 }}>
            <meshPhysicalMaterial
              color="#5a8060"
              transmission={1.0}
              roughness={0.05}
              thickness={0.4}
              ior={1.52}
              transparent
              clearcoat={1}
              clearcoatRoughness={0.05}
              attenuationColor="#3d5e44"
              attenuationDistance={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Oil inside (shorter cylinder, golden) */}
          <mesh ref={oilLevelRef} position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.28, 0.31, 0.85, 48]} />
            <meshPhysicalMaterial
              color="#C89455"
              transmission={0.6}
              roughness={0.08}
              ior={1.47}
              clearcoat={0.7}
              clearcoatRoughness={0.1}
              transparent
              opacity={0.95}
              attenuationColor="#9A6630"
              attenuationDistance={0.8}
            />
          </mesh>
          {/* Cork stopper */}
          <mesh position={[0, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.105, 0.105, 0.16, 24]} />
            <meshStandardMaterial color="#7a5230" roughness={0.88} />
          </mesh>
          {/* Wax seal on top */}
          <mesh position={[0, 0.95, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.105, 0.04, 24]} />
            <meshStandardMaterial color="#5C3A2E" roughness={0.7} />
          </mesh>
          {/* Front label */}
          <mesh position={[0, -0.12, 0.345]}>
            <planeGeometry args={[0.42, 0.5]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.06, 0.346]}>
            <planeGeometry args={[0.42, 0.04]} />
            <meshStandardMaterial color="#0E7824" roughness={0.7} />
          </mesh>
        </group>

        {/* Bocal de farine (centre) */}
        <group position={[0, 0, 0]}>
          <mesh geometry={flourJarGeometry} castShadow userData={{ baseOpacity: 1 }} scale={[0.85, 0.85, 0.85]}>
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={1.0}
              roughness={0.02}
              thickness={0.5}
              ior={1.5}
              transparent
              attenuationColor="#F8F4E8"
              attenuationDistance={0.7}
              clearcoat={1}
              clearcoatRoughness={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Flour content (shorter cylinder visible inside) */}
          <mesh position={[0, -0.13, 0]} scale={[0.85, 0.85, 0.85]}>
            <cylinderGeometry args={[0.38, 0.36, 0.7, 48]} />
            <meshStandardMaterial color="#F2EBD9" roughness={0.95} />
          </mesh>
          {/* Copper lid */}
          <mesh position={[0, 0.59, 0]} castShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.1, 48]} />
            <meshPhysicalMaterial
              color="#B87333"
              roughness={0.32}
              metalness={0.92}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
            />
          </mesh>
          {/* Label */}
          <mesh position={[0, -0.05, 0.367]}>
            <planeGeometry args={[0.5, 0.4]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.1, 0.368]}>
            <planeGeometry args={[0.5, 0.035]} />
            <meshStandardMaterial color="#0E7824" roughness={0.7} />
          </mesh>
        </group>

        {/* Œuf bio (droite) */}
        <group position={[1.05, 0, 0]}>
          <mesh geometry={eggGeometry} castShadow scale={[0.8, 1, 0.8]} position={[0, -0.05, 0]}>
            <meshPhysicalMaterial
              color="#F0E2C8"
              roughness={0.42}
              clearcoat={0.55}
              clearcoatRoughness={0.3}
              sheen={0.25}
              sheenColor="#FAF7F0"
            />
          </mesh>
          {/* Subtle brown speckles on shell */}
          {Array.from({ length: 14 }).map((_, i) => {
            const phi = Math.acos(1 - 2 * ((i + 0.5) / 14));
            const theta = i * 2.3994;
            const r = 0.36;
            return (
              <mesh
                key={`speck-${i}`}
                position={[
                  r * Math.sin(phi) * Math.cos(theta),
                  -0.05 + r * Math.cos(phi),
                  r * Math.sin(phi) * Math.sin(theta) * 0.8,
                ]}
                scale={0.011 + (i % 3) * 0.005}
              >
                <sphereGeometry args={[1, 6, 4]} />
                <meshStandardMaterial color="#9F7F58" roughness={0.7} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Floor plane (subtle) for shadow grounding */}
      <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#3a2a18" roughness={0.95} />
      </mesh>
    </group>
  );
}
