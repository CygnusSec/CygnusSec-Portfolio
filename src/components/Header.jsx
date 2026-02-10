import { Link } from 'react-router-dom';
import headerButtons from '../data/headerButtons';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 sticky top-0 z-20 w-full">
      {/* Glass full-width bar */}
      <div className="bg-glass border-b border-green-500/30">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          {/* LEFT: Identity */}
          <Link
            to="/"
            className="font-mono text-green-400 text-base md:text-lg hover:text-green-300 transition"
          >
            CygnusSec
          </Link>

          {/* RIGHT */}
          <ul className="flex items-center gap-3">
            {headerButtons.map((btn) => (
              <li key={btn.name}>
                <Link to={btn.to} className="btn-menu">
                  {btn.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
