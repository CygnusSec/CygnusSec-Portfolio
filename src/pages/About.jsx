import { config } from '../config/env';
import useDocumentTitle from '../hooks/useDocumentTitle';
import LinuxImage from '../images/linux.png';
import SkillBar from '../components/SkillBar';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { bio, expertise } from '../data/about';

const About = () => {
  useDocumentTitle('About');

  return (
    <section>
      {/* Page title */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-2">
          <span className="text-white">&gt;</span> About
        </h1>
        <p className="text-gray-400 text-lg">Researcher · DevOps Engineer · Lifelong Learner</p>
      </div>

      {/* CV layout: left sidebar + right content */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ══════════════════════════════
            LEFT SIDEBAR — single card
        ══════════════════════════════ */}
        <aside className="lg:w-72 xl:w-80 flex-shrink-0">
          <div className="bg-glass border border-green-500/30 rounded-lg p-6 flex flex-col items-center text-center gap-5">

            {/* Avatar + name */}
            <div className="flex flex-col items-center">
              <div className="avatar-matrix mb-4" style={{ width: '8rem', height: '8rem' }}>
                <img src={LinuxImage} alt="Profile" />
              </div>
              <h2 className="text-xl font-mono text-green-400 mb-0.5">{config.author.nameEn}</h2>
              <p className="text-green-300/70 text-sm mb-1">{config.author.name}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{config.author.position}</p>
              <p className="text-gray-600 text-xs mt-1">{config.author.organization}</p>
            </div>

            <div className="w-full border-t border-green-500/20" />

            {/* Contact */}
            <div className="w-full text-left space-y-3 text-sm">
              <p className="text-xs font-mono text-green-400 uppercase tracking-widest">Contact</p>

              <div className="flex items-start gap-3">
                {/* Gmail */}
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                </svg>
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs">Email</p>
                  <a href={`mailto:${config.contact.email}`}
                    className="text-green-300 hover:text-green-400 transition break-all text-xs">
                    {config.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {/* Location pin */}
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4ade80"/>
                </svg>
                <div>
                  <p className="text-gray-500 text-xs">Location</p>
                  <p className="text-gray-300 text-xs">{config.author.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {/* GitHub */}
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs">GitHub</p>
                  <a href={config.contact.github.url} target="_blank" rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-400 transition text-xs break-all">
                    github.com/{config.contact.github.username}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {/* LinkedIn */}
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs">LinkedIn</p>
                  <a href={config.contact.linkedin.url} target="_blank" rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-400 transition text-xs break-all">
                    linkedin.com/in/{config.contact.linkedin.username}
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-green-500/20" />

            {/* Links */}
            <div className="w-full text-left space-y-1">
              <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-2">Links</p>
              {[
                { href: '/projects', icon: '🛡️', label: 'Projects' },
                { href: '/posts',    icon: '📝', label: 'Posts'    },
              ].map(link => (
                <a key={link.label} href={link.href}
                  className="flex items-center gap-3 p-2 rounded hover:bg-green-500/10 transition text-green-300 hover:text-green-400">
                  <span>{link.icon}</span>
                  <span className="font-mono text-sm">{link.label}</span>
                </a>
              ))}
            </div>

          </div>
        </aside>

        {/* ══════════════════════════════
            RIGHT CONTENT — grid
        ══════════════════════════════ */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">

          {/* Bio */}
          <div className="bg-glass border border-green-500/30 rounded-lg p-6 md:col-span-2">
            <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">Bio</h3>
            <MarkdownRenderer content={bio} />
          </div>

          {/* Expertise */}
          <div className="bg-glass border border-green-500/30 rounded-lg p-6">
            <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">Expertise</h3>
            <MarkdownRenderer content={expertise} />
          </div>

          {/* Security & Infra skills */}
          <div className="bg-glass border border-green-500/30 rounded-lg p-6">
            <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">🛡️ Security & Infra</h3>
            <div className="space-y-3">
              {[
                { name: 'Linux (Ubuntu/Debian)', level: 95 },
                { name: 'Docker / Kubernetes',   level: 88 },
                { name: 'Snort / Suricata',      level: 85 },
                { name: 'Firewall (iptables)',    level: 85 },
                { name: 'Wireshark',             level: 82 },
              ].map(s => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>

          {/* Dev & Automation skills */}
          <div className="bg-glass border border-green-500/30 rounded-lg p-6">
            <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">⚡ Dev & Automation</h3>
            <div className="space-y-3">
              {[
                { name: 'Bash Scripting',  level: 90 },
                { name: 'Python',          level: 85 },
                { name: 'CI/CD Pipelines', level: 80 },
                { name: 'JavaScript',      level: 75 },
                { name: 'YAML / JSON',     level: 80 },
              ].map(s => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>

          {/* Networking */}
          <div className="bg-glass border border-green-500/30 rounded-lg p-6">
            <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-4">🌐 Networking</h3>
            <div className="space-y-3">
              {[
                { name: 'TCP/IP',            level: 90 },
                { name: 'VPN Configuration', level: 80 },
                { name: 'Network Analysis',  level: 90 },
                { name: 'Packet Inspection', level: 85 },
                { name: 'DNS / HTTP / TLS',  level: 82 },
              ].map(s => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
