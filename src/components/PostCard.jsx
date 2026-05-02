import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <article className="bg-glass border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition group flex flex-col h-full">
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-3">
      {post.tags.map(tag => (
        <span key={tag} className="text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded font-mono">
          #{tag}
        </span>
      ))}
    </div>

    {/* Title */}
    <Link to={`/post/${post.slug}`}>
      <h2 className="text-green-400 font-mono text-lg group-hover:text-green-300 transition mb-2 leading-snug">
        {post.title}
      </h2>
    </Link>

    {/* Date */}
    <p className="text-xs text-gray-500 mb-3">📅 {post.date}</p>

    {/* Excerpt - grows to fill space */}
    <p className="text-gray-400 text-sm leading-relaxed flex-1">
      {post.excerpt}
    </p>

    {/* Read more - always at bottom */}
    <Link
      to={`/post/${post.slug}`}
      className="inline-flex items-center gap-1 mt-4 text-green-400 hover:text-green-300 transition font-mono text-sm"
    >
      Read more
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  </article>
);

export default PostCard;
