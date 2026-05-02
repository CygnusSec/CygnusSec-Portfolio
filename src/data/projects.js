export const projects = [
  {
    id: 'ids-ips',
    label: 'IDS/IPS Research',
    overview: `
## 🛡️ Project Overview

Comprehensive research on Intrusion Detection and Prevention Systems, focusing on **Snort IDS/IPS** implementation and custom rule development.

### Key Focus Areas

- Snort rule development and optimization
- Network traffic analysis and monitoring
- DDoS attack detection and mitigation
- Firewall configuration (iptables)
- Security threat scanning and assessment
    `,
    highlights: `
## ✨ Project Highlights

### Achievements

- ✓ Developed 50+ custom Snort rules for threat detection
- ✓ Successfully detected and mitigated DDoS attacks in lab environment
- ✓ Implemented comprehensive firewall rules using iptables
- ✓ Created automated security scanning scripts

### Lab Environment

- Ubuntu 22.04 LTS Server
- Snort 2.9.x / 3.x
- VirtualBox/VMware for isolated testing
- Multiple network interfaces for traffic analysis
    `,
    skills: [
      { name: 'Snort IDS/IPS',        level: 95 },
      { name: 'Wireshark',             level: 90 },
      { name: 'iptables/Firewall',     level: 85 },
      { name: 'Linux (Ubuntu/Debian)', level: 95 },
      { name: 'Python (Automation)',   level: 85 },
      { name: 'Bash Scripting',        level: 90 },
    ],
    hasPdfs: true,
  },
  {
    id: 'network-security',
    label: 'Network Security',
    overview: `
## 🔒 Network Security Projects

Coming soon! Network security research and implementation projects.

Stay tuned for updates on **network security assessments**, penetration testing, and vulnerability analysis.
    `,
    highlights: null,
    skills: [],
    hasPdfs: false,
  },
  {
    id: 'blue-team',
    label: 'Blue Team Labs',
    overview: `
## 🛡️ Blue Team Lab Projects

Coming soon! Defensive security labs and incident response scenarios.

Future content: **SIEM setup**, log analysis, threat hunting, and security monitoring.
    `,
    highlights: null,
    skills: [],
    hasPdfs: false,
  },
  {
    id: 'tools',
    label: 'Security Tools',
    overview: `
## 🔧 Security Tools & Scripts

Coming soon! Custom security tools and automation scripts.

Future content: **Python security tools**, Bash automation scripts, and custom utilities.
    `,
    highlights: null,
    skills: [],
    hasPdfs: false,
  },
];
