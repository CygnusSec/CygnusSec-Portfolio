const posts = [
  {
    title: 'Why I Started This Blog',
    slug: 'why-i-started-this-blog',
    date: '2026-05-01',
    tags: ['Personal', 'Life'],
    excerpt: 'A little introduction to who I am, why I decided to start writing, and what you can expect to find here.',
    content: `
# Why I Started This Blog

For a long time, I kept notes scattered across notebooks, text files, and random apps. Ideas about systems I was building, things I was learning, questions I couldn't stop thinking about. At some point it felt wasteful to keep all of that to myself.

This blog is my way of thinking out loud. Some posts will be technical — infrastructure, security, automation. Others will be more personal — reflections on work, learning, and the things that keep me curious.

I'm not writing to be an authority on anything. I'm writing because the act of writing forces clarity, and clarity is something I'm always chasing.

If something here is useful to you, that's a bonus.
    `
  },
  {
    title: 'Building a Home Lab: Where to Start',
    slug: 'home-lab-getting-started',
    date: '2026-04-20',
    tags: ['Technology', 'Infrastructure', 'DevOps'],
    excerpt: 'Setting up a home lab is one of the best investments you can make as someone working in tech. Here is how I approached mine.',
    content: `
# Building a Home Lab: Where to Start

A home lab is just a personal environment where you can experiment freely — break things, fix them, and learn without consequences.

## What I Started With

- An old desktop with 16GB RAM
- A cheap managed switch
- A few Raspberry Pis
- VirtualBox for quick VMs

## What I Run Now

Over time the lab evolved. I moved to Proxmox for virtualization, added a NAS for storage, and started running services in Docker containers. Nothing fancy — just enough to mirror real-world infrastructure at a small scale.

## Why It Matters

The gap between reading about something and actually running it is enormous. A home lab closes that gap. You learn how things fail, how they interact, and how to think about them as systems rather than isolated components.

Start small. A single machine running a few VMs is enough to learn a tremendous amount.
    `
  },
  {
    title: 'On Learning Things Deeply vs. Broadly',
    slug: 'deep-vs-broad-learning',
    date: '2026-04-10',
    tags: ['Personal', 'Learning', 'Science'],
    excerpt: 'There is a constant tension between going deep on one thing and staying broad across many. I have been thinking about how to navigate that.',
    content: `
# On Learning Things Deeply vs. Broadly

I have always been drawn to breadth. Cybersecurity, infrastructure, physics, mathematics, biology — I find it hard to stay in one lane. But breadth without depth can leave you feeling like you know a little about everything and a lot about nothing.

## The Case for Depth

Deep knowledge compounds. When you truly understand something — not just the surface but the underlying mechanics — you start seeing it everywhere. Security principles show up in system design. Physics intuition helps with network behavior. The investment pays off in unexpected ways.

## The Case for Breadth

Broad exposure gives you more surface area for connections. Some of the most interesting insights come from applying ideas from one field to problems in another. You can't do that if you only ever look in one direction.

## What I Actually Do

I try to go deep on the things I work with every day — infrastructure, security, automation — while staying curious about everything else. I read widely but don't pressure myself to master everything I read.

The goal isn't to know everything. It's to keep the curiosity alive.
    `
  },
  {
    title: 'Automating Infrastructure with Docker and Compose',
    slug: 'docker-compose-automation',
    date: '2026-03-28',
    tags: ['Technology', 'DevOps', 'Automation'],
    excerpt: 'Docker Compose changed how I think about deploying services. Here is a practical look at how I use it to manage my infrastructure.',
    content: `
# Automating Infrastructure with Docker and Compose

Before Docker, deploying a service meant a long checklist: install dependencies, configure the environment, handle conflicts with other services. Docker Compose made that repeatable and portable.

## A Simple Example

\`\`\`yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
\`\`\`

One file. One command. The service is running.

## What I Actually Use It For

- Running personal projects and tools
- Spinning up test environments quickly
- Keeping services isolated from each other
- Making deployments reproducible across machines

## The Bigger Picture

Compose is just one piece. The real value comes from combining it with proper environment management, health checks, and a clear mental model of how your services depend on each other. Once you have that, deployments stop being stressful.
    `
  },
  {
    title: 'Things I Wish I Knew Earlier About Linux',
    slug: 'linux-lessons',
    date: '2026-03-10',
    tags: ['Technology', 'Linux', 'Learning'],
    excerpt: 'After years of working with Linux daily, here are the things that took me too long to learn and would have saved me a lot of time.',
    content: `
# Things I Wish I Knew Earlier About Linux

Linux rewards patience and curiosity. But there are some things that would have saved me a lot of time if I had learned them earlier.

## 1. Read the Man Pages

I used to skip straight to Stack Overflow. The man pages are actually well-written and often answer the question faster. \`man <command>\` is always the first stop now.

## 2. Understand File Permissions Properly

Not just the numbers — understand why they exist and what they protect. A lot of security issues come from permissions that are too permissive because someone just wanted something to work.

## 3. Learn to Use tmux or screen

Running long processes over SSH without a terminal multiplexer is asking for trouble. One dropped connection and the job is gone.

## 4. systemd Is Worth Learning

It manages almost everything on a modern Linux system. Understanding how services start, stop, and depend on each other makes troubleshooting much faster.

## 5. The Shell Is a Programming Language

Bash scripting feels awkward at first but it is incredibly powerful for automation. Learning it properly — not just copying snippets — pays off quickly.
    `
  },
  {
    title: 'A Few Thoughts on Scientific Curiosity',
    slug: 'scientific-curiosity',
    date: '2026-02-15',
    tags: ['Science', 'Personal', 'Learning'],
    excerpt: 'Science is not just a profession or a method. It is a way of engaging with the world. Some thoughts on keeping that curiosity alive.',
    content: `
# A Few Thoughts on Scientific Curiosity

I studied cybersecurity, but my curiosity has never stayed inside that boundary. Physics, mathematics, biology, chemistry — I find myself drawn to all of it. Not to become an expert in each, but because understanding how the world works at a fundamental level is genuinely exciting.

## Why It Matters in Tech

Technology is applied science. The more you understand the underlying principles — information theory, physics of computation, mathematics of cryptography — the better your intuition becomes. You stop treating systems as black boxes and start seeing the mechanisms inside.

## Staying Curious as a Practice

Curiosity is not something you either have or don't. It is something you practice. Reading outside your field. Asking why something works, not just how. Being comfortable not knowing and sitting with a question long enough to actually think about it.

## What I Read

I keep a mix of technical and non-technical reading. Papers, books on physics and mathematics, science journalism. Not everything sticks, but the habit of engaging with ideas outside my immediate work keeps my thinking from getting too narrow.

The world is more interesting than any single discipline can contain.
    `
  }
];

export default posts;
