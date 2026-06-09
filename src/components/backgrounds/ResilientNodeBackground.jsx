import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const ResilientNodeSwarm = () => {
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
    const chaos = 2.5;
    const load = 1.2;
    const boatCount = Math.floor(count * 0.18);

    for (let i = 0; i < count; i++) {
      if (i < boatCount) {
        const t = i / boatCount;
        const tSlow = time * 0.6;
        const pitch = Math.sin(tSlow) * (0.06 + chaos * 0.02);
        const roll = Math.cos(tSlow * 0.8) * (0.04 + chaos * 0.01);
        const bobbing = Math.sin(tSlow * 2) * 0.6;
        let x = 0;
        let y = 0;
        let z = 0;

        if (t < 0.4) {
          const hullT = t / 0.4;
          const zRatio = Math.floor(hullT * 55) / 55;
          const hCol = (hullT * 25) % 1;
          const maxWidth = Math.sin(zRatio * Math.PI) * 7;
          x = (hCol - 0.5) * 2 * maxWidth;
          z = (zRatio - 0.5) * 45;
          y = Math.pow(x / (maxWidth + 0.1), 2) * 3.5 - 3.5
            + (zRatio > 0.65 ? Math.pow(zRatio - 0.65, 2) * 120 : 0);
        } else {
          const sailT = (t - 0.4) / 0.6;
          const isFore = sailT < 0.5;
          const sSubT = isFore ? sailT * 2 : (sailT - 0.5) * 2;
          const row = Math.floor(sSubT * 48) / 48;
          const col = (sSubT * 25) % 1;
          const mastZ = isFore ? 8 : -10;
          const h = row * 34 * load;
          const sWidth = (1 - row) * 22 * load;

          x = (col - 0.5) * sWidth;
          y = h + 2.5;
          z = mastZ + h * -0.15 + Math.sin(col * Math.PI) * 3;
        }

        const worldY = y * Math.cos(pitch) - z * Math.sin(pitch) + bobbing;
        const worldZ = y * Math.sin(pitch) + z * Math.cos(pitch);

        target.set(
          x * Math.cos(roll) - worldY * Math.sin(roll),
          x * Math.sin(roll) + worldY * Math.cos(roll),
          worldZ
        );
        color.setHSL(0.12, 0.8, 0.7);
      } else {
        const oceanIdx = (i - boatCount) / (count - boatCount);
        const gridX = ((oceanIdx * 1537) % 1) * 200 - 100;
        const gridZ = ((oceanIdx * 723) % 1) * 200 - 100;
        const wave1 = Math.sin(gridX * 0.1 + time * 1.2) * 2;
        const wave2 = Math.cos(gridZ * 0.15 - time * 0.8) * 2;
        const interference = Math.sin((gridX + gridZ) * 0.05 + time) * chaos;
        const ripple = Math.sin(Math.sqrt(gridX * gridX + gridZ * gridZ) * 0.2 - time * 3) * (chaos * 0.2);
        const y = wave1 + wave2 + interference + ripple - 5;
        const depth = Math.max(0, Math.min(1, (y + 10) / 15));

        target.set(gridX, y, gridZ);
        color.setHSL(0.55 + depth * 0.1, 0.8, 0.2 + depth * 0.4);
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

const ResilientNodeBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={0.6} cameraPosition={[0, 55, 120]}>
    <ResilientNodeSwarm />
  </ThreeBackgroundFrame>
);

export default ResilientNodeBackground;
