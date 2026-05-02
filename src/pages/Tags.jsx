import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import posts from '../data/posts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getPageTitleFromPath } from '../config/env';

const Tags = () => {
  const location = useLocation();
  const pageTitle = getPageTitleFromPath(location.pathname) || 'Tags';
  
  useDocumentTitle(); // Auto-detect from navigation config
  
  // Extract all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.tags))];
  
  const [selectedTag, setSelectedTag] = useState(null);

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> {pageTitle}
        </h1>
        <p className="text-gray-400 text-lg">
          Browse posts by topic
        </p>
      </div>

      {/* Tags Grid */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3">
          {/* All Posts Button */}
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

          {/* Tag Buttons */}
          {allTags.map(tag => {
            const count = posts.filter(post => post.tags.includes(tag)).length;
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

      {/* Filtered Posts */}
      <div>
        <h2 className="text-2xl font-mono text-white mb-6">
          {selectedTag ? `Posts tagged with #${selectedTag}` : 'All Posts'}
          <span className="text-green-400 ml-2">({filteredPosts.length})</span>
        </h2>

        <div className="space-y-6">
          {filteredPosts.map(post => (
            <article 
              key={post.slug}
              className="bg-glass border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition"
            >
              <Link to={`/post/${post.slug}`}>
                <h3 className="text-xl font-mono text-green-400 hover:text-green-300 transition mb-2">
                  {post.title}
                </h3>
              </Link>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <span>📅 {post.date}</span>
                <span>•</span>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-green-400 cursor-pointer hover:underline"
                      onClick={() => setSelectedTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300">
                {post.excerpt}
              </p>

              <Link 
                to={`/post/${post.slug}`}
                className="inline-block mt-4 text-green-400 hover:text-green-300 transition font-mono text-sm"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No posts found with this tag.
          </div>
        )}
      </div>
    </section>
  );
};

export default Tags;
