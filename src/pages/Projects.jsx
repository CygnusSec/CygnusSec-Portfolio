import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';

const Projects = () => {
  useDocumentTitle('Projects');
  const { data: projects, loading, error } = useFetch('/content/projects/index.json');
  const [selectedTag, setSelectedTag] = useState(null);

  if (loading) return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-2">
          <span className="text-white">&gt;</span> Projects
        </h1>
      </div>
      <div className="text-green-400 font-mono animate-pulse">Loading projects...</div>
    </section>
  );

  if (error) return (
    <section>
      <p className="text-red-400 font-mono">Error: {error}</p>
    </section>
  );

  const allTags = [...new Set((projects || []).flatMap(p => p.tags || []))];
  const filtered = selectedTag
    ? projects.filter(p => p.tags?.includes(selectedTag))
    : projects;

  return (
    <section>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> Projects
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Research, lab work, and security tools.
        </p>
      </div>

      {/* Tag filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded font-mono transition ${
              selectedTag === null
                ? 'bg-green-500/30 border-2 border-green-400 text-green-400'
                : 'bg-glass border border-green-500/30 text-gray-400 hover:border-green-400 hover:text-green-400'
            }`}
          >
            All ({projects.length})
          </button>
          {allTags.map(tag => {
            const count = projects.filter(p => p.tags?.includes(tag)).length;
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
      <h2 className="text-lg font-mono text-white mb-5">
        {selectedTag ? `#${selectedTag}` : 'All Projects'}
        <span className="text-green-400 ml-2">({filtered.length})</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => (
          <article
            key={project.id}
            className="bg-glass border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition group flex flex-col"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags?.map(tag => (
                <span
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded font-mono cursor-pointer hover:bg-green-500/20 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <Link to={`/project/${project.id}`}>
              <h3 className="text-lg font-mono text-green-400 group-hover:text-green-300 transition mb-2 leading-snug">
                {project.title}
              </h3>
            </Link>

            {/* Date */}
            <p className="text-xs text-gray-500 mb-3">📅 {project.date}</p>

            {/* Excerpt */}
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.excerpt}</p>

            {/* View more */}
            <Link
              to={`/project/${project.id}`}
              className="inline-flex items-center gap-1 mt-5 text-green-400 hover:text-green-300 transition font-mono text-sm"
            >
              View project <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 font-mono">
          No projects found with tag #{selectedTag}.
        </div>
      )}
    </section>
  );
};

export default Projects;
