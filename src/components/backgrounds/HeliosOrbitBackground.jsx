import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const HeliosOrbitSwarm = () => {
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
    const scale = 160;
    const speed = 1.05;
    const starRadius = 28;
    const starGlow = 5.2;
    const starBrightness = 2;
    const tilt = 0.34;
    const eccentricity = 0.28;
    const dust = 0.72;
    const chaos = 0.28;
    const rings = 1;
    const t = time * speed;
    const pi = Math.PI;
    const pi2 = Math.PI * 2;
    const golden = 2.399963229728653;
    const eps = 0.000001;
    const starFrac = 0.07;
    const planetFrac = 0.56;
    const beltFrac = 0.19;
    const dustFrac = 0.18;

    for (let i = 0; i < count; i++) {
      const p = i / count;

      if (p < starFrac) {
        const local = p / (starFrac + eps);
        const h = -1 + 2 * local;
        const rr = Math.sqrt(Math.max(0, 1 - h * h));
        const theta = i * golden + t * 1.4;
        const coreMix = 1 - Math.min(1, local * 2.4);
        const coronaMix = 1 - coreMix;
        const starBase = starRadius * (0.22 + 0.78 * Math.cbrt(local + eps));
        const starPulse = 1 + 0.10 * Math.sin(t * 3.1 + local * pi2 * 10.0);
        const swarm = starBase * starPulse;
        const flare = starGlow * (0.35 + 0.65 * coronaMix);

        target.set(
          Math.cos(theta) * rr * swarm + Math.cos(theta * 5.0 + t * 2.0) * flare * coronaMix * 0.55,
          h * swarm + Math.sin(theta * 3.0 - t * 1.5) * flare * 0.35,
          Math.sin(theta) * rr * swarm + Math.sin(theta * 4.0 + t * 1.8) * flare * coronaMix * 0.55
        );

        const hue = 0.10 + 0.03 * Math.sin(t * 0.4 + local * 12.0);
        const sat = 0.38 - 0.18 * coreMix + 0.12 * Math.sin(local * pi2 * 3.0 + t);
        const lit = (0.82 + 0.30 * coreMix + 0.18 * coronaMix + starBrightness * 0.24 + starGlow * 0.03)
          * (1 + 0.10 * Math.sin(t * 5.0 + local * 20.0));
        color.setHSL(hue % 1, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));
      } else if (p < starFrac + planetFrac) {
        const local = (p - starFrac) / (planetFrac + eps);
        const planetSlot = Math.min(7, Math.floor(local * 8));
        const f = local * 8 - planetSlot;
        const seed = i * golden;
        const planetRadius = planetSlot === 0 ? scale * 0.18 : planetSlot === 1 ? scale * 0.26 : planetSlot === 2 ? scale * 0.34 : planetSlot === 3 ? scale * 0.45 : planetSlot === 4 ? scale * 0.60 : planetSlot === 5 ? scale * 0.77 : planetSlot === 6 ? scale * 0.95 : scale * 1.12;
        const orbitSpeed = planetSlot === 0 ? 4.8 : planetSlot === 1 ? 3.9 : planetSlot === 2 ? 3.1 : planetSlot === 3 ? 2.35 : planetSlot === 4 ? 1.72 : planetSlot === 5 ? 1.25 : planetSlot === 6 ? 0.92 : 0.72;
        const bodySize = planetSlot === 0 ? 0.10 : planetSlot === 1 ? 0.13 : planetSlot === 2 ? 0.14 : planetSlot === 3 ? 0.16 : planetSlot === 4 ? 0.26 : planetSlot === 5 ? 0.24 : planetSlot === 6 ? 0.21 : 0.20;
        const orbitTilt = tilt * (planetSlot === 0 ? 0.12 : planetSlot === 1 ? 0.15 : planetSlot === 2 ? 0.18 : planetSlot === 3 ? 0.11 : planetSlot === 4 ? 0.08 : planetSlot === 5 ? 0.05 : planetSlot === 6 ? 0.04 : 0.03);
        const inc = orbitTilt * (0.6 + 0.4 * Math.sin(seed * 0.7 + t));
        const ecc = eccentricity * (planetSlot === 0 ? 0.20 : planetSlot === 1 ? 0.11 : planetSlot === 2 ? 0.16 : planetSlot === 3 ? 0.09 : planetSlot === 4 ? 0.05 : planetSlot === 5 ? 0.06 : planetSlot === 6 ? 0.04 : 0.03);
        const ang = t * orbitSpeed + seed * 0.02 + planetSlot * 0.45;
        const pre = t * 0.12 + planetSlot * 0.31;
        const ax = Math.cos(ang + pre) * (planetRadius * (1 + ecc * Math.sin(ang * 0.9))) + Math.cos(seed * 0.01 + t * 2.0) * planetRadius * 0.02;
        const az = Math.sin(ang + pre) * (planetRadius * (1 - ecc * Math.sin(ang * 0.7)));
        const ay = Math.sin(ang * 0.5 + seed * 0.013) * planetRadius * inc;
        const vx = ax * Math.cos(orbitTilt) - ay * Math.sin(orbitTilt);
        const vy = ax * Math.sin(orbitTilt) + ay * Math.cos(orbitTilt);
        const bodyMix = 1 - Math.min(1, f * 3.2);
        const trailMix = 1 - bodyMix;
        const ringPlanet = planetSlot === 5 ? 1 : planetSlot === 6 ? 0.45 : 0;
        const ringAngle = seed + t * (1.6 + planetSlot * 0.12);
        const ringRadius = bodySize * scale * (2.2 + 1.3 * Math.sin(f * pi2 * 1.5 + t));
        const ringThickness = bodySize * scale * (0.05 + 0.12 * rings);
        const sphereSeed = seed * 0.37 + t * 1.9;
        const sh = -1 + 2 * Math.abs(Math.sin(sphereSeed));
        const sr = Math.sqrt(Math.max(0, 1 - sh * sh));
        const bodyTheta = seed + t * 0.8;
        const bodyR = bodySize * scale * (0.55 + 0.45 * Math.cbrt(f + eps));
        const bx = Math.cos(bodyTheta) * sr * bodyR;
        const by = sh * bodyR;
        const bz = Math.sin(bodyTheta) * sr * bodyR;
        const cloud = Math.sin(seed * 0.7 + t * 1.8) * chaos * scale * 0.01;

        target.set(
          vx + bx * bodyMix + ringPlanet * Math.cos(ringAngle) * ringRadius * trailMix + cloud * (Math.cos(seed) + Math.sin(ang)),
          vy + by * bodyMix + ringPlanet * Math.sin(seed * 3.0 + t * 0.6) * ringThickness * 0.18 * trailMix + cloud * (Math.sin(seed) + Math.cos(ang * 0.7)),
          az + bz * bodyMix + ringPlanet * Math.sin(ringAngle) * ringRadius * trailMix + cloud * (Math.cos(seed * 0.5) + Math.sin(ang * 0.9))
        );

        const hue = planetSlot === 0 ? 0.09 : planetSlot === 1 ? 0.10 : planetSlot === 2 ? 0.58 : planetSlot === 3 ? 0.07 : planetSlot === 4 ? 0.12 : planetSlot === 5 ? 0.14 : planetSlot === 6 ? 0.56 : 0.60;
        const sat = planetSlot === 0 ? 0.28 : planetSlot === 1 ? 0.45 : planetSlot === 2 ? 0.80 : planetSlot === 3 ? 0.62 : planetSlot === 4 ? 0.72 : planetSlot === 5 ? 0.55 : planetSlot === 6 ? 0.68 : 0.76;
        const lit = 0.38 + 0.18 * bodyMix + 0.08 * trailMix + 0.10 * Math.sin(t * 2.0 + planetSlot) + (planetSlot >= 4 ? 0.05 : 0);
        color.setHSL(hue % 1, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));
      } else if (p < starFrac + planetFrac + beltFrac) {
        const local = (p - starFrac - planetFrac) / (beltFrac + eps);
        const seed = i * golden + t * 0.2;
        const beltR = scale * (0.36 + 0.06 * Math.sin(local * pi2 * 9.0));
        const beltAng = seed * 0.9 + t * (1.6 + dust * 0.4);
        const beltInc = tilt * 0.12 + chaos * 0.18 * Math.sin(seed * 0.5 + t * 0.7);
        const beltEcc = eccentricity * 0.18 * Math.sin(seed * 0.3 + t);
        const drift = dust * 0.18 * Math.sin(seed * 2.1 + t * 3.0);

        target.set(
          Math.cos(beltAng) * (beltR + beltEcc * beltR * 0.25) + drift,
          Math.sin(seed * 1.7 + t * 2.2) * beltR * beltInc,
          Math.sin(beltAng) * (beltR - beltEcc * beltR * 0.15) - drift
        );

        const hue = 0.10 + 0.06 * Math.sin(seed * 0.3);
        const sat = 0.30 + 0.18 * Math.sin(seed * 0.2 + t);
        const lit = 0.52 + 0.18 * Math.sin(seed * 0.9 + t * 1.4) + 0.10 * dust;
        color.setHSL(hue % 1, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));
      } else {
        const local = (p - starFrac - planetFrac - beltFrac) / (dustFrac + eps);
        const seed = i * golden;
        const a = seed * 0.8 + t * 0.35;
        const b = seed * 0.43 - t * 0.5;
        const c = seed * 0.21 + t * 0.2;
        const r = scale * (0.95 + 0.7 * local + 0.4 * Math.sin(seed * 0.17 + t));
        const spiral = 1 + chaos * 0.3 * Math.sin(seed * 0.8 + t * 1.7);

        target.set(
          Math.cos(a) * r * spiral + Math.cos(c * 2.0) * dust * scale * 0.08,
          Math.sin(b) * r * 0.35 + Math.sin(seed * 1.3 + t * 1.1) * scale * 0.06,
          Math.sin(a) * r * spiral + Math.sin(c * 2.0) * dust * scale * 0.08
        );

        const hue = 0.60 + 0.05 * Math.sin(seed * 0.2) + 0.04 * Math.sin(t * 0.8 + local * pi2);
        const sat = 0.24 + 0.22 * Math.sin(seed * 0.33 + t * 0.4);
        const lit = 0.34 + 0.18 * Math.exp(-local * 3.0) + 0.08 * dust;
        color.setHSL(hue % 1, Math.max(0, Math.min(1, sat)), Math.max(0, Math.min(1, lit)));
      }

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

const HeliosOrbitBackground = () => (
  <ThreeBackgroundFrame
    autoRotateSpeed={0.7}
    cameraPosition={[0, 360, 18]}
    target={[0, 0, 0]}
  >
    <HeliosOrbitSwarm />
  </ThreeBackgroundFrame>
);

export default HeliosOrbitBackground;
