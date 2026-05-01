import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <article className="bg-glass border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition group">
    <Link to={`/post/${post.slug}`}>
      <h2 className="text-green-400 font-mono text-2xl group-hover:text-green-300 transition mb-3">
        {post.title}
      </h2>
    </Link>
    
    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
      <span>📅 {post.date}</span>
      <span>•</span>
      <div className="flex gap-2">
        {post.tags.map(tag => (
          <span key={tag} className="text-green-400">
            #{tag}
          </span>
        ))}
      </div>
    </div>

    <p className="text-gray-300 leading-relaxed mb-4">
      {post.excerpt}
    </p>

    <Link 
      to={`/post/${post.slug}`}
      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition font-mono text-sm"
    >
      Read more 
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  </article>
);

export default PostCard;
