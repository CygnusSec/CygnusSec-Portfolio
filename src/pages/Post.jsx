import { useParams, Link } from 'react-router-dom';
import posts from '../data/posts';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Post = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  // Set title based on post title
  useDocumentTitle(post ? post.title : '404 - Post Not Found');

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-mono text-red-400 mb-4">404</h1>
        <p className="text-gray-400 mb-8">Post not found</p>
        <Link to="/blog" className="text-green-400 hover:text-green-300 transition">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back Button */}
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-8 font-mono"
      >
        <span>←</span> Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-8 pb-8 border-b border-green-500/30">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-400">
          <span>📅 {post.date}</span>
          <span>•</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <Link 
                key={tag}
                to={`/tags`}
                className="text-green-400 hover:text-green-300 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-green max-w-none">
        <div className="bg-glass border border-green-500/30 rounded-lg p-8">
          <div className="text-gray-300 leading-relaxed space-y-6">
            {post.content ? (
              <div 
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <p>Content coming soon...</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-green-500/30">
        <div className="flex justify-between items-center">
          <Link 
            to="/blog" 
            className="text-green-400 hover:text-green-300 transition font-mono"
          >
            ← All Posts
          </Link>
          
          <Link 
            to="/about" 
            className="text-green-400 hover:text-green-300 transition font-mono"
          >
            Contact Me →
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default Post;
