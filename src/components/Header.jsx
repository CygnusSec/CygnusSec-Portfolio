import { Link, useLocation } from 'react-router-dom';
import { config } from '../config/env';

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-4 px-4 md:px-8">
      {/* Glass full-width bar */}
      <div className="bg-glass border-b border-green-500/30 rounded-lg">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          {/* LEFT: Identity */}
          <Link
            to="/"
            className="logo-cyber text-green-400 hover:text-green-300 transition"
          >
            {config.siteName}
          </Link>

          {/* RIGHT */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
