const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScCe3nHAUSvg2q7NjCDgpz9AT702VgZAXGZxDkdBC50w00SpA/viewform';

const CtfWriteup = () => {
  return (
    <section className="mt-8">
      <div className="mb-8">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-green-400 mb-3">
          CygnusSec CTF
        </p>
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> Submit CTF Writeup
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Submit your solution through the official Google Form. Include the
          discovery path and enough technical detail for the solution to be
          reproduced.
        </p>
      </div>

      <div className="bg-glass border border-green-500/30 rounded-xl overflow-hidden">
        <iframe
          src={`${FORM_URL}?embedded=true`}
          title="CygnusSec CTF writeup submission form"
          className="ctf-writeup-frame"
          loading="lazy"
        >
          Loading Google Form…
        </iframe>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm">
        <p className="text-gray-500 font-mono">
          Form not loading? It may require Google sign-in or public access.
        </p>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-download"
        >
          Open Google Form ↗
        </a>
      </div>
    </section>
  );
};

export default CtfWriteup;
