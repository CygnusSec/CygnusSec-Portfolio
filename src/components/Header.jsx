import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { config } from '../config/env';
import useTheme from '../hooks/useTheme';
import CyberLogo from './CyberLogo';

const Header = () => {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-6">
      <div className="bg-glass border border-green-500/30 rounded-xl px-6 py-3 flex items-center justify-between">
        {/* LEFT: Identity */}
        <CyberLogo text={config.siteName} />

        {/* RIGHT: Nav + theme toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-3">
            {config.navButtons.map((btn) => {
              const isActive = location.pathname === btn.to ||
                              (btn.to !== '/' && location.pathname.startsWith(btn.to));
              return (
                <li key={btn.name}>
                  <Link
                    to={btn.to}
                    className={`btn-download ${isActive ? 'active-nav' : ''}`}
                  >
                    {btn.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="theme-toggle"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger button - mobile only */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded border border-green-500/40 text-green-400 hover:border-green-400 hover:bg-green-500/10 transition font-mono text-xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-0 bg-glass border border-green-500/30 rounded-xl px-4 py-3 flex flex-col gap-2">
          {config.navButtons.map((btn) => {
            const isActive = location.pathname === btn.to ||
                            (btn.to !== '/' && location.pathname.startsWith(btn.to));
            return (
              <Link
                key={btn.name}
                to={btn.to}
                onClick={closeMenu}
                className={`btn-download text-center ${isActive ? 'active-nav' : ''}`}
              >
                {btn.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
