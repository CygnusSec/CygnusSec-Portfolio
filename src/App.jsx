import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import MatrixBackground from './components/MatrixBackground';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import Posts from './pages/Posts';
import Projects from './pages/Projects';
import Project from './pages/Project';

const backgroundVariants = ['cube', 'sphere', 'tesseract', 'liquid', 'helios', 'blackhole', 'emerald', 'node', 'hypersphere', 'cloud', 'magnetar', 'janus', 'bloom', 'spacetime', 'neuralnet1', 'rain'];
const backgroundLabels = {
  cube: 'Cube',
  sphere: 'Sphere',
  tesseract: 'Tesseract',
  liquid: 'Liquid',
  helios: 'Helios',
  blackhole: 'TON618',
  emerald: 'Emerald',
  node: 'Node',
  hypersphere: 'Hypersphere',
  cloud: 'Cloud',
  magnetar: 'Magnetar',
  janus: 'Janus',
  bloom: 'Bloom',
  spacetime: 'Spacetime',
  neuralnet1: 'Neural Net 1',
  rain: 'Matrix',
};

const getRandomBackgroundVariant = () => (
  backgroundVariants[Math.floor(Math.random() * backgroundVariants.length)]
);

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [backgroundVariant, setBackgroundVariant] = useState(getRandomBackgroundVariant);
  const [backgroundMenuOpen, setBackgroundMenuOpen] = useState(false);

  const selectBackground = (variant) => {
    setBackgroundVariant(variant);
    setBackgroundMenuOpen(false);
  };

  return (
    <>
      <Header />

      <MatrixBackground variant={backgroundVariant} />
      <div className="matrix-overlay" />
      <div
        className="background-switch"
        title="Select background"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setBackgroundMenuOpen(false);
          }
        }}
      >
        <button
          type="button"
          className="background-switch__trigger"
          onClick={() => setBackgroundMenuOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={backgroundMenuOpen}
          aria-label="Select background"
        >
          <span className="background-switch__label">BG</span>
          <span className="background-switch__value">
            {backgroundLabels[backgroundVariant]}
          </span>
          <span className="background-switch__chevron">▾</span>
        </button>

        {backgroundMenuOpen && (
          <div className="background-switch__menu" role="listbox" aria-label="Background options">
            {backgroundVariants.map((variant) => (
              <button
                key={variant}
                type="button"
                className={`background-switch__option ${variant === backgroundVariant ? 'is-active' : ''}`}
                onClick={() => selectBackground(variant)}
                role="option"
                aria-selected={variant === backgroundVariant}
              >
                {backgroundLabels[variant]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 pt-[70px] flex flex-col min-h-screen">
        <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/about"
            element={
              <main className="px-4 md:px-12 py-16">
                <About />
              </main>
            }
          />

          <Route
            path="/projects"
            element={
              <main className="px-4 md:px-12 py-16">
                <Projects />
              </main>
            }
          />

          <Route
            path="/posts"
            element={
              <main className="px-4 md:px-12 py-16">
                <Posts />
              </main>
            }
          />

          <Route
            path="/post/:slug"
            element={
              <main className="px-4 md:px-12 py-16">
                <Post />
              </main>
            }
          />

          <Route
            path="/project/:id"
            element={
              <main className="px-4 md:px-12 py-16">
                <Project />
              </main>
            }
          />

          {/* Redirect mọi path không tồn tại về home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </div>

        {!isHome && <Footer />}
      </div>

      {isHome && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
