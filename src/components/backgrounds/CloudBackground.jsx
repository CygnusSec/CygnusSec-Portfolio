import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const CloudSwarm = () => {
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
    const cloudSize = 80;
    const turbulence = 8;
    const speed = 1;

    for (let i = 0; i < count; i++) {
      const layer = i / count;
      const angle = i * 2.4 + Math.sin(layer * 10 + time * speed);
      const radius = Math.sqrt(layer) * cloudSize;
      const noiseX = Math.cos(i * 0.1 + time * speed) * turbulence;
      const noiseY = Math.sin(i * 0.15 + time * speed) * turbulence;
      const noiseZ = Math.sin(i * 0.05 - time * speed) * turbulence;

      target.set(
        Math.cos(angle) * radius + noiseX,
        Math.sin(angle) * (radius * 0.5) + noiseY,
        (layer - 0.5) * cloudSize * 0.5 + noiseZ
      );
      color.setHSL(0.6, 0.1, 0.5 + layer * 0.5);

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

const CloudBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.9} cameraPosition={[0, 0, 110]}>
    <CloudSwarm />
  </ThreeBackgroundFrame>
);

export default CloudBackground;
