import { useEffect, useRef } from 'react';

const ghostProtocol = {
  channel: 'blue',
  bitDepth: 1,
  selection: 'texture',
  ordering: 'seeded-shuffle',
  origin: 'stylesheet',
};

const GhostPixelsHint = () => {
  const hintRef = useRef(null);

  useEffect(() => {
    const hint = document.createComment(`
  GHOST PROTOCOL // 03
  The sequence is deterministic.
  A shuffled path can be reconstructed when its origin is known.
  Look where the styles hide their secrets.
`);

    const element = hintRef.current;
    element?.appendChild(hint);

    return () => hint.remove();
  }, []);

  return (
    <section
      ref={hintRef}
      className="challenge-hint bg-glass border border-green-500/30 rounded-lg p-6 md:p-8 mt-6"
      aria-labelledby="ghost-pixels-title"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-green-400 mb-3">
        Steganography / Forensics
      </p>
      <h2 id="ghost-pixels-title" className="text-2xl md:text-3xl font-mono font-bold mb-5">
        Ghost Pixels — The Hidden Origin
      </h2>
      <div className="space-y-3 text-gray-400 leading-relaxed">
        <p>Two images may look identical, yet their differences tell another story.</p>
        <p>The smallest changes reveal where the ghost has been, but not necessarily the path it followed.</p>
        <p>Every seemingly random journey begins somewhere.</p>
        <p className="italic text-green-400">
          The image holds the secret. The website remembers the beginning.
        </p>
        <p>Look beneath the surface, follow the hidden instructions, and reconstruct the path.</p>
      </div>

      <div
        id="ghost"
        data-cipher="base64"
        data-location={ghostProtocol.origin}
        data-channel={ghostProtocol.channel}
        data-bit-depth={ghostProtocol.bitDepth}
        data-selection={ghostProtocol.selection}
        data-ordering={ghostProtocol.ordering}
        hidden
      />
    </section>
  );
};

export default GhostPixelsHint;
