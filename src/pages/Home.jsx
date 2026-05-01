import LinuxImage from '../images/linux.png';
import TypingText from '../components/TypingText';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('', true); // Use default site title

  return (
    <section className="min-h-screen flex items-center px-[6vw]">
      <div className="w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-24 items-center">

        {/* LEFT */}
        <div>
          {/* HEADLINE */}
          <h1 className="font-mono font-bold leading-tight">
            <div className="text-5xl md:text-6xl text-white">
              Secure Your Future
            </div>

            <div className="relative text-6xl md:text-5xl text-green-400">
            {/* text giữ chỗ */}
            <span className="invisible">with Ethical Hacking</span>

            {/* typing overlay */}
            <span className="absolute left-0 top-0">
                <TypingText
                text="with Ethical Hacking"
                speed={100}
                />
            </span>

            </div>

            <div className="text-6xl md:text-6xl text-white">
              Done Right
            </div>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-2xl text-lg text-gray-400 leading-relaxed">
            From deep-dive penetration testing to proactive threat monitoring,
            I provide tailored solutions to secure your network and protect
            your business.
          </p>

          {/* CTA */}
          <div className="mt-10 flex items-center gap-8">
            <a
              href="/about"
              className="text-white font-mono hover:underline"
            >
              More About Me →
            </a>

            <a
              href="/about"
              className="
                px-6 py-3
                border border-green-400
                text-green-300 font-mono
                hover:bg-green-400/10
                transition
              "
            >
              Contact Me!
            </a>
          </div>
        </div>

        {/* RIGHT – AVATAR */}
        <div className="flex justify-center md:justify-end">
          <div className="
            w-[420px] h-[420px]
            rounded-full
            border-[14px] border-green-400
            shadow-[0_0_80px_rgba(0,255,0,0.35)]
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
