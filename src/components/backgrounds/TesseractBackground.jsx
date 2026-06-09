import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const TesseractSwarm = () => {
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
    const scale = 80;
    const chaos = 1;
    const fold = 1.57;
    const drift = 0.3;

    for (let i = 0; i < count; i++) {
      const t = time * 0.18;
      const phi = (i / count) * 6.2831853;
      const theta = Math.acos(1 - 2 * ((i * 1.6180339887) % 1));
      const layer = Math.floor(i / (count * 0.25));
      const localT = (i % (count * 0.25)) / (count * 0.25);
      const psi = localT * 6.2831853 + t;
      const xi = phi + t * 0.07 * (layer + 1);
      const r4 = scale * (0.3 + 0.7 * (i / count));
      const sinTh = Math.sin(theta);
      const x4 = r4 * sinTh * Math.cos(xi);
      const y4 = r4 * sinTh * Math.sin(xi);
      const z4 = r4 * Math.cos(theta);
      const w4 = r4 * Math.cos(psi + fold) * 0.9;
      const viewW = scale * (1.2 + 0.4 * Math.sin(t * 0.5));
      const wDenom = viewW - w4;
      const wSafe = wDenom + (Math.abs(wDenom) < 0.5 ? 0.5 : 0);
      const proj = viewW / wSafe;

      let px = x4 * proj;
      let py = y4 * proj;
      let pz = z4 * proj;

      const noiseFreq = 0.04 * chaos;
      const nx = Math.sin(px * noiseFreq + t * 1.3) * Math.cos(py * noiseFreq - t * 0.9);
      const ny = Math.sin(py * noiseFreq + t * 0.7) * Math.cos(pz * noiseFreq + t * 1.1);
      const nz = Math.sin(pz * noiseFreq - t * 1.5) * Math.cos(px * noiseFreq + t * 0.6);
      const noiseAmp = scale * 0.12 * chaos;

      px += nx * noiseAmp;
      py += ny * noiseAmp;
      pz += nz * noiseAmp;

      const breathe = 1.0 + drift * 0.15 * Math.sin(t * 0.4 + (i / count) * 3.14159);
      px = Math.max(-600, Math.min(600, px * breathe));
      py = Math.max(-600, Math.min(600, py * breathe));
      pz = Math.max(-600, Math.min(600, pz * breathe));

      target.set(px, py, pz);

      const dist = Math.sqrt(px * px + py * py + pz * pz);
      const distNorm = Math.min(dist / (scale * 2.5), 1.0);
      const wNorm = (w4 / (r4 + 0.001)) * 0.5 + 0.5;
      const hue = (wNorm * 0.72 + (i / count) * 0.28 + t * 0.04) % 1.0;
      const sat = 0.55 + 0.45 * Math.abs(Math.sin(psi * 2.0 + t));
      const interference = 0.5 + 0.5 * Math.sin(distNorm * 9.42 - t * 1.8);
      const lit = 0.18 + 0.52 * interference * (1.0 - distNorm * 0.4);

      color.setHSL(hue, sat, lit);
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

const TesseractBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={2}>
    <TesseractSwarm />
  </ThreeBackgroundFrame>
);

export default TesseractBackground;
