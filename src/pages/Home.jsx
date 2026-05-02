import { useState, useCallback, useEffect, useRef } from 'react';
import LinuxImage from '../images/linux.png';
import TypingText from '../components/TypingText';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { config } from '../config/env';

const Home = () => {
  useDocumentTitle('', true);

  const SPEED = config.typingSpeed;
  const RESTART_DELAY = config.typingRestartDelay;

  // 0=greeting, 1=nameEN, 2=nameVI, 3=role, 4=bio, 5=done
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0); // tăng key để force re-mount TypingText
  const timerRef = useRef(null);

  const next = useCallback((s) => () => setStep(s), []);

  // Khi bio xong (step=5), đợi 5s rồi restart
  useEffect(() => {
    if (step === 5) {
      timerRef.current = setTimeout(() => {
        setStep(0);
        setKey(k => k + 1);
      }, RESTART_DELAY);
    }
    return () => clearTimeout(timerRef.current);
  }, [step]);

  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center px-[6vw] overflow-hidden py-8 md:py-0">
      <div className="w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-16 items-center md:items-start">

        {/* LEFT */}
        <div key={key} className="order-2 md:order-1">

          {/* GREETING */}
          <p className="font-mono text-green-400 text-sm md:text-base mb-2 tracking-widest uppercase">
            <TypingText text="Hi, my name is" speed={SPEED} wordMode onDone={next(1)} />
          </p>

          {/* NAME */}
          <h1 className="font-mono font-bold leading-tight mb-4">
            <div className="text-4xl md:text-5xl lg:text-6xl text-white">
              {step >= 1 && (
                <TypingText text={config.author.nameEn} speed={SPEED} wordMode onDone={next(2)} />
              )}
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl text-green-400 mt-3">
              {step >= 2 && (
                <TypingText text={config.author.name} speed={SPEED} wordMode onDone={next(3)} />
              )}
            </div>
          </h1>

          {/* ROLE */}
          <p className="font-mono text-gray-400 text-xs md:text-sm mb-4 tracking-wide">
            {step >= 3 && (
              <TypingText text={config.author.position} speed={SPEED} wordMode onDone={next(4)} />
            )}
          </p>

          {/* BIO */}
          <p className="max-w-xl text-sm md:text-base text-gray-300 leading-relaxed">
            {step >= 4 && (
              <TypingText
                text="I research and build security systems, DevOps infrastructure, and operational automation. Passionate about exploring technology, sharing knowledge, and continuous learning."
                speed={SPEED}
                wordMode
                onDone={next(5)}
              />
            )}
          </p>

        </div>

        {/* RIGHT – AVATAR */}
        <div className="flex justify-center order-1 md:order-2 md:justify-end">
          <div className="
            w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96
            rounded-full
            border-[6px] md:border-[10px] border-green-400
            shadow-[0_0_60px_rgba(0,255,0,0.3)]
            overflow-hidden
          ">
            <img
              src={LinuxImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;
