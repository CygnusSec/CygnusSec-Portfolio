import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';

const Posts = () => {
  useDocumentTitle('Posts');
  const { data: posts, loading, error } = useFetch('/content/posts/index.json');
  const [selectedTag, setSelectedTag] = useState(null);

  if (loading) return (
    <section>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-2">
          <span className="text-white">&gt;</span> Posts
        </h1>
      </div>
      <div className="text-green-400 font-mono animate-pulse">Loading posts...</div>
    </section>
  );

  if (error) return (
    <section>
      <p className="text-red-400 font-mono">Error: {error}</p>
    </section>
  );

  const allTags = [...new Set((posts || []).flatMap(p => p.tags))];
  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags.includes(selectedTag))
    : posts;

  return (
    <section>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> Posts
        </h1>
        <p className="text-gray-400 text-lg">
          Personal experiences, thoughts on technology, science, and everything in between.
        </p>
      </div>

      {/* Tag filter */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded font-mono transition ${
              selectedTag === null
                ? 'bg-green-500/30 border-2 border-green-400 text-green-400'
                : 'bg-glass border border-green-500/30 text-gray-400 hover:border-green-400 hover:text-green-400'
            }`}
          >
            All ({posts.length})
          </button>
          {allTags.map(tag => {
            const count = posts.filter(p => p.tags.includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded font-mono transition ${
                  selectedTag === tag
                    ? 'bg-green-500/30 border-2 border-green-400 text-green-400'
                    : 'bg-glass border border-green-500/30 text-gray-400 hover:border-green-400 hover:text-green-400'
                }`}
              >
                #{tag} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      <h2 className="text-lg font-mono text-white mb-6">
        {selectedTag ? `#${selectedTag}` : 'All Posts'}
        <span className="text-green-400 ml-2">({filteredPosts.length})</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article
            key={post.slug}
            className="bg-glass border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition group flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded font-mono cursor-pointer hover:bg-green-500/20 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Link to={`/post/${post.slug}`}>
              <h3 className="text-lg font-mono text-green-400 group-hover:text-green-300 transition mb-2 leading-snug">
                {post.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 mb-3">📅 {post.date}</p>
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
            <Link
              to={`/post/${post.slug}`}
              className="inline-flex items-center gap-1 mt-4 text-green-400 hover:text-green-300 transition font-mono text-sm"
            >
              Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-400 font-mono">
          No posts found with tag #{selectedTag}.
        </div>
      )}
    </section>
  );
};

export default Posts;
