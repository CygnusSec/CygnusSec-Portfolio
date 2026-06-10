import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const JanusSwarm = () => {
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
    const breath = 1;
    const spread = 60;
    const duality = 12;
    const nHalo = Math.floor(count * 0.30);
    const nCurves = Math.floor(count * 0.30);
    const nRings = Math.floor(count * 0.20);
    const nCore = Math.floor(count * 0.10);
    const breathFactor = 1 + 0.08 * Math.sin(time * breath * 0.7);
    const corePulse = 1 + 0.35 * Math.sin(time * breath * 1.6);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      let px = 0;
      let py = 0;
      let pz = 0;

      if (i < nHalo) {
        const f = (i + 0.5) / Math.max(1, nHalo);
        let yy = 1 - 2 * f;
        const sign = yy >= 0 ? 1 : -1;
        yy = sign * Math.pow(Math.abs(yy), 0.65);
        const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
        const angle = i * golden + time * 0.04;
        const r = spread * breathFactor;

        px = Math.cos(angle) * rr * r;
        py = yy * r;
        pz = Math.sin(angle) * rr * r;
      } else if (i < nHalo + nCurves) {
        const j = i - nHalo;
        const sideSign = (j & 1) === 0 ? -1 : 1;
        const localIdx = j >> 1;
        const halfCurve = Math.max(1, nCurves >> 1);
        const ribbonCount = 5;
        const ribbon = localIdx % ribbonCount;
        const along = Math.floor(localIdx / ribbonCount);
        const alongTotal = Math.max(1, Math.floor(halfCurve / ribbonCount));
        const t = along / alongTotal;
        const yt = (t * 2 - 1) * spread * 0.95;
        const amp = Math.sin(t * Math.PI);
        const curveAmp = spread * 0.5 * breathFactor;
        const ribbonOff = (ribbon - (ribbonCount - 1) * 0.5) * 1.2;

        px = sideSign * (duality * 0.5 + amp * curveAmp + ribbonOff);
        py = yt + Math.sin(t * Math.PI * 2 + time * 0.6) * 0.8;
        pz = Math.cos(t * Math.PI * 3 + time * 0.4) * 2.5;
      } else if (i < nHalo + nCurves + nRings) {
        const j = i - nHalo - nCurves;
        const ringPart = Math.floor(nRings * 0.7);

        if (j < ringPart) {
          const numRings = 6;
          const perRing = Math.max(1, Math.floor(ringPart / numRings));
          const ringIdx = Math.floor(j / perRing) % numRings;
          const onRing = j % perRing;
          const ringR = (ringIdx + 1) / numRings * spread * 0.85;
          const angle = (onRing / perRing) * Math.PI * 2 + time * 0.02;

          px = Math.cos(angle) * ringR;
          py = Math.sin(angle) * ringR;
        } else {
          const k = j - ringPart;
          const spokeTotal = Math.max(1, nRings - ringPart);
          const numSpokes = 4;
          const perSpoke = Math.max(1, Math.floor(spokeTotal / numSpokes));
          const spokeIdx = Math.floor(k / perSpoke) % numSpokes;
          const onSpoke = k % perSpoke;
          const spokeAngle = spokeIdx * Math.PI / 4;
          const dist = ((onSpoke / perSpoke) * 2 - 1) * spread * 0.9;

          px = Math.cos(spokeAngle) * dist;
          py = Math.sin(spokeAngle) * dist;
        }
      } else if (i < nHalo + nCurves + nRings + nCore) {
        const j = i - nHalo - nCurves - nRings;
        const f = (j + 0.5) / Math.max(1, nCore);
        const yy = 1 - 2 * f;
        const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
        const angle = j * golden + time * 0.25;
        const coreR = spread * 0.06 * corePulse;

        px = Math.cos(angle) * rr * coreR;
        py = yy * coreR;
        pz = Math.sin(angle) * rr * coreR;
      } else {
        const j = i - nHalo - nCurves - nRings - nCore;
        const jetCount = Math.max(1, count - nHalo - nCurves - nRings - nCore);
        const sideSign = (j & 1) === 0 ? -1 : 1;
        const lidx = j >> 1;
        const jetMax = Math.max(1, jetCount >> 1);
        const baseT = lidx / jetMax;
        const progress = ((baseT + time * 0.35) % 1 + 1) % 1;

        px = sideSign * progress * spread * 2.0;
        py = Math.sin(lidx * 0.37) * 0.7;
        pz = Math.cos(lidx * 0.73 + time * 0.5) * 0.5;
      }

      target.set(px, py, pz);

      const xNorm = Math.max(-1, Math.min(1, px / (spread * 0.6 + 0.0001)));
      const t01 = (xNorm + 1) * 0.5;
      const proximity = 1 - Math.min(1, Math.abs(xNorm));
      const prox2 = proximity * proximity;

      color.setHSL(0.52 + 0.20 * t01, 1 - 0.85 * prox2, 0.5 + 0.45 * prox2);

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

const JanusBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.7} cameraPosition={[0, 0, 130]}>
    <JanusSwarm />
  </ThreeBackgroundFrame>
);

export default JanusBackground;
