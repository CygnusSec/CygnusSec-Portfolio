import { useParams, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';
import MarkdownRenderer from '../components/MarkdownRenderer';
import SkillBar from '../components/SkillBar';
import PdfList from '../components/PdfList';

const Project = () => {
  const { id } = useParams();

  const { data: projects, loading: loadingIndex } = useFetch('/content/projects/index.json');
  const project = projects?.find(p => p.id === id);

  const { data: content, loading: loadingContent } = useFetch(
    id ? `/content/projects/${id}.md` : null
  );

  useDocumentTitle(project ? project.title : id);

  if (loadingIndex || loadingContent) return (
    <div className="text-green-400 font-mono animate-pulse py-20 text-center">
      Loading...
    </div>
  );

  if (!project) return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-mono text-red-400 mb-4">404</h1>
      <p className="text-gray-400 mb-8">Project not found</p>
      <Link to="/projects" className="text-green-400 hover:text-green-300 transition">
        ← Back to Projects
      </Link>
    </div>
  );

  return (
    <article>
      {/* Back link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-8 font-mono text-sm"
      >
        ← Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-8 pb-8 border-b border-green-500/30">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-green-400 mb-4 break-words">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>📅 {project.date}</span>
          <span>•</span>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map(tag => (
              <Link
                key={tag}
                to="/projects"
                className="text-green-400 hover:text-green-300 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Content + Skills */}
      <div className={`grid gap-6 mb-6 ${project.skills?.length > 0 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Markdown */}
        <div className="bg-glass border border-green-500/30 rounded-lg p-4 md:p-8">
          {content
            ? <MarkdownRenderer content={content} />
            : <p className="text-gray-400">Content coming soon...</p>
          }
        </div>

        {/* Skills */}
        {project.skills?.length > 0 && (
          <div className="bg-glass border border-green-500/30 rounded-lg p-6">
            <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">⚙️ Technologies Used</h3>
            <div className="space-y-3">
              {project.skills.map(s => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PDFs */}
      {project.hasPdfs && (
        <div className="bg-glass border border-green-500/30 rounded-lg p-6">
          <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">📚 Lab Reports & Documentation</h3>
          <PdfList />
        </div>
      )}
    </article>
  );
};

export default Project;
