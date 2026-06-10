import { useEffect, useRef } from 'react';

const shouldIgnoreBackgroundInteraction = (event) => (
  event.target.closest(
    'header, a, button, input, select, textarea, [role="button"], .background-switch'
  )
);

const RainBackground = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%^&*()*&^%';
    const fontSize = 16;

    let drops = [];
    const reset = () => {
      drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
    };
    reset();

    const isLight = () => document.documentElement.classList.contains('light');

    const draw = () => {
      if (isLight()) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
      }

      const zoom = zoomRef.current;
      ctx.font = `${fontSize * zoom}px monospace`;
      const isHome = window.location.pathname === '/';
      const pointerX = isHome && dragRef.current ? pointerRef.current.x : 0;
      const pointerY = isHome && dragRef.current ? pointerRef.current.y : 0;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const drift = Math.sin(y * 0.18 + i * 0.08) * pointerX * 12;
        const lift = Math.cos(i * 0.15) * pointerY * 8;
        ctx.fillText(text, i * fontSize * zoom + drift, y * fontSize * zoom + lift);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const handleThemeChange = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      reset();
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const interval = setInterval(draw, 35);
    const handleResize = () => {
      resize();
      reset();
    };

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
      pointerRef.current = {
        x: Math.max(-1.8, Math.min(1.8, pointerRef.current.x + deltaX * 0.012)),
        y: Math.max(-1.8, Math.min(1.8, pointerRef.current.y + deltaY * 0.012)),
      };
    };

    const handleWheel = (event) => {
      if (!isHome() || shouldIgnoreBackgroundInteraction(event)) return;
      event.preventDefault();
      const nextZoom = zoomRef.current - event.deltaY * 0.001;
      zoomRef.current = Math.max(0.65, Math.min(1.75, nextZoom));
    };

    const handleContextMenu = (event) => {
      if (!isHome() || shouldIgnoreBackgroundInteraction(event)) return;
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('pointerup', handlePointerUp, true);
    window.addEventListener('pointercancel', handlePointerUp, true);
    window.addEventListener('pointermove', handlePointerMove, true);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      document.body.style.userSelect = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('pointerup', handlePointerUp, true);
      window.removeEventListener('pointercancel', handlePointerUp, true);
      window.removeEventListener('pointermove', handlePointerMove, true);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default RainBackground;
