import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LinuxImage from '../images/linux.png';
import InfoCard from '../components/InfoCard';
import { config, getPageTitleFromPath } from '../config/env';
import useDocumentTitle from '../hooks/useDocumentTitle';

const About = () => {
  const location = useLocation();
  const pageTitle = getPageTitleFromPath(location.pathname) || 'About';
  
  useDocumentTitle(); // Auto-detect from navigation config
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <section className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-4">
          <span className="text-white">&gt;</span> {pageTitle}
        </h1>
        <p className="text-gray-400 text-lg">
          Cybersecurity Researcher specializing in IDS/IPS and Blue Team operations
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-3 border-b border-green-500/30 pb-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`font-mono transition rounded-lg ${
              activeTab === 'profile'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`font-mono transition rounded-lg ${
              activeTab === 'skills'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`font-mono transition rounded-lg ${
              activeTab === 'contact'
                ? 'btn-download'
                : 'px-6 py-3 text-gray-400 hover:text-green-400 bg-black/30 border border-green-500/20 hover:border-green-400/50'
            }`}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-[300px_1fr] gap-8 animate-fadeIn">
            {/* Left: Profile Card */}
            <div>
              <InfoCard />
            </div>

            {/* Right: Bio */}
            <div className="bg-glass p-8 rounded-lg border border-green-500/30">
              <h2 className="text-2xl font-mono text-green-400 mb-6">
                Bio
              </h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a cybersecurity researcher at the <strong className="text-green-400">{config.author.organization}</strong>, 
                  specializing in Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS).
                </p>
                
                <p>
                  My work focuses on <strong className="text-green-400">Blue Team operations</strong>, 
                  building real-world security labs, and developing custom detection rules for network security monitoring.
                </p>

                <p>
                  I'm passionate about sharing knowledge through documentation, lab reports, and blog posts 
                  to help others learn practical cybersecurity skills.
                </p>

                <div className="mt-8 pt-6 border-t border-green-500/30">
                  <h3 className="text-lg font-mono text-green-400 mb-4">
                    Research Interests
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">▸</span> Network Security Monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">▸</span> Intrusion Detection & Prevention
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">▸</span> Threat Hunting & Analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">▸</span> Security Lab Development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">▸</span> Blue Team Tactics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            {/* Security Tools */}
            <div className="bg-glass p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-mono text-green-400 mb-4 flex items-center gap-2">
                <span>🛡️</span> Security Tools
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Snort', level: 90 },
                  { name: 'Wireshark', level: 85 },
                  { name: 'Suricata', level: 80 },
                  { name: 'Zeek (Bro)', level: 75 },
                  { name: 'OSSEC', level: 70 }
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Systems */}
            <div className="bg-glass p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-mono text-green-400 mb-4 flex items-center gap-2">
                <span>💻</span> Operating Systems
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Linux (Ubuntu/Debian)', level: 95 },
                  { name: 'Kali Linux', level: 90 },
                  { name: 'BlackArch', level: 85 },
                  { name: 'pfSense', level: 75 },
                  { name: 'Windows Server', level: 70 }
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Networking */}
            <div className="bg-glass p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-mono text-green-400 mb-4 flex items-center gap-2">
                <span>🌐</span> Networking
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'TCP/IP', level: 90 },
                  { name: 'Firewall (iptables)', level: 85 },
                  { name: 'VPN Configuration', level: 80 },
                  { name: 'Network Analysis', level: 90 },
                  { name: 'Packet Inspection', level: 85 }
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programming */}
            <div className="bg-glass p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-mono text-green-400 mb-4 flex items-center gap-2">
                <span>⚡</span> Programming
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Python', level: 85 },
                  { name: 'Bash Scripting', level: 90 },
                  { name: 'JavaScript', level: 75 },
                  { name: 'SQL', level: 70 },
                  { name: 'YAML/JSON', level: 80 }
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-glass p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl font-mono text-green-400 mb-4">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">📧</span>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a 
                        href={`mailto:${config.contact.email}`}
                        className="text-green-300 hover:text-green-400 transition"
                      >
                        {config.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">📍</span>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-gray-300">
                        {config.author.organization}<br />
                        {config.author.location}
                      </p>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">💻</span>
                    <div>
                      <p className="text-gray-400 text-sm">GitHub</p>
                      <a 
                        href={config.contact.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-green-400 transition"
                      >
                        github.com/{config.contact.github.username}
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">🔗</span>
                    <div>
                      <p className="text-gray-400 text-sm">LinkedIn</p>
                      <a 
                        href={config.contact.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-green-400 transition"
                      >
                        linkedin.com/in/{config.contact.linkedin.username}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-glass p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl font-mono text-green-400 mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a 
                    href="/researches" 
                    className="flex items-center gap-3 text-green-300 hover:text-green-400 transition p-3 rounded hover:bg-green-500/10"
                  >
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <div className="font-mono">Projects</div>
                      <div className="text-sm text-gray-400">View my research projects</div>
                    </div>
                  </a>
                  
                  <a 
                    href="/blog" 
                    className="flex items-center gap-3 text-green-300 hover:text-green-400 transition p-3 rounded hover:bg-green-500/10"
                  >
                    <span className="text-2xl">📝</span>
                    <div>
                      <div className="font-mono">Blog</div>
                      <div className="text-sm text-gray-400">Read my articles</div>
                    </div>
                  </a>
                  
                  <a 
                    href="/pdfs/Lab_Report.pdf" 
                    download
                    className="flex items-center gap-3 text-green-300 hover:text-green-400 transition p-3 rounded hover:bg-green-500/10"
                  >
                    <span className="text-2xl">📚</span>
                    <div>
                      <div className="font-mono">Lab Reports</div>
                      <div className="text-sm text-gray-400">Download documentation</div>
                    </div>
                  </a>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-6 border-t border-green-500/30">
                  <h4 className="text-lg font-mono text-green-400 mb-4">
                    Connect With Me
                  </h4>
                  <div className="flex gap-4">
                    <a 
                      href={config.contact.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-400 transition"
                      title="GitHub"
                    >
                      <span className="text-2xl">💻</span>
                    </a>
                    <a 
                      href={config.contact.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-400 transition"
                      title="LinkedIn"
                    >
                      <span className="text-2xl">🔗</span>
                    </a>
                    <a 
                      href={`mailto:${config.contact.email}`}
                      className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-400 transition"
                      title="Email"
                    >
                      <span className="text-2xl">📧</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
