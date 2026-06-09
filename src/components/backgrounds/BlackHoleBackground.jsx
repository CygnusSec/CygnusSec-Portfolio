import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const BlackHoleSwarm = () => {
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
    const mass = 5;
    const viewTilt = 0.4;
    const eventHorizon = 25;

    for (let i = 0; i < count; i++) {
      const ratio = i / count;
      const radius = eventHorizon + Math.pow(ratio, 1.8) * 180;
      const orbitalSpeed = (mass * 15) / Math.sqrt(radius);
      const angle = (i * 13.7) - (time * orbitalSpeed);
      const noiseY = Math.sin(i * 512.4) * (radius * 0.05) * Math.cos(time * 0.5 + i);
      const flatX = Math.cos(angle) * radius;
      const flatZ = Math.sin(angle) * radius;

      target.set(
        flatX,
        noiseY * Math.cos(viewTilt) - flatZ * Math.sin(viewTilt),
        noiseY * Math.sin(viewTilt) + flatZ * Math.cos(viewTilt)
      );

      const temp = Math.max(0, 1 - Math.pow(ratio, 0.5));
      const hue = 0.05 + (1 - temp) * 0.1;
      const lightness = temp > 0.85 ? 1.0 : temp * temp * 1.5;
      color.setHSL(hue, 1.0, Math.max(0, Math.min(1, lightness)));

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

const BlackHoleBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.6} cameraPosition={[0, 0, 150]}>
    <BlackHoleSwarm />
  </ThreeBackgroundFrame>
);

export default BlackHoleBackground;
