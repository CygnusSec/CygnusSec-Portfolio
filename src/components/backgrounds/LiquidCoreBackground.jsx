import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const LiquidCoreSwarm = () => {
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
    const size = 80;
    const speed = 1;
    const pulse = 0.8;
    const t = time * speed;

    for (let i = 0; i < count; i++) {
      const f = i / count;
      const phi = Math.acos(1.0 - 2.0 * f);
      const theta = Math.PI * 2.0 * Math.sqrt(count * f);
      const r = size
        + Math.sin(theta * 6.0 + t * 2.0) * 8.0
        + Math.cos(phi * 8.0 - t) * 8.0;
      const breathing = 1.0 + Math.sin(t * 2.0) * pulse * 0.15;

      target.set(
        Math.sin(phi) * Math.cos(theta) * r * breathing,
        Math.sin(phi) * Math.sin(theta) * r * breathing,
        Math.cos(phi) * r * breathing
      );

      const hue = 0.52 + Math.sin(f * 20.0 + t) * 0.08;
      const light = 0.45 + Math.sin(theta * 2.0 - t * 3.0) * 0.2;
      color.setHSL(hue, 1.0, light);

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

const LiquidCoreBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={2}>
    <LiquidCoreSwarm />
  </ThreeBackgroundFrame>
);

export default LiquidCoreBackground;
