import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

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
        // Light mode: black chars on white bg
        ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      } else {
        // Dark mode: classic green on black
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
      }

      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    // Clear canvas when theme switches so old colors don't bleed through
    const handleThemeChange = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      reset();
    };

    // Watch for class changes on <html>
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const interval = setInterval(draw, 35);

    window.addEventListener('resize', () => { resize(); reset(); });

    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener('resize', resize);
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

export default MatrixBackground;
