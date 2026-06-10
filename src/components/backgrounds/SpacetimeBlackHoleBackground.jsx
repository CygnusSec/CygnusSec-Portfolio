import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const SpacetimeBlackHoleSwarm = () => {
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
    const gravity = 4.0;
    const swirl = 3.5;
    const disk = 80.0;
    const warp = 2.0;
    const jets = 1.5;
    const golden = 2.399963229728653;

    for (let i = 0; i < count; i++) {
      const fi = i / count;
      const spiral = fi * 300.0;
      const baseAngle = i * golden;
      const timeWarp = time * (0.15 + gravity * 0.05);
      const radialNoise = Math.sin(i * 0.013 + time * 0.7) * 8.0;
      const radius = disk + spiral * 0.18 + radialNoise;
      const collapse = 1.0 / (1.0 + fi * gravity * 0.7);
      const angle = baseAngle + timeWarp + (1.0 / (radius * 0.03 + 0.2)) * swirl;

      let x = Math.cos(angle) * radius * collapse;
      let z = Math.sin(angle) * radius * collapse;
      let y = Math.sin(radius * 0.08 - time * 2.0) * 3.0 * Math.exp(-radius * 0.008);
      const singularityDist = Math.sqrt(x * x + y * y + z * z) + 0.0001;
      const lens = warp / (singularityDist * 0.08 + 1.0);

      x *= 1.0 + lens;
      z *= 1.0 + lens;

      const pull = gravity / (singularityDist * 0.15 + 1.0);
      x -= x * pull * 0.015;
      y -= y * pull * 0.015;
      z -= z * pull * 0.015;

      const jetMask = Math.abs(Math.sin(fi * 90.0 + time * 0.5));
      const jetStrength = jets * Math.pow(jetMask, 18.0);
      y += (fi - 0.5) * 900.0 * jetStrength;

      const photonRing = Math.exp(-Math.abs(singularityDist - 18.0) * 0.08);
      x += Math.cos(angle * 4.0 + time * 3.0) * photonRing * 6.0;
      z += Math.sin(angle * 4.0 + time * 3.0) * photonRing * 6.0;

      target.set(x, y, z);

      const hueShift = 0.58 + 0.25 * Math.sin(radius * 0.01 - time * 0.2);
      const saturation = 0.8 - collapse * 0.3;
      const brightness = 0.15
        + photonRing * 0.9
        + jetStrength * 0.8
        + Math.exp(-singularityDist * 0.01) * 0.5;

      color.setHSL(hueShift, saturation, Math.min(1.0, brightness));

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

const SpacetimeBlackHoleBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.8} cameraPosition={[0, 0, 155]}>
    <SpacetimeBlackHoleSwarm />
  </ThreeBackgroundFrame>
);

export default SpacetimeBlackHoleBackground;
