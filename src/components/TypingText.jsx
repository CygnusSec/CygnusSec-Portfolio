import { useEffect, useState } from 'react';

const TypingText = ({ text, speed = 60, wordMode = false, onDone, className = '' }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  const tokens = wordMode ? text.split(' ') : text.split('');

  useEffect(() => {
    setDisplayed('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < tokens.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev =>
          wordMode
            ? prev + (prev ? ' ' : '') + tokens[index]
            : prev + tokens[index]
        );
        setIndex(i => i + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (index === tokens.length && tokens.length > 0) {
      onDone?.();
    }
  }, [index, tokens, speed, wordMode, onDone]);

  return (
    <span className={className}>
      {displayed}
      {index < tokens.length && <span className="animate-pulse">▍</span>}
    </span>
  );
};

export default TypingText;