const posts = [
  {
    title: 'Writing Custom Snort Rules for Network Security',
    slug: 'snort-rules',
    date: '2026-02-01',
    tags: ['IDS', 'Snort', 'Blue Team'],
    excerpt: 'Learn how to write effective Snort rules to detect port scans, DDoS attacks, and backdoor attempts. Includes real-world examples and best practices.',
    content: `
# Writing Custom Snort Rules

Snort is one of the most powerful open-source IDS/IPS tools available. In this guide, we'll explore how to write custom detection rules.

## Rule Structure

A Snort rule consists of two main parts:
- **Rule Header**: Defines action, protocol, IPs, and ports
- **Rule Options**: Specifies detection criteria

## Example: Detecting TCP SYN Flood

\`\`\`
alert tcp any any -> $HOME_NET 80 (msg:"Possible TCP SYN Flood"; flags:S; detection_filter:track by_src, count 20, seconds 1; sid:1000004; rev:1;)
\`\`\`

This rule triggers when 20 SYN packets hit port 80 within 1 second from the same source.

## Best Practices

1. Use unique SIDs (start from 1000000 for custom rules)
2. Always include descriptive messages
3. Test rules in a lab environment first
4. Use thresholds to reduce false positives
    `
  },
  {
    title: 'Building an IDS Lab on Ubuntu',
    slug: 'ids-lab',
    date: '2026-01-25',
    tags: ['Linux', 'IDS', 'Lab'],
    excerpt: 'Step-by-step guide to building a complete blue team security lab using Ubuntu, Snort, and virtual machines for hands-on practice.',
    content: `
# Building an IDS Lab on Ubuntu

Setting up a security lab is essential for learning IDS/IPS concepts. Here's how to build one from scratch.

## Requirements

- Ubuntu 22.04 LTS
- VirtualBox or VMware
- At least 8GB RAM
- 50GB disk space

## Step 1: Install Snort

\`\`\`bash
sudo apt update
sudo apt install snort -y
\`\`\`

## Step 2: Configure Network Interface

Edit \`/etc/snort/snort.conf\` and set your HOME_NET variable:

\`\`\`
ipvar HOME_NET 192.168.1.0/24
\`\`\`

## Step 3: Test Your Setup

Run Snort in test mode:

\`\`\`bash
sudo snort -T -c /etc/snort/snort.conf
\`\`\`

## Next Steps

- Add custom rules
- Set up logging
- Configure alerting
    `
  },
  {
    title: 'Understanding iptables Firewall Rules',
    slug: 'iptables-guide',
    date: '2026-01-15',
    tags: ['Linux', 'Firewall', 'Blue Team'],
    excerpt: 'Master Linux firewall configuration with iptables. Learn how to create rules, manage chains, and secure your network infrastructure.',
    content: `
# Understanding iptables Firewall Rules

iptables is the standard firewall tool for Linux systems. Let's explore how to use it effectively.

## Basic Concepts

- **Tables**: filter, nat, mangle, raw
- **Chains**: INPUT, OUTPUT, FORWARD
- **Targets**: ACCEPT, DROP, REJECT

## Common Commands

Block an IP address:
\`\`\`bash
sudo iptables -A INPUT -s 192.168.1.100 -j DROP
\`\`\`

Allow SSH only from specific subnet:
\`\`\`bash
sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
\`\`\`

## Persistence

Save rules:
\`\`\`bash
sudo iptables-save > /etc/iptables/rules.v4
\`\`\`
    `
  },
  {
    title: 'Detecting DDoS Attacks with Snort',
    slug: 'ddos-detection',
    date: '2026-01-10',
    tags: ['IDS', 'Snort', 'DDoS'],
    excerpt: 'Identify and mitigate DDoS attacks using Snort IDS. Learn detection techniques for SYN floods, UDP floods, and application-layer attacks.',
    content: `
# Detecting DDoS Attacks with Snort

DDoS attacks are among the most common threats. Here's how to detect them with Snort.

## Types of DDoS Attacks

1. **SYN Flood**: Overwhelms with TCP SYN packets
2. **UDP Flood**: Floods with UDP packets
3. **HTTP Flood**: Application-layer attack

## Detection Rules

### SYN Flood Detection

\`\`\`
alert tcp any any -> $HOME_NET any (msg:"Potential SYN flood"; flags:S; detection_filter:track by_dst, count 200, seconds 1; sid:1000014; rev:1;)
\`\`\`

### UDP Flood Detection

\`\`\`
alert udp any any -> $HOME_NET any (msg:"Potential UDP flood"; detection_filter:track by_dst, count 500, seconds 1; sid:1000015; rev:1;)
\`\`\`

## Mitigation Strategies

- Rate limiting
- Traffic filtering
- Load balancing
- CDN services
    `
  },
  {
    title: 'Blue Team vs Red Team: Understanding the Difference',
    slug: 'blue-vs-red-team',
    date: '2026-01-05',
    tags: ['Blue Team', 'Research'],
    excerpt: 'Explore the roles, responsibilities, and methodologies of Blue Team defenders versus Red Team attackers in cybersecurity operations.',
    content: `
# Blue Team vs Red Team

Understanding the difference between Blue and Red teams is crucial for cybersecurity professionals.

## Blue Team (Defenders)

**Responsibilities:**
- Monitor security systems
- Respond to incidents
- Implement security controls
- Conduct security audits

**Tools:**
- SIEM systems
- IDS/IPS
- Firewalls
- Log analyzers

## Red Team (Attackers)

**Responsibilities:**
- Simulate real attacks
- Find vulnerabilities
- Test security controls
- Provide attack reports

**Tools:**
- Metasploit
- Burp Suite
- Nmap
- Social engineering

## Purple Team

The combination of both teams working together to improve overall security posture.
    `
  }
];

export default posts;   