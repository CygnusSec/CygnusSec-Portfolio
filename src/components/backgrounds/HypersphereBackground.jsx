import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const HypersphereSwarm = () => {
  const meshRef = useRef(null);
  const count = 20000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const positions = useMemo(() => (
    Array.from(
      { length: count },
      () => new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      )
    )
  ), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const rotSpeed = 0.8;
    const projDepth = 2.5;
    const warp = 0.4;
    const hueSpeed = 0.5;

    for (let i = 0; i < count; i++) {
      const phi = i * 0.01;
      const theta = i * 0.007 + time * 0.2;
      const psi = i * 0.013 + time * 0.3;
      const r = 12.0 + warp * 8.0 * Math.sin(i * 0.05 + time);
      const x4 = r * Math.sin(phi) * Math.cos(theta);
      const y4 = r * Math.sin(phi) * Math.sin(theta);
      const z4 = r * Math.cos(phi) * Math.sin(psi);
      const w4 = r * Math.cos(phi) * Math.cos(psi);
      const angleXY = rotSpeed * time;
      const angleZW = rotSpeed * time * 0.7;
      const x4r = x4 * Math.cos(angleXY) - y4 * Math.sin(angleXY);
      const y4r = x4 * Math.sin(angleXY) + y4 * Math.cos(angleXY);
      const z4r = z4 * Math.cos(angleZW) - w4 * Math.sin(angleZW);
      const w4r = z4 * Math.sin(angleZW) + w4 * Math.cos(angleZW);
      const perspective = projDepth / (projDepth + w4r);
      const x3 = x4r * perspective;
      const y3 = y4r * perspective;
      const z3 = z4r * perspective;

      target.set(x3, y3, z3);

      const rawHue = x4r * 0.05 + y4r * 0.03 + w4r * 0.04 + time * hueSpeed;
      const hue = ((rawHue % 1) + 1) % 1;
      const light = 0.5 + 0.35 * Math.sin(z3 * 0.5 + time);
      color.setHSL(hue, 0.85, Math.max(0, Math.min(1, light)));

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};

const HypersphereBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={1.2} cameraPosition={[0, 0, 90]}>
    <HypersphereSwarm />
  </ThreeBackgroundFrame>
);

export default HypersphereBackground;
