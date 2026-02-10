import { Routes, Route } from 'react-router-dom';

import MatrixBackground from './components/MatrixBackground';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';

const App = () => {
  return (
    <>
      {/* FIXED HEADER – NGOÀI */}
      <Header />

      {/* BACKGROUND */}
      <MatrixBackground />
      <div className="matrix-overlay" />

      {/* CONTENT */}
      <div className="relative z-10 pt-[72px]">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/post/:slug"
            element={
              <main className="max-w-4xl mx-auto px-6 py-16">
                <Post />
              </main>
            }
          />

          <Route
            path="/about"
            element={
              <main className="max-w-4xl mx-auto px-6 py-16">
                <About />
              </main>
            }
          />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
