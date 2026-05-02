import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
// Removed rehypeRaw for security - no raw HTML allowed
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
  const isLight = document.documentElement.classList.contains('light');

  // Sanitize content before rendering
  const sanitizedContent = content
    ?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    ?.replace(/javascript:/gi, '') // Remove javascript: protocol
    ?.replace(/data:/gi, '') // Remove data: protocol
    ?.replace(/vbscript:/gi, '') // Remove vbscript: protocol
    ?.replace(/on\w+\s*=/gi, '') // Remove event handlers
    || '';

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Code blocks with syntax highlighting
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={isLight ? oneLight : oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg !my-4 !text-sm"
                showLineNumbers
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className="px-1.5 py-0.5 rounded text-sm font-mono bg-green-500/10 text-green-400 border border-green-500/20"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-mono font-bold text-green-400 mt-8 mb-4 pb-2 border-b border-green-500/30">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-mono font-bold text-green-400 mt-7 mb-3 pb-1 border-b border-green-500/20">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-mono font-semibold text-green-300 mt-6 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-mono font-semibold text-green-300 mt-4 mb-2">
              {children}
            </h4>
          ),

          // Paragraph
          p: ({ children }) => (
            <p className="text-gray-300 leading-relaxed mb-4">
              {children}
            </p>
          ),

          // Links - Enhanced security
          a: ({ href, children }) => {
            // Sanitize href to prevent XSS
            const sanitizedHref = href
              ?.replace(/javascript:/gi, '')
              ?.replace(/data:/gi, '')
              ?.replace(/vbscript:/gi, '');
            
            // Only allow http/https links
            const isValidUrl = sanitizedHref && (
              sanitizedHref.startsWith('http://') || 
              sanitizedHref.startsWith('https://') ||
              sanitizedHref.startsWith('/')
            );

            if (!isValidUrl) {
              return <span className="text-gray-400">{children}</span>;
            }

            return (
              <a
                href={sanitizedHref}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-green-400 hover:text-green-300 underline underline-offset-2 transition"
              >
                {children}
              </a>
            );
          },

          // Lists
          ul: ({ children }) => (
            <ul className="list-none space-y-1.5 mb-4 pl-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1.5 mb-4 pl-4 text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-300 flex items-start gap-2">
              <span className="text-green-400 mt-1 flex-shrink-0">▸</span>
              <span>{children}</span>
            </li>
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-500 pl-4 my-4 bg-green-500/5 py-2 rounded-r-lg italic text-gray-400">
              {children}
            </blockquote>
          ),

          // Images - Enhanced security
          img: ({ src, alt }) => {
            // Sanitize src to prevent XSS
            const sanitizedSrc = src
              ?.replace(/javascript:/gi, '')
              ?.replace(/data:/gi, '')
              ?.replace(/vbscript:/gi, '');
            
            // Only allow http/https images
            const isValidImage = sanitizedSrc && (
              sanitizedSrc.startsWith('http://') || 
              sanitizedSrc.startsWith('https://') ||
              sanitizedSrc.startsWith('/')
            );

            if (!isValidImage) {
              return (
                <div className="my-6 p-4 border border-red-500/30 rounded-lg bg-red-500/5">
                  <p className="text-red-400 text-sm">⚠️ Invalid image source blocked for security</p>
                </div>
              );
            }

            return (
              <figure className="my-6">
                <img
                  src={sanitizedSrc}
                  alt={alt || 'Image'}
                  className="rounded-lg border border-green-500/30 max-w-full mx-auto block shadow-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {alt && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },

          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-green-500/10 border-b border-green-500/30">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-mono text-green-400 font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-gray-300 border-b border-green-500/10">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-green-500/5 transition">
              {children}
            </tr>
          ),

          // Horizontal rule
          hr: () => (
            <hr className="border-green-500/30 my-8" />
          ),

          // Strong / Em
          strong: ({ children }) => (
            <strong className="text-green-400 font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-gray-200 italic">{children}</em>
          ),

          // Block HTML elements for security
          html: () => null,
          script: () => null,
          style: () => null,
          iframe: () => null,
          object: () => null,
          embed: () => null,
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
