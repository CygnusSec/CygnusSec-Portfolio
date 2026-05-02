import { Routes, Route } from 'react-router-dom';

import MatrixBackground from './components/MatrixBackground';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import Blog from './pages/Blog';
import Tags from './pages/Tags';
import Projects from './pages/Projects';

const App = () => {
  return (
    <>
      {/* FIXED HEADER */}
      <Header />

      {/* BACKGROUND */}
      <MatrixBackground />
      <div className="matrix-overlay" />

      {/* CONTENT */}
      <div className="relative z-10 pt-[88px]">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/about"
            element={
              <main className="max-w-5xl mx-auto px-6 py-16">
                <About />
              </main>
            }
          />

          <Route
            path="/researches"
            element={
              <main className="max-w-5xl mx-auto px-6 py-16">
                <Projects />
              </main>
            }
          />

          <Route
            path="/blog"
            element={
              <main className="max-w-4xl mx-auto px-6 py-16">
                <Blog />
              </main>
            }
          />

          <Route
            path="/post/:slug"
            element={
              <main className="max-w-4xl mx-auto px-6 py-16">
                <Post />
              </main>
            }
          />

          <Route
            path="/tags"
            element={
              <main className="max-w-4xl mx-auto px-6 py-16">
                <Tags />
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
