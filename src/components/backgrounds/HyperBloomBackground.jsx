import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const HyperBloomSwarm = () => {
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
    const speed = 0.72;
    const scale = 64;
    const fold = 1.35;
    const pulse = 0.85;
    const glow = 0.72;
    const n = count + 0.000001;
    const golden = 2.399963229728653;
    const t = time * speed;

    for (let i = 0; i < count; i++) {
      const p = (i + 0.5) / n;
      const a = i * golden;
      const b = p * Math.PI * 2;
      const c = b * 3.0 + t * 0.37;
      const z0 = 1.0 - 2.0 * p;
      const sr = Math.sqrt(Math.abs(1.0 - z0 * z0));
      const x0 = Math.cos(a + t * 0.11) * sr;
      const y0 = Math.sin(a + t * 0.11) * sr;
      const k1 = Math.sin(c + x0 * fold * 2.0);
      const k2 = Math.cos(c * 1.61803398875 + y0 * fold * 2.0);
      const k3 = Math.sin(a * 0.013 + t + z0 * fold * 4.0);
      const x1 = x0 + 0.34 * k1 * fold;
      const y1 = y0 + 0.34 * k2 * fold;
      const z1 = z0 + 0.24 * k3 * fold;
      const w1 = Math.sin(b * 5.0 + t * 0.9 + x0 * y0 * 3.0) * 0.75;
      const rA = t * 0.43 + p * Math.PI;
      const rB = t * 0.29 + a * 0.021;
      const ca = Math.cos(rA);
      const sa = Math.sin(rA);
      const cb = Math.cos(rB);
      const sb = Math.sin(rB);
      const x2 = x1 * ca - w1 * sa;
      const w2 = x1 * sa + w1 * ca;
      const y2 = y1 * cb - z1 * sb;
      const z2 = y1 * sb + z1 * cb;
      const wave = 1.0 + pulse * 0.18 * Math.sin(t * 2.0 + p * Math.PI * 6.0 + Math.sin(a * 0.017));
      const lens = 1.0 / (2.25 - w2 * 0.62 + 0.0001);
      const arm = 1.0 + 0.22 * Math.sin(a * 0.034 + t * 1.7) * Math.cos(b * 8.0 - t);

      target.set(
        x2 * scale * wave * lens * arm,
        y2 * scale * wave * lens * arm,
        z2 * scale * wave * lens + Math.sin(b * 12.0 + t) * fold * 2.0
      );

      const h = p + 0.16 * Math.sin(t * 0.25 + w2 * 2.0) + 0.07 * Math.sin(a * 0.01);
      const lightness = 0.42 + glow * 0.24 + 0.11 * Math.sin(w2 * 4.0 + t);
      color.setHSL(
        h - Math.floor(h),
        Math.min(1, 0.82 + glow * 0.18),
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

const HyperBloomBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.9} cameraPosition={[0, 0, 120]}>
    <HyperBloomSwarm />
  </ThreeBackgroundFrame>
);

export default HyperBloomBackground;
