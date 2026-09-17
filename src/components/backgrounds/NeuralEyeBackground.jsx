import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeBackgroundFrame from './ThreeBackgroundFrame';

const NeuralEyeSwarm = () => {
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
    const time = state.clock.getElapsedTime() * 1.5;
    const eyeRadius = 20;
    const neuralDensity = 1.2;
    const pulseIntensity = 0.4;
    const colorHue = 0.5;
    const t = time * 0.5;

    for (let i = 0; i < count; i++) {
      const pIndex = i / count;
      const phi = Math.acos(-1 + 2 * pIndex);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      const distFromFront = 1.0 - z;
      const pupilSize = 0.25;
      const isPupil = distFromFront < pupilSize;
      const neuralPattern = Math.sin(theta * 20 * neuralDensity)
        * Math.cos(phi * 20 * neuralDensity);
      const neuralPlexus = Math.abs(neuralPattern);
      let baseRadius = eyeRadius;

      baseRadius += Math.sin(phi * 10 - t) * eyeRadius * 0.03 * pulseIntensity;
      baseRadius *= neuralPlexus > 0.8 ? 1.02 : 0.98;

      if (isPupil) {
        const isPupilEdge = distFromFront > pupilSize - 0.02;
        baseRadius *= isPupilEdge ? 0.95 : 0.92;
      }

      target.set(x * baseRadius, y * baseRadius, z * baseRadius);

      let finalSaturation = 0.9;
      let finalLightness = 0.5;

      if (isPupil) {
        const isPupilEdge = distFromFront > pupilSize - 0.02;
        finalLightness = isPupilEdge ? 0.8 : 0.05;
        finalSaturation = isPupilEdge ? 0.0 : 0.1;
      } else {
        finalLightness = 0.2 + neuralPlexus * 0.7;
        finalSaturation = 0.7 + neuralPlexus * 0.3;
        finalLightness += Math.sin(t * 2.0 + theta * 10) * 0.1 * pulseIntensity;
      }

      const depthFactor = (z + 1.0) / 2.0;
      finalLightness *= Math.pow(depthFactor, 1.5);
      color.setHSL(colorHue, finalSaturation, Math.max(0, finalLightness));

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

const NeuralEyeBackground = () => (
  <ThreeBackgroundFrame autoRotateSpeed={1.1} cameraPosition={[0, 0, 85]}>
    <NeuralEyeSwarm />
  </ThreeBackgroundFrame>
);

export default NeuralEyeBackground;
