import { useEffect, useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';

extend({ UnrealBloomPass });

const shouldIgnoreBackgroundInteraction = (event) => (
  event.target.closest(
    'header, a, button, input, select, textarea, [role="button"], .background-switch'
  )
);

const CursorReactiveScene = ({ children }) => {
  const groupRef = useRef(null);
  const dragRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const rotationTargetRef = useRef({ x: 0, y: 0, z: 0 });
  const zoomTargetRef = useRef(1);

  useEffect(() => {
    const isHome = () => window.location.pathname === '/';

    const handlePointerDown = (event) => {
      if (!isHome() || event.button !== 2 || shouldIgnoreBackgroundInteraction(event)) {
        dragRef.current = false;
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      document.body.style.userSelect = 'none';
      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      dragRef.current = true;
    };

    const handlePointerUp = () => {
      dragRef.current = false;
      document.body.style.userSelect = '';
    };

    const handlePointerMove = (event) => {
      if (!isHome() || !dragRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      const nextX = rotationTargetRef.current.x + deltaY * 0.006;
      const nextY = rotationTargetRef.current.y + deltaX * 0.006;
      rotationTargetRef.current = {
        x: Math.max(-1.2, Math.min(1.2, nextX)),
        y: nextY,
        z: rotationTargetRef.current.z + deltaX * 0.0012,
      };
    };

    const handleWheel = (event) => {
      if (!isHome() || shouldIgnoreBackgroundInteraction(event)) return;
      event.preventDefault();
      const nextZoom = zoomTargetRef.current - event.deltaY * 0.001;
      zoomTargetRef.current = Math.max(0.6, Math.min(1.8, nextZoom));
    };

    const handleContextMenu = (event) => {
      if (!isHome() || shouldIgnoreBackgroundInteraction(event)) return;
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('pointerup', handlePointerUp, true);
    window.addEventListener('pointercancel', handlePointerUp, true);
    window.addEventListener('pointermove', handlePointerMove, true);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      document.body.style.userSelect = '';
      window.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('pointerup', handlePointerUp, true);
      window.removeEventListener('pointercancel', handlePointerUp, true);
      window.removeEventListener('pointermove', handlePointerMove, true);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const isHome = window.location.pathname === '/';
    const targetRotation = isHome ? rotationTargetRef.current : { x: 0, y: 0, z: 0 };
    const targetScale = isHome ? zoomTargetRef.current : 1;

    groupRef.current.rotation.x += (targetRotation.x - groupRef.current.rotation.x) * 0.14;
    groupRef.current.rotation.y += (targetRotation.y - groupRef.current.rotation.y) * 0.14;
    groupRef.current.rotation.z += (targetRotation.z - groupRef.current.rotation.z) * 0.1;
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.12;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.12;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.12;
  });

  return <group ref={groupRef}>{children}</group>;
};

const ThreeBackgroundFrame = ({
  children,
  autoRotateSpeed,
  cameraPosition = [0, 0, 100],
  target = [0, 0, 0],
}) => (
  <div className="matrix-cube-background" aria-hidden="true">
    <Canvas camera={{ position: cameraPosition, fov: 60 }}>
      <fog attach="fog" args={['#000000', 0.01]} />
      <CursorReactiveScene>
        {children}
      </CursorReactiveScene>
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
