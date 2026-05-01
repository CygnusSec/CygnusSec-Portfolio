import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PdfList from '../components/PdfList';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getPageTitleFromPath } from '../config/env';

const Projects = () => {
  const location = useLocation();
  const pageTitle = getPageTitleFromPath(location.pathname) || 'Projects';
  
  useDocumentTitle(); // Auto-detect from navigation config
  const [activeTab, setActiveTab] = useState('ids-ips');

  return (
    <section className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> {pageTitle}
        </h1>
        <p className="text-gray-400 text-lg">
          Explore my cybersecurity research projects and lab work
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-3 border-b border-green-500/30 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('ids-ips')}
            className={`font-mono transition whitespace-nowrap rounded-lg ${
              activeTab === 'ids-ips'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            IDS/IPS Research
          </button>
          <button
            onClick={() => setActiveTab('network-security')}
            className={`font-mono transition whitespace-nowrap rounded-lg ${
              activeTab === 'network-security'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            Network Security
          </button>
          <button
            onClick={() => setActiveTab('blue-team')}
            className={`font-mono transition whitespace-nowrap rounded-lg ${
              activeTab === 'blue-team'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            Blue Team Labs
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`font-mono transition whitespace-nowrap rounded-lg ${
              activeTab === 'tools'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            Security Tools
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* IDS/IPS Research Tab */}
        {activeTab === 'ids-ips' && (
          <div className="animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Project Overview */}
              <div className="bg-glass p-6 rounded-lg border border-green-500/30">
                <h2 className="text-2xl font-mono text-green-400 mb-4 flex items-center gap-2">
                  <span>🛡️</span> Project Overview
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Comprehensive research on Intrusion Detection and Prevention Systems, 
                    focusing on Snort IDS/IPS implementation and custom rule development.
                  </p>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-mono text-green-400 mb-3">Key Focus Areas</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>Snort rule development and optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>Network traffic analysis and monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>DDoS attack detection and mitigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>Firewall configuration (iptables)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">▸</span>
                        <span>Security threat scanning and assessment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="bg-glass p-6 rounded-lg border border-green-500/30">
                <h2 className="text-2xl font-mono text-green-400 mb-4 flex items-center gap-2">
                  <span>⚙️</span> Technologies Used
                </h2>
                <div className="space-y-4">
                  {/* Snort */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">Snort IDS/IPS</span>
                      <span className="text-green-400">Expert</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '95%' }} />
                    </div>
                  </div>

                  {/* Wireshark */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">Wireshark</span>
                      <span className="text-green-400">Advanced</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '90%' }} />
                    </div>
                  </div>

                  {/* iptables */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">iptables/Firewall</span>
                      <span className="text-green-400">Advanced</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Linux */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">Linux (Ubuntu/Debian)</span>
                      <span className="text-green-400">Expert</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '95%' }} />
                    </div>
                  </div>

                  {/* Python */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">Python (Automation)</span>
                      <span className="text-green-400">Advanced</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Bash */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-mono">Bash Scripting</span>
                      <span className="text-green-400">Expert</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '90%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Reports & Resources */}
            <div className="mb-8">
              <h2 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-2">
                <span>📚</span> Lab Reports & Documentation
              </h2>
              <PdfList />
            </div>

            {/* Project Highlights */}
            <div className="bg-glass p-6 rounded-lg border border-green-500/30">
              <h2 className="text-2xl font-mono text-green-400 mb-4 flex items-center gap-2">
                <span>✨</span> Project Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-mono text-green-300 mb-3">Achievements</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Developed 50+ custom Snort rules for threat detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Successfully detected and mitigated DDoS attacks in lab environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Implemented comprehensive firewall rules using iptables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Created automated security scanning scripts</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-green-300 mb-3">Lab Environment</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">▸</span>
                      <span>Ubuntu 22.04 LTS Server</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">▸</span>
                      <span>Snort 2.9.x / 3.x</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">▸</span>
                      <span>VirtualBox/VMware for isolated testing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">▸</span>
                      <span>Multiple network interfaces for traffic analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Network Security Tab */}
        {activeTab === 'network-security' && (
          <div className="animate-fadeIn">
            <div className="bg-glass p-8 rounded-lg border border-green-500/30 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-mono text-green-400 mb-4">
                Network Security Projects
              </h2>
              <p className="text-gray-400 mb-6">
                Coming soon! Network security research and implementation projects.
              </p>
              <div className="text-gray-500 text-sm">
                Stay tuned for updates on network security assessments, penetration testing, and vulnerability analysis.
              </div>
            </div>
          </div>
        )}

        {/* Blue Team Labs Tab */}
        {activeTab === 'blue-team' && (
          <div className="animate-fadeIn">
            <div className="bg-glass p-8 rounded-lg border border-green-500/30 text-center">
              <div className="text-6xl mb-4">🛡️</div>
              <h2 className="text-2xl font-mono text-green-400 mb-4">
                Blue Team Lab Projects
              </h2>
              <p className="text-gray-400 mb-6">
                Coming soon! Defensive security labs and incident response scenarios.
              </p>
              <div className="text-gray-500 text-sm">
                Future content: SIEM setup, log analysis, threat hunting, and security monitoring.
              </div>
            </div>
          </div>
        )}

        {/* Security Tools Tab */}
        {activeTab === 'tools' && (
          <div className="animate-fadeIn">
            <div className="bg-glass p-8 rounded-lg border border-green-500/30 text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h2 className="text-2xl font-mono text-green-400 mb-4">
                Security Tools & Scripts
              </h2>
              <p className="text-gray-400 mb-6">
                Coming soon! Custom security tools and automation scripts.
              </p>
              <div className="text-gray-500 text-sm">
                Future content: Python security tools, Bash automation scripts, and custom utilities.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
