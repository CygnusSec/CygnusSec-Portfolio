import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const EmeraldSwarm = () => {
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
    const scale = 50;
    const cushionSquareness = 3.2;
    const tableSize = 0.65;
    const jardin = 0.6;
    const spinSpeed = 0.3;
    const goldenAngle = 2.3999632;
    const rotTime = time * spinSpeed;
    const cosR = Math.cos(rotTime);
    const sinR = Math.sin(rotTime);

    for (let i = 0; i < count; i++) {
      const hashY = (i * 0.314159) % 1.0;
      const hashR = (i * 0.271828) % 1.0;
      const hashJ = (i * 0.161803) % 1.0;
      const yNorm = hashY * 2.0 - 1.0;
      const rScale = Math.sqrt(hashR + 0.0001);
      const topY = 0.4;
      const crownR = 1.0 - Math.max(0.0, yNorm - topY) / (1.0 - topY) * (1.0 - tableSize);
      const pavilionR = Math.max(0.0, yNorm + 1.0) / (1.0 + topY);
      const profileR = Math.min(crownR, pavilionR);
      const theta = i * goldenAngle;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const squircleBase = Math.pow(Math.abs(cosT), cushionSquareness)
        + Math.pow(Math.abs(sinT), cushionSquareness);
      const squircleR = 1.0 / Math.pow(squircleBase, 1.0 / cushionSquareness);
      const localR = profileR * squircleR * rScale * scale;
      const localX = localR * cosT;
      const localY = yNorm * scale * 1.1;
      const localZ = localR * sinT;
      const finalX = localX * cosR - localZ * sinR;
      const finalZ = localX * sinR + localZ * cosR;
      const inclusionX = Math.sin(hashJ * 113.0) * jardin * 3.0;
      const inclusionY = Math.cos(hashJ * 127.0) * jardin * 3.0;
      const inclusionZ = Math.sin(hashJ * 139.0) * jardin * 3.0;

      target.set(finalX + inclusionX, localY + inclusionY, finalZ + inclusionZ);

      const facetY = Math.floor(yNorm * 10.0);
      const facetTheta = Math.floor(theta * 6.0);
      const glintWave = Math.sin(facetTheta * 1.8 + facetY * 2.5 - rotTime * 5.0);
      const glint = Math.pow(Math.max(0.0, glintWave), 14.0);
      const coreGlow = 1.0 - rScale;
      const flawLight = hashJ * jardin * 0.4;
      const hue = 0.42 + glint * 0.03 + flawLight * 0.04;
      const saturation = 0.95 - glint * 0.5 - flawLight * 0.4;
      const lightness = 0.12 + coreGlow * 0.25 + glint * 0.65 + flawLight * 0.8;

      color.setHSL(
        hue,
        Math.max(0, Math.min(1, saturation)),
        Math.max(0, Math.min(1, lightness))
      );

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

const EmeraldBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.8} cameraPosition={[0, 0, 120]}>
    <EmeraldSwarm />
  </ThreeBackgroundFrame>
);

export default EmeraldBackground;
