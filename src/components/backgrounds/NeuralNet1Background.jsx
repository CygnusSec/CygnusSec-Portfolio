import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const NeuralNet1Swarm = () => {
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
    const scale = 45;
    const activity = 2.5;
    const separation = 5;
    const complexity = 8;
    const goldenRatio = 1.61803398875;

    for (let i = 0; i < count; i++) {
      const p = i / count;
      const cosVal = Math.max(-1.0, Math.min(1.0, 1.0 - 2.0 * p));
      const theta = Math.acos(cosVal);
      const phi = 2.0 * Math.PI * i / goldenRatio;
      const fold = 0.75 + 0.25 * Math.sin(theta * complexity)
        * Math.cos(phi * complexity + time * 0.2);
      const radius = scale * fold;

      let x = radius * Math.sin(theta) * Math.cos(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(theta);

      x += (x >= 0 ? 1 : -1) * separation;

      const isTract = i % 60 === 0 ? 1.0 : 0.0;
      x *= 1.0 - 0.85 * isTract;
      y *= 1.0 - 0.20 * isTract;
      z *= 1.0 - 0.50 * isTract;

      const neuronOffset = Math.sin(i * 12.9898 + i * 78.233) * 43758.5453;
      const firingPhase = neuronOffset + time * activity;
      const spike = Math.pow(Math.max(0.0, Math.sin(firingPhase)), 40);
      const wave = (Math.sin(y * 0.1 - time * 1.5) + 1.0) * 0.5;
      const jiggle = 0.3 * (1.0 - isTract);

      target.set(
        x + Math.sin(time * 5.0 + i) * jiggle,
        y + Math.cos(time * 6.2 + i * 2.0) * jiggle,
        z + Math.sin(time * 4.1 - i) * jiggle
      );

      const baseHue = 0.65 + p * 0.15;
      const currentHue = baseHue - spike * 0.15 - isTract * 0.1;
      const saturation = 0.7 + wave * 0.3;
      const lightness = Math.max(
        0.0,
        Math.min(1.0, isTract * 0.1 + 0.15 + wave * 0.15 + spike * 0.7)
      );

      color.setHSL(currentHue, saturation, lightness);

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

const NeuralNet1Background = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.9} cameraPosition={[0, 0, 120]}>
    <NeuralNet1Swarm />
  </ThreeBackgroundFrame>
);

export default NeuralNet1Background;
