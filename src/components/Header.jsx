import { Link, useLocation } from 'react-router-dom';
import { config } from '../config/env';
import useTheme from '../hooks/useTheme';

const Header = () => {
  const location = useLocation();
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-6">
      <div className="bg-glass border border-green-500/30 rounded-xl px-6 py-3 flex items-center justify-between">
        {/* LEFT: Identity */}
        <Link
          to="/"
          className="logo-cyber text-green-400 hover:text-green-300 transition"
        >
          {config.siteName}
        </Link>

        {/* RIGHT: Nav + theme toggle */}
        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
