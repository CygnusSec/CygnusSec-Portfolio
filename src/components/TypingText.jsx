import { useEffect, useState } from 'react';

const TypingText = ({ text, speed = 60, className = '' }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">▍</span>
    </span>
  );
};

export default TypingText;