import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import posts from '../data/posts';
import PostCard from '../components/PostCard';
import TagList from '../components/TagList';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getPageTitleFromPath } from '../config/env';

const Blog = () => {
  const location = useLocation();
  const pageTitle = getPageTitleFromPath(location.pathname) || 'Blog';
  
  useDocumentTitle(); // Auto-detect from navigation config

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> {pageTitle}
        </h1>
        <p className="text-gray-400 text-lg">
          Insights on IDS/IPS, Blue Team operations, and cybersecurity research.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-8 mb-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Tags */}
      <div className="border-t border-green-500/30 pt-8">
        <h2 className="text-xl font-mono text-green-400 mb-4">
          Popular Tags
        </h2>
        <TagList />
      </div>
    </section>
  );
};

export default Blog;