import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const CubeSwarm = () => {
  const meshRef = useRef(null);
  const count = 18000;
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
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    wireframe: true,
  }), []);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.3, 0.3), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const gridDensity = 36;
    const sep = 3.5;
    const dropLength = 30;
    const speedBase = 120;
    const rotationSpeed = 0.5;
    const numStreams = gridDensity * gridDensity;

    for (let i = 0; i < count; i++) {
      const streamId = i % numStreams;
      const pId = Math.floor(i / numStreams);

      if (pId >= dropLength) {
        target.set(0, 0, 0);
        color.setRGB(0, 0, 0);
      } else {
        const gridX = streamId % gridDensity;
        const gridZ = Math.floor(streamId / gridDensity);
        const off = (gridDensity * sep) / 2;
        const posX = gridX * sep - off;
        const posZ = gridZ * sep - off;
        const randOffset = Math.sin(streamId * 34.1234) * 1000.0;
        const fallSpeed = speedBase * (0.6 + Math.abs(Math.cos(streamId * 78.4321)) * 0.8);
        const boundsY = gridDensity * sep;
        const halfBoundsY = boundsY / 2;
        const spacingY = sep * 0.8;
        const headY = (-((time + randOffset) * fallSpeed) % boundsY + boundsY) % boundsY;
        const posY = ((headY + pId * spacingY) % boundsY + boundsY) % boundsY - halfBoundsY;
        const angle = time * rotationSpeed;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const rotatedX = posX * cosA - posZ * sinA;
        const rotatedZ = posX * sinA + posZ * cosA;
        const tiltAngle = 0.3;
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);

        target.set(
          rotatedX,
          posY * cosT - rotatedZ * sinT,
          posY * sinT + rotatedZ * cosT
        );

        const isHead = pId === 0 ? 1.0 : 0.0;
        const tailFade = pId / dropLength;
        const flicker = Math.max(0.0, Math.sin(time * 20.0 + i * 0.5)) * 0.15;
        const light = isHead * 0.98
          + (1.0 - isHead) * Math.max(0.01, 0.6 - tailFade * 1.0 + flicker);

        color.setHSL(0.333, 1.0 - isHead * 0.8, light);
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

const CubeBackground = () => (
  <ThreeBackgroundFrame>
    <CubeSwarm />
  </ThreeBackgroundFrame>
);

export default CubeBackground;
