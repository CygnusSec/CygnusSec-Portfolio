import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const MagnetarSwarm = () => {
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
    const scale = 70;
    const vortex = 1.6;
    const jetPower = 1.4;
    const chaos = 0.55;
    const diskEnd = 0.72;
    const jetEnd = 0.90;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      let px;
      let py;
      let pz;
      let hue;
      let sat;
      let lit;

      if (t < diskEnd) {
        const dt = t / diskEnd;
        const angle = dt * Math.PI * 14.0 + time * vortex * (1.0 - dt * 0.6);
        const r = 0.12 + dt * 0.88;
        const diskH = (0.03 + dt * 0.07) * Math.sin(angle * 4.0 + time * 1.5 + dt * 6.0);
        const ripple = chaos * 0.10 * Math.sin(angle * 6.7 - time * 2.9)
          * Math.cos(dt * 9.0 + time * 0.7);

        px = Math.cos(angle) * (r + ripple);
        py = Math.sin(angle) * (r + ripple);
        pz = diskH;
        hue = 0.04 + dt * 0.09 + 0.03 * Math.sin(angle + time);
        sat = 0.95;
        lit = 0.55 - dt * 0.20 + 0.15 * Math.abs(Math.sin(angle * 2.0 + time));
      } else if (t < jetEnd) {
        const jt = (t - diskEnd) / (jetEnd - diskEnd);
        const side = (i & 1) === 0 ? 1.0 : -1.0;
        const jAngle = jt * Math.PI * 6.0 + time * 2.2;
        const jR = 0.04 + jt * 0.08 * Math.sin(jt * Math.PI);
        const tx = chaos * 0.035 * Math.sin(jt * 15.0 + time * 4.3);
        const ty = chaos * 0.035 * Math.cos(jt * 13.0 - time * 3.8);

        px = jR * Math.cos(jAngle) + tx;
        py = jR * Math.sin(jAngle) + ty;
        pz = side * (0.08 + jt * jetPower * 0.9);
        hue = 0.58 + 0.12 * Math.sin(jt * Math.PI * 3.0 + time * 1.5);
        sat = 1.0;
        lit = 0.55 + 0.25 * (1.0 - jt);
      } else {
        const cTotal = count - Math.floor(count * jetEnd);
        const cIdx = i - Math.floor(count * jetEnd);
        const cosArg = Math.max(-1.0, Math.min(1.0, 1.0 - 2.0 * (cIdx + 0.5) / cTotal));
        const theta = Math.acos(cosArg);
        const phi2 = 2.39996 * cIdx;
        const cr = 0.90 + 0.18 * Math.sin(phi2 * 3.0 + time * 0.7);
        const cw = chaos * 0.08 * Math.sin(theta * 5.0 + time * 1.1)
          * Math.cos(phi2 * 4.0 - time * 0.6);
        const crf = cr + cw;
        const sinT = Math.sin(theta);

        px = sinT * Math.cos(phi2) * crf;
        py = sinT * Math.sin(phi2) * crf;
        pz = Math.cos(theta) * crf;
        hue = 0.68 + 0.14 * Math.sin(theta * 4.0 + phi2 * 0.5 + time * 0.4);
        sat = 0.65 + 0.35 * Math.abs(Math.sin(phi2 * 2.0 + time * 0.3));
        lit = 0.22 + 0.18 * Math.abs(Math.sin(theta * 5.0 + phi2 + time * 0.6));
      }

      const tiltA = time * 0.04;
      const cosA = Math.cos(tiltA);
      const sinA = Math.sin(tiltA);
      const rpx = px * cosA - pz * sinA;
      const rpz = px * sinA + pz * cosA;

      target.set(rpx * scale, py * scale, rpz * scale);
      color.setHSL(
        ((hue % 1.0) + 1.0) % 1.0,
        Math.min(1.0, Math.max(0.0, sat)),
        Math.min(0.9, Math.max(0.05, lit))
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

const MagnetarBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.8} cameraPosition={[0, 0, 115]}>
    <MagnetarSwarm />
  </ThreeBackgroundFrame>
);

export default MagnetarBackground;
