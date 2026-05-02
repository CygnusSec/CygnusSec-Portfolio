import { Routes, Route } from 'react-router-dom';

import MatrixBackground from './components/MatrixBackground';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import Posts from './pages/Posts';
import Projects from './pages/Projects';

const App = () => {
  return (
    <>
      <Header />

      <MatrixBackground />
      <div className="matrix-overlay" />

      <div className="relative z-10 pt-[70px]">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/about"
            element={
              <main className="px-12 py-16">
                <About />
              </main>
            }
          />

          <Route
            path="/projects"
            element={
              <main className="px-12 py-16">
                <Projects />
              </main>
            }
          />

          <Route
            path="/posts"
            element={
              <main className="px-12 py-16">
                <Posts />
              </main>
            }
          />

          <Route
            path="/post/:slug"
            element={
              <main className="px-12 py-16">
                <Post />
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
