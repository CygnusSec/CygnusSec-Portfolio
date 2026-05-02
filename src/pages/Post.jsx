import { useParams, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Post = () => {
  const { slug } = useParams();

  // Fetch post metadata from index
  const { data: posts, loading: loadingIndex } = useFetch('/content/posts/index.json');
  const post = posts?.find(p => p.slug === slug);

  // Fetch markdown content
  const { data: content, loading: loadingContent } = useFetch(
    slug ? `/content/posts/${slug}.md` : null
  );

  useDocumentTitle(post ? post.title : slug);

  if (loadingIndex || loadingContent) return (
    <div className="text-green-400 font-mono animate-pulse py-20 text-center">
      Loading...
    </div>
  );

  if (!post) return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-mono text-red-400 mb-4">404</h1>
      <p className="text-gray-400 mb-8">Post not found</p>
      <Link to="/posts" className="text-green-400 hover:text-green-300 transition">
        ← Back to Posts
      </Link>
    </div>
  );

  return (
    <article>
      <Link
        to="/posts"
        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-8 font-mono"
      >
        ← Back to Posts
      </Link>

      {/* Header */}
      <header className="mb-8 pb-8 border-b border-green-500/30">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-gray-400">
          <span>📅 {post.date}</span>
          <span>•</span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag}
                to="/posts"
                className="text-green-400 hover:text-green-300 transition text-sm"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="bg-glass border border-green-500/30 rounded-lg p-8">
        {content
          ? <MarkdownRenderer content={content} />
          : <p className="text-gray-400">Content coming soon...</p>
        }
      </div>
    </article>
  );
};

export default Post;
