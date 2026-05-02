import { useState, useEffect } from 'react';
import PdfList from '../components/PdfList';
import SkillBar from '../components/SkillBar';
import MarkdownRenderer from '../components/MarkdownRenderer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';

const Projects = () => {
  useDocumentTitle('Projects');

  const { data: projects, loading } = useFetch('/content/projects/index.json');
  const [activeId, setActiveId] = useState(null);
  const [mdContent, setMdContent] = useState('');
  const [mdLoading, setMdLoading] = useState(false);

  // Set default active tab once projects load
  useEffect(() => {
    if (projects?.length && !activeId) {
      setActiveId(projects[0].id);
    }
  }, [projects]);

  // Fetch markdown when tab changes
  useEffect(() => {
    if (!activeId) return;
    setMdLoading(true);
    fetch(`/content/projects/${activeId}.md`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then(r => r.text())
      .then(text => { setMdContent(text); setMdLoading(false); })
      .catch(() => { setMdContent('Content not found.'); setMdLoading(false); });
  }, [activeId]);

  if (loading) return (
    <section>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> Projects
        </h1>
      </div>
      <div className="text-green-400 font-mono animate-pulse">Loading projects...</div>
    </section>
  );

  const active = projects?.find(p => p.id === activeId);

  return (
    <section>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> Projects
        </h1>
        <p className="text-gray-400 text-lg">Research, lab work, and tools</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-green-500/30 overflow-x-auto pb-2 mb-8">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`font-mono transition whitespace-nowrap rounded-lg ${
              activeId === p.id
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {active && (
        <div className="animate-fadeIn">
          <div className={`grid gap-6 mb-6 ${active.skills?.length > 0 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Markdown content */}
            <div className="bg-glass border border-green-500/30 rounded-lg p-6">
              {mdLoading
                ? <div className="text-green-400 font-mono animate-pulse">Loading...</div>
                : <MarkdownRenderer content={mdContent} />
              }
            </div>

            {/* Skills */}
            {active.skills?.length > 0 && (
              <div className="bg-glass border border-green-500/30 rounded-lg p-6">
                <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">⚙️ Technologies Used</h3>
                <div className="space-y-3">
                  {active.skills.map(s => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PDFs */}
          {active.hasPdfs && (
            <div className="bg-glass border border-green-500/30 rounded-lg p-6">
              <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">📚 Lab Reports & Documentation</h3>
              <PdfList />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
