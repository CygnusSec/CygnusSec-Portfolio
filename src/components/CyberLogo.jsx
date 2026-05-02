import { Link } from 'react-router-dom';

const CyberLogo = ({ text }) => {
  return (
    <Link to="/" className="logo-cyber inline-flex items-center">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="logo-char"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Link>
  );
};

export default CyberLogo;
