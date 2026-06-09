import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';

extend({ UnrealBloomPass });

const ThreeBackgroundFrame = ({
  children,
  autoRotateSpeed,
  cameraPosition = [0, 0, 100],
  target = [0, 0, 0],
}) => (
  <div className="matrix-cube-background" aria-hidden="true">
    <Canvas camera={{ position: cameraPosition, fov: 60 }}>
      <fog attach="fog" args={['#000000', 0.01]} />
      {children}
      <OrbitControls
        autoRotate
        autoRotateSpeed={autoRotateSpeed}
        enablePan={false}
        enableZoom={false}
        target={target}
      />
      <Effects disableGamma>
        <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
      </Effects>
    </Canvas>
  </div>
);

export default ThreeBackgroundFrame;
