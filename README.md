# 🛡️ CygnusSec - Cybersecurity Portfolio & Blog

> A modern cybersecurity portfolio and blog website with a professional hacker-themed design.

![Theme](https://img.shields.io/badge/Theme-Hacker-00ff00)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38bdf8)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Pages Overview](#-pages-overview)
- [Components](#-components)
- [Custom Hooks](#-custom-hooks)
- [Environment Variables](#-environment-variables)
- [Navigation Configuration](#-navigation-configuration-guide)
- [Document Title Configuration](#-document-title-configuration-guide)
- [Deployment](#-deployment)
- [Tech Stack](#-tech-stack)
- [Changelog](#-changelog)
- [Contact](#-contact)

---

## ⚡ Quick Start

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:8080
```

---

## ✨ Features

### 🎨 Design Features
- **Hacker Theme**: Matrix-style background with neon green accents
- **Matrix Animation**: Real-time Canvas rendering with falling characters
- **Glass Morphism**: Translucent cards with backdrop blur
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Typing effects, hover transitions, fade-ins

### 📄 Pages (6 Total)

#### 1. Home Page (`/`)
- Hero section with large typography
- Typing animation: "with Ethical Hacking"
- Large circular avatar with neon border (420x420px)
- CTA buttons ("More About Me", "Contact Me!")
- Both buttons now link to `/about` page
- Responsive 2-column grid

#### 2. About Page (`/about`) ⭐ **WITH 3 TABS**

**Tab 1: Profile**
- Profile card with avatar and contact info
- Bio section with research interests
- Matrix-style avatar effects (grid + scan)

**Tab 2: Skills**
Four skill categories with animated progress bars:
- **Security Tools**: Snort (90%), Wireshark (85%), Suricata (80%), Zeek (75%), OSSEC (70%)
- **Operating Systems**: Linux (95%), Kali Linux (90%), BlackArch (85%), pfSense (75%), Windows Server (70%)
- **Networking**: TCP/IP (90%), Firewall/iptables (85%), VPN (80%), Network Analysis (90%), Packet Inspection (85%)
- **Programming**: Python (85%), Bash (90%), JavaScript (75%), SQL (70%), YAML/JSON (80%)

**Tab 3: Contact** ⭐ **NEW - Merged from Contact Page**
- **Contact Information**: Email, Location, GitHub, LinkedIn with icons
- **Quick Links**: Projects, Blog, Lab Reports with descriptions
- **Social Media**: Connect buttons for GitHub, LinkedIn, Email
- No contact form (removed as requested)

#### 3. Projects Page (`/researches`) ⭐ **WITH 4 TABS**
- **Tab 1: IDS/IPS Research** (Complete)
  - Project overview and description
  - Technologies used with progress bars (6 items)
  - Lab reports & documentation (PdfList component)
  - Project highlights
- **Tab 2: Network Security** (Coming Soon)
- **Tab 3: Blue Team Labs** (Coming Soon)
- **Tab 4: Security Tools** (Coming Soon)

#### 4. Blog Page (`/blog`)
- List of all blog posts with preview cards
- Post metadata (date, tags, excerpt)
- "Read more" links
- Popular tags section

#### 5. Post Page (`/post/:slug`)
- Full blog post content
- Back to blog navigation
- Post metadata (date, tags)
- Glass morphism content container
- Footer with "Contact Me" link (now points to `/about`)

#### 6. Tags Page (`/tags`)
- Interactive tag filtering
- Tag buttons with post counts
- "All Posts" option
- Real-time filtered post list
- Responsive tag grid

**Note:** Contact page has been removed and merged into About page (Tab 3).

### 📝 Blog System
- **5 Detailed Posts** with full content:
  1. Writing Custom Snort Rules for Network Security
  2. Building an IDS Lab on Ubuntu
  3. Understanding iptables Firewall Rules
  4. Detecting DDoS Attacks with Snort
  5. Blue Team vs Red Team: Understanding the Difference

### 📚 Resource Library
- 6 downloadable PDF documents:
  1. Create and setup an environment (877 KB)
  2. Security Threats and Scanning (8.3 MB)
  3. Firewall (Iptables) (505 KB)
  4. Snort IDS/IPS (268 KB)
  5. Snort Rules Guide (5.6 KB)
  6. Final Lab Report (163 KB)

---

## 📁 Project Structure

```
dylantran.tech/
├── src/
│   ├── pages/                    # Route pages (6 pages)
│   │   ├── Home.jsx             # Landing page with hero
│   │   ├── About.jsx            # Profile with 3 tabs (Profile, Skills, Contact)
│   │   ├── Projects.jsx         # Projects with 4 tabs (IDS/IPS, Network, Blue Team, Tools)
│   │   ├── Blog.jsx             # Blog listing
│   │   ├── Post.jsx             # Single post view
│   │   └── Tags.jsx             # Tag filtering
│   │
│   ├── components/               # Reusable components
│   │   ├── MatrixBackground.jsx # Canvas animation
│   │   ├── TypingText.jsx       # Typing effect
│   │   ├── Header.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Footer
│   │   ├── InfoCard.jsx         # Profile card
│   │   ├── PdfList.jsx          # Download list
│   │   ├── PostCard.jsx         # Blog preview
│   │   └── TagList.jsx          # Tag display
│   │
│   ├── config/                   # Configuration
│   │   └── env.js               # Environment variables config
│   │
│   ├── data/                     # Static data
│   │   ├── posts.js             # Blog posts (5 posts)
│   │   └── headerButtons.js     # Navigation config (4 buttons)
│   │
│   ├── images/                   # Assets
│   │   ├── linux.png            # Avatar (50KB)
│   │   └── blackarchv3.jpg      # Background (234KB)
│   │
│   ├── App.jsx                   # Root component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
│
├── public/
│   ├── index.html                # HTML template
│   └── pdfs/                     # Lab reports (6 files)
│
├── nginx/
│   └── default.conf              # Nginx configuration
│
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment variables template
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yaml           # Container orchestration
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # TailwindCSS config
└── postcss.config.js             # PostCSS config
```

**Statistics:**
- Total Pages: 6 (Home, About, Projects, Blog, Post, Tags)
- Total Components: 8
- Navigation Buttons: 4 (Blog, Projects, Tags, About)
- Lines of Code: ~733 lines
- Components: 8 reusable
- Pages: 6 routes
- Blog Posts: 5 with full content
- PDF Resources: 6 documents

---

## 📄 Pages Overview

### Home (`/`)
**Purpose**: Landing page with hero section

**Features**:
- Large typography with typing animation
- "Secure Your Future with Ethical Hacking Done Right"
- Description of services
- Large circular avatar (420x420px) with neon border
- CTA buttons: "More About Me" and "Contact Me!"
- Responsive 2-column grid (collapses on mobile)

### About (`/about`)
**Purpose**: Profile page with detailed information

**Tab Structure**:

**Profile Tab**:
- Avatar with hacker effects (matrix grid + scan)
- Name: Trần Đại Dương
- Position: Researcher - Institute of Information Technology
- Email: tdduong@ioit.ac.vn
- Bio with research interests
- 5 research focus areas

**Skills Tab**:
- 4 skill categories with 5 items each
- Animated progress bars
- Percentage indicators
- Gradient progress bars (green)
- Categories: Security Tools, OS, Networking, Programming

**Contact Tab** ⭐ **NEW**:
- Contact information (Email, Location, GitHub, LinkedIn)
- Quick links to Projects, Blog, Lab Reports
- Social media connect buttons
- No contact form (removed)

### Projects (`/researches`)
**Purpose**: Showcase research projects

**Tab Structure**:

**IDS/IPS Research Tab** (Complete):
- Project overview and description
- Technologies used with progress bars (6 items)
- Lab reports & documentation (PdfList component)
- Project highlights

**Network Security Tab** (Coming Soon)
**Blue Team Labs Tab** (Coming Soon)
**Security Tools Tab** (Coming Soon)

### Blog (`/blog`)
**Purpose**: Blog post listing

**Features**:
- Header with description
- 5 blog post cards
- Each card shows: title, date, tags, excerpt
- "Read more" links
- Popular tags section at bottom
- Responsive grid layout

### Post (`/post/:slug`)
**Purpose**: Individual blog post view

**Features**:
- Back to blog button
- Post title (large, green)
- Metadata: date and tags
- Full post content in glass container
- Footer navigation (All Posts, Contact Me → links to `/about`)
- 404 handling for invalid slugs

### Tags (`/tags`)
**Purpose**: Filter posts by topic

**Features**:
- Header with description
- Interactive tag buttons
- "All Posts" button
- Post count for each tag
- Real-time filtering
- Filtered post list
- Active tag highlighting

---

## 🎨 Components

### MatrixBackground
**Purpose**: Canvas-based Matrix rain animation

**Features**:
- Falling characters: `01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%^&*`
- Refresh rate: 35ms (~28 FPS)
- Responsive to window resize
- Fade effect for trail
- Auto-cleanup on unmount

### TypingText
**Purpose**: Character-by-character typing animation

**Props**:
- `text`: String to display
- `speed`: Typing speed in ms (default: 60)
- `className`: Custom CSS classes

**Features**:
- Blinking cursor (▍)
- Smooth typing effect
- Cleanup timer to prevent memory leaks

### Header
**Purpose**: Fixed navigation bar

**Features**:
- Glass morphism effect
- Logo: "CygnusSec"
- Navigation links: Blog, Tags, About, Contact
- Responsive design
- Hover effects

### Footer
**Purpose**: Copyright notice

**Features**:
- Dynamic year
- Centered layout
- Simple and clean

### InfoCard
**Purpose**: Profile card with contact info

**Features**:
- Avatar with special effects:
  - Matrix grid overlay (animated)
  - Scanning light effect (animated)
  - Neon border glow
- Name and position
- Email link
- Glass morphism background

### PdfList
**Purpose**: Downloadable resources list

**Features**:
- 6 PDF files
- File names and sizes
- Download buttons with icons
- Hover effects
- Glass morphism cards

### PostCard
**Purpose**: Blog post preview card

**Features**:
- Clickable title
- Date and tags
- Excerpt text
- "Read more" link with arrow
- Hover effects
- Glass morphism background

### TagList
**Purpose**: Display popular tags

**Features**:
- 5 predefined tags: IDS, Snort, Linux, Blue Team, Research
- Styled tag badges
- Reusable component

---

## 🪝 Custom Hooks

### useDocumentTitle
**Purpose**: Manage document title (browser tab title) dynamically

**Location**: `src/hooks/useDocumentTitle.js`

**Usage**:

```javascript
import useDocumentTitle from '../hooks/useDocumentTitle';

// In your component
const MyPage = () => {
  // Set title to "My Page | Site Name"
  useDocumentTitle('My Page');
  
  // Or use default site title only
  useDocumentTitle('', true);
  
  return <div>...</div>;
};
```

**Parameters**:
- `title` (string): Page title (will be appended to site name)
- `useDefault` (boolean): If true, uses only `VITE_SITE_TITLE` from .env

**Examples**:

```javascript
// Home page - use default title
useDocumentTitle('', true);
// Result: "Dylan Tran | InfoSec Library"

// Blog page
useDocumentTitle('Blog');
// Result: "Blog | Cygnus Security"

// About page
useDocumentTitle('About');
// Result: "About | Cygnus Security"

// Dynamic post title
useDocumentTitle(post.title);
// Result: "Writing Custom Snort Rules | Cygnus Security"
```

**Features**:
- Reads from `VITE_SITE_TITLE` and `VITE_SITE_NAME` in .env
- Automatically updates when navigating between pages
- Cleanup on component unmount
- SEO-friendly

**Pages Using This Hook**:
- Home: Uses default site title
- Blog: "Blog | Site Name"
- Projects: "Projects | Site Name"
- Tags: "Tags | Site Name"
- About: "About | Site Name"
- Post: "Post Title | Site Name"

---

## 🔧 Environment Variables

### Overview

This project uses environment variables for easy configuration without modifying code. All variables must be prefixed with `VITE_` to be exposed to the client-side.

### Quick Setup

```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit .env with your values
nano .env  # or use your favorite editor

# 3. Restart dev server
npm run dev
```

### Available Variables

#### 🌐 Site Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_SITE_NAME` | Site/brand name | `CygnusSec` |
| `VITE_SITE_TITLE` | Browser tab title | `Dylan Tran \| InfoSec Library` |
| `VITE_SITE_URL` | Site URL | `http://localhost:5173` |

#### 👤 Personal Information

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AUTHOR_NAME` | Full name (Vietnamese) | `Trần Đại Dương` |
| `VITE_AUTHOR_NAME_EN` | Full name (English) | `Dylan Tran` |
| `VITE_AUTHOR_POSITION` | Job title | `Researcher - Institute of Information Technology` |
| `VITE_AUTHOR_ORGANIZATION` | Organization name | `Institute of Information Technology` |
| `VITE_AUTHOR_LOCATION` | Location | `Hanoi, Vietnam` |

#### 📧 Contact Information

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_EMAIL` | Email address | `tdduong@ioit.ac.vn` |
| `VITE_GITHUB_URL` | GitHub profile URL | `https://github.com/dylantran` |
| `VITE_GITHUB_USERNAME` | GitHub username | `dylantran` |
| `VITE_LINKEDIN_URL` | LinkedIn profile URL | `https://linkedin.com/in/dylantran` |
| `VITE_LINKEDIN_USERNAME` | LinkedIn username | `dylantran` |

#### 🖼️ Images

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AVATAR_URL` | Avatar image URL | `https://i.ibb.co/MBtjqXQ/avatar.jpg` |

#### 🧭 Navigation Buttons ⭐ **NEW - Dynamic Configuration**

| Variable | Description | Format |
|----------|-------------|--------|
| `VITE_NAV_BUTTONS` | Navigation menu buttons | `Label:path\|Label:path\|...` |

**Dynamic Navigation Configuration:**

You can now add, remove, or reorder navigation buttons without editing code! Simply update the `VITE_NAV_BUTTONS` variable in your `.env` file.

**Format:** `Label:path|Label:path|...`

**Examples:**

```bash
# Default configuration (4 buttons)
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about

# Add a new "Contact" button
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about|Contact:/contact

# Reorder buttons
VITE_NAV_BUTTONS=About:/about|Projects:/researches|Blog:/blog|Tags:/tags

# Remove a button (e.g., remove Tags)
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|About:/about

# Add custom pages
VITE_NAV_BUTTONS=Home:/|Blog:/blog|Portfolio:/portfolio|Services:/services|Contact:/contact

# Minimal (2 buttons)
VITE_NAV_BUTTONS=Blog:/blog|About:/about

# Custom labels
VITE_NAV_BUTTONS=Articles:/blog|My Work:/researches|Topics:/tags|Contact Me:/about
```

**Rules:**
- Each button is separated by `|` (pipe character)
- Format for each button: `Label:path`
- Label: Text displayed on the button
- Path: Route path (must start with `/`)
- No spaces around `:` or `|`
- Order matters - buttons appear left to right in the header
- Active page detection works automatically

#### 📊 Analytics (Optional)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GA_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

### Usage in Code

Import the config object:

```javascript
import { config } from '../config/env';

// Access values
console.log(config.siteName);           // "CygnusSec"
console.log(config.author.name);        // "Trần Đại Dương"
console.log(config.contact.email);      // "tdduong@ioit.ac.vn"
```

### Config Structure

```javascript
config = {
  // Site
  siteName: string,
  siteTitle: string,
  siteUrl: string,

  // Author
  author: {
    name: string,              // Vietnamese name
    nameEn: string,            // English name
    position: string,
    organization: string,
    location: string,
  },

  // Contact
  contact: {
    email: string,
    github: {
      url: string,
      username: string,
    },
    linkedin: {
      url: string,
      username: string,
    },
  },

  // Images
  avatarUrl: string,

  // Navigation (parsed from VITE_NAV_BUTTONS)
  navButtons: [
    {
      name: string,      // Button identifier
      label: string,     // Display text
      to: string,        // Route path
    }
  ],

  // Analytics
  gaId: string | undefined,
}
```

### Example Usage in Components

```javascript
// Header.jsx - Site name and dynamic navigation
<Link to="/">{config.siteName}</Link>
{config.navButtons.map(btn => (
  <Link to={btn.to}>{btn.label}</Link>
))}

// InfoCard.jsx
<h2>{config.author.name}</h2>
<a href={`mailto:${config.contact.email}`}>
  {config.contact.email}
</a>

// Contact.jsx
<a href={config.contact.github.url}>
  github.com/{config.contact.github.username}
</a>

// Footer.jsx
© {new Date().getFullYear()} {config.author.nameEn}
```

### Components Using Config

| Component | Variables Used |
|-----------|----------------|
| `Header.jsx` | `siteName`, `navButtons` ⭐ |
| `Footer.jsx` | `author.nameEn` |
| `InfoCard.jsx` | `author.name`, `author.position`, `contact.email` |
| `Contact.jsx` | All contact variables, `author.organization`, `author.location` |
| `About.jsx` | `author.organization` |

### Production Deployment

#### Vercel

1. Go to project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   ```
   VITE_SITE_NAME=CygnusSec
   VITE_EMAIL=your@email.com
   ...
   ```
4. Redeploy

#### Netlify

1. Go to "Site settings"
2. Navigate to "Environment variables"
3. Click "Add a variable"
4. Add each variable
5. Trigger new deploy

#### Docker

**Option 1: .env file**
```bash
# Create .env file
cp .env.example .env

# Edit values
nano .env

# Build with env file
docker-compose up --build
```

**Option 2: Pass via command**
```bash
docker run -d \
  -e VITE_SITE_NAME=CygnusSec \
  -e VITE_EMAIL=your@email.com \
  -p 8080:80 \
  cygnus-sec
```

### Security Notes

#### ✅ Safe to Use

- Site configuration (name, title, URL)
- Public contact information (email, social links)
- Author information (name, position)
- Public image URLs

#### ⚠️ Never Store

- API keys
- Database credentials
- Private tokens
- Passwords
- Secret keys

**Why?** All `VITE_` variables are exposed in client-side JavaScript and can be viewed by anyone.

### Troubleshooting

#### Variables Not Working

**Problem**: Changes to `.env` not reflected

**Solution**:
```bash
# Stop dev server (Ctrl+C)
# Restart
npm run dev
```

#### Undefined Values

**Problem**: `config.siteName` is undefined

**Solution**:
1. Check `.env` file exists
2. Verify variable starts with `VITE_`
3. Restart dev server
4. Check `src/config/env.js` for typos

#### Build Errors

**Problem**: Build fails with env errors

**Solution**:
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

---

## 🎨 Customization

### Theme Colors

Edit `src/index.css`:

```css
/* Primary Colors */
Primary:    #00ff00  /* Neon green */
Secondary:  #00ffcc  /* Cyan */
Background: #000000  /* Black */
Text:       #e0f7ff  /* Light blue */
Accent:     #0066ff  /* Blue */
```

### Add Blog Posts

Edit `src/data/posts.js`:

```javascript
{
  title: 'Your Post Title',
  slug: 'url-slug',
  date: '2026-02-01',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  excerpt: 'Short description for preview...',
  content: `
    Full content here...
    Supports markdown-style formatting.
  `
}
```

### Update Profile Information

**InfoCard** (`src/components/InfoCard.jsx`):
```javascript
// Change name, position, email
<h2>Your Name</h2>
<p>Your Position</p>
<a href="mailto:your@email.com">your@email.com</a>
```

**About Page** (`src/pages/About.jsx`):
- Update bio text
- Modify research interests
- Change skill percentages
- Add/remove skills

### Add PDF Resources

1. Upload PDF to `public/pdfs/`
2. Edit `src/components/PdfList.jsx`:

```javascript
const pdfFiles = [
  { 
    name: "Your Document Name", 
    file: "/pdfs/your-file.pdf", 
    size: "1.2 MB" 
  },
  // ... more files
];
```

### Modify Navigation

Edit `src/data/headerButtons.js`:

```javascript
const headerButtons = [
  { name: 'NewPage', label: 'New Page', to: '/new-page' },
  // ... more links
];
```

### Change Avatar

Replace `src/images/linux.png` with your image, or update the import in:
- `src/components/InfoCard.jsx`
- `src/pages/Home.jsx`

---

## 🧭 Navigation Configuration Guide

### Quick Start

Navigation buttons are fully configurable via the `.env` file. No code changes needed!

### How to Add/Remove/Reorder Buttons

**1. Open your `.env` file**

```bash
nano .env
# or use your favorite editor
```

**2. Find the `VITE_NAV_BUTTONS` line**

```bash
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about
```

**3. Edit the configuration**

**Format:** `Label:path|Label:path|...`

- Each button: `Label:path`
- Separator: `|` (pipe)
- No spaces around `:` or `|`

### Navigation Examples

#### Add a New Button

```bash
# Before
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about

# After (added Contact)
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about|Contact:/contact
```

#### Remove a Button

```bash
# Before
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about

# After (removed Tags)
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|About:/about
```

#### Reorder Buttons

```bash
# Before
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about

# After (About first)
VITE_NAV_BUTTONS=About:/about|Blog:/blog|Projects:/researches|Tags:/tags
```

#### Change Button Labels

```bash
# Before
VITE_NAV_BUTTONS=Blog:/blog|Projects:/researches|Tags:/tags|About:/about

# After (custom labels)
VITE_NAV_BUTTONS=Articles:/blog|My Work:/researches|Topics:/tags|Contact Me:/about
```

#### Minimal Configuration

```bash
# Just 2 buttons
VITE_NAV_BUTTONS=Blog:/blog|About:/about
```

#### Extended Configuration

```bash
# 6 buttons with Home
VITE_NAV_BUTTONS=Home:/|Blog:/blog|Projects:/researches|Services:/services|Tags:/tags|About:/about
```

### Common Navigation Use Cases

**Portfolio Site:**
```bash
VITE_NAV_BUTTONS=Home:/|Portfolio:/researches|About:/about|Contact:/contact
```

**Blog Site:**
```bash
VITE_NAV_BUTTONS=Home:/|Articles:/blog|Categories:/tags|About:/about
```

**Business Site:**
```bash
VITE_NAV_BUTTONS=Home:/|Services:/services|Portfolio:/researches|Blog:/blog|Contact:/contact
```

**Personal Site:**
```bash
VITE_NAV_BUTTONS=About:/about|Projects:/researches|Blog:/blog|Resume:/resume
```

### Navigation Important Notes

1. **Restart Required**: After changing `.env`, restart your dev server
2. **Route Must Exist**: Make sure the route path exists in `src/App.jsx`
3. **Active Highlighting**: Works automatically based on current URL
4. **Button Styling**: All buttons use gradient style with hover effects
5. **Mobile Responsive**: Buttons automatically adjust for mobile
6. **🆕 Auto-sync Titles**: Page titles automatically use navigation button labels!

**Auto-sync Example:**
```bash
# Change navigation label in .env
VITE_NAV_BUTTONS=Blog:/blog|My Work:/researches|Tags:/tags|About:/about

# Results:
# ✅ Navigation button: "My Work"
# ✅ Page title: "My Work | Cygnus Security"
# ✅ Both sync automatically - no code changes needed!
```

**How It Works:**
- Pages use `useDocumentTitle()` without parameters
- Hook auto-detects title from navigation config based on current path
- When you change label in `.env`, both navigation and title update together

### Navigation Troubleshooting

**Buttons Not Showing:**
- Solution: Restart dev server with `npm run dev`

**Button Shows But Page 404:**
- Solution: Add route in `src/App.jsx`: `<Route path="/your-path" element={<YourPage />} />`

**Syntax Error:**
- ✅ Correct: `Blog:/blog|About:/about`
- ❌ Wrong: `Blog: /blog | About: /about` (spaces)
- ❌ Wrong: `Blog-/blog-About-/about` (wrong separator)

### Default Navigation Buttons

If `VITE_NAV_BUTTONS` is not set, these defaults are used:

```javascript
[
  { name: 'Blog', label: 'Blog', to: '/blog' },
  { name: 'Projects', label: 'Projects', to: '/researches' },
  { name: 'Tags', label: 'Tags', to: '/tags' },
  { name: 'About', label: 'About', to: '/about' },
]
```

---

## 📝 Document Title Configuration Guide

### Overview

The website supports dynamic document titles (browser tab titles) through environment variables and a custom React hook.

### Title Configuration

**Set in .env:**

```bash
VITE_SITE_TITLE=Dylan Tran | InfoSec Library  # Full title for home page
VITE_SITE_NAME=Cygnus Security                # Site name for other pages
```

**How It Works:**

- Home page: Shows `VITE_SITE_TITLE`
- Other pages: Shows `Page Name | VITE_SITE_NAME`
- Blog posts: Shows `Post Title | VITE_SITE_NAME`

### Title Examples

**Current Configuration:**
```bash
VITE_SITE_TITLE=Dylan Tran | InfoSec Library
VITE_SITE_NAME=Cygnus Security
```

**Results:**
- Home: `Dylan Tran | InfoSec Library`
- Blog: `Blog | Cygnus Security`
- Projects: `Projects | Cygnus Security`
- About: `About | Cygnus Security`
- Post: `Writing Custom Snort Rules | Cygnus Security`

**Alternative Configurations:**

```bash
# Personal Brand
VITE_SITE_TITLE=John Doe - Cybersecurity Expert
VITE_SITE_NAME=John Doe

# Company Site
VITE_SITE_TITLE=SecureNet - Enterprise Security Solutions
VITE_SITE_NAME=SecureNet

# Portfolio
VITE_SITE_TITLE=Alice Smith | Full Stack Developer
VITE_SITE_NAME=Alice Smith
```

### Using useDocumentTitle Hook

**🆕 Auto-detect (Recommended):**

```javascript
import useDocumentTitle from '../hooks/useDocumentTitle';

const MyPage = () => {
  useDocumentTitle();  // Auto-detects from navigation config!
  return <div>Content</div>;
};
```

**How Auto-detect Works:**
- Hook reads current path (e.g., `/researches`)
- Finds matching navigation button in config
- Uses button's label as page title
- Result: "Projects | Site Name" or "My Work | Site Name" (if you changed label)

**Manual Title (Optional):**

```javascript
const MyPage = () => {
  useDocumentTitle('Custom Title');  // Result: "Custom Title | Site Name"
  return <div>Content</div>;
};
```

**Use Default Title:**

```javascript
const Home = () => {
  useDocumentTitle('', true);  // Result: Full VITE_SITE_TITLE
  return <div>Content</div>;
};
```

**Dynamic Title:**

```javascript
const Post = () => {
  const post = getPost();
  useDocumentTitle(post.title);  // Result: "Post Title | Site Name"
  return <div>Content</div>;
};
```

### Hook API

**`useDocumentTitle(title, useDefault)`**

**Parameters:**
- `title` (string, optional): Page title to display. If not provided, auto-detects from navigation config
- `useDefault` (boolean, optional): If true, uses only `VITE_SITE_TITLE`

**Examples:**

```javascript
// 🆕 Auto-detect from navigation (Recommended)
useDocumentTitle();
// → Auto-detects "Projects" from navigation config
// → Result: "Projects | Cygnus Security"

// Custom title
useDocumentTitle('Contact');
// → "Contact | Cygnus Security"

// Default title
useDocumentTitle('', true);
// → "Dylan Tran | InfoSec Library"

// Dynamic title
useDocumentTitle(post.title);
// → "Post Title | Cygnus Security"
```

**Auto-detect Behavior:**
```bash
# In .env
VITE_NAV_BUTTONS=Blog:/blog|My Work:/researches|Topics:/tags|About:/about

# In component
useDocumentTitle();  // No parameters

# On /researches page → "My Work | Cygnus Security"
# On /blog page → "Blog | Cygnus Security"
# On /tags page → "Topics | Cygnus Security"
# On /about page → "About | Cygnus Security"
```

### Title SEO Benefits

✅ **Better Search Rankings** - Unique titles for each page  
✅ **User Experience** - Clear tab identification  
✅ **Social Sharing** - Proper titles in shared links  
✅ **Bookmarks** - Descriptive bookmark names  
✅ **Browser History** - Easy to find pages  

### Title Troubleshooting

**Title Not Updating:**
- Solution: Restart dev server after changing `.env`

**Title Shows "Loading...":**
- This is normal - updates immediately after React mounts

**Wrong Title Format:**
```javascript
// ✅ Correct
useDocumentTitle('Blog');

// ❌ Wrong - don't include site name
useDocumentTitle('Blog | Cygnus Security');
```

### Advanced Title Usage

**Conditional Titles:**
```javascript
const Dashboard = () => {
  const { user } = useAuth();
  useDocumentTitle(user ? `${user.name}'s Dashboard` : 'Dashboard');
  return <div>...</div>;
};
```

**Loading States:**
```javascript
const DataPage = () => {
  const [loading, setLoading] = useState(true);
  useDocumentTitle(loading ? 'Loading...' : 'Data');
  return <div>...</div>;
};
```

**Notification Counts:**
```javascript
const Messages = () => {
  const [unread, setUnread] = useState(0);
  useDocumentTitle(unread > 0 ? `(${unread}) Messages` : 'Messages');
  return <div>...</div>;
};
```

### Title Best Practices

1. **Keep Titles Short** - 50-60 characters max for SEO
2. **Be Descriptive** - Clear indication of page content
3. **Use Consistent Format** - `Page Name | Site Name`
4. **Avoid Duplication** - Don't repeat site name in page title
5. **Update on Content Change** - Use dynamic titles for dynamic content

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

**Method 1: GitHub Integration**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

**Method 2: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Netlify

**Method 1: Drag & Drop**
```bash
npm run build
# Drag 'dist' folder to netlify.com
```

**Method 2: GitHub Integration**
1. Push to GitHub
2. Go to Netlify dashboard
3. Click "New site from Git"
4. Select repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Method 3: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod
```

### Option 3: Docker

**Docker Compose (Recommended)**
```bash
docker-compose up --build
# Access at http://localhost:8080
```

**Docker CLI**
```bash
# Build image
docker build -t cygnus-sec .

# Run container
docker run -d -p 8080:80 --name cygnus-sec cygnus-sec

# Production with restart policy
docker run -d \
  -p 80:80 \
  --name cygnus-sec \
  --restart unless-stopped \
  cygnus-sec
```

### Option 4: Traditional Hosting (cPanel, VPS)

**Step 1: Build**
```bash
npm run build
```

**Step 2: Upload**
Upload contents of `dist` folder to your web server via FTP/SFTP/SSH.

**Step 3: Configure Web Server**

**Apache (.htaccess)**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|pdf)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Option 5: GitHub Pages

**Step 1: Install gh-pages**
```bash
npm install --save-dev gh-pages
```

**Step 2: Update package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/repo-name"
}
```

**Step 3: Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/repo-name/',
});
```

**Step 4: Deploy**
```bash
npm run deploy
```

### Environment Variables

Create `.env.local` for development:
```bash
VITE_SITE_NAME=CygnusSec
VITE_SITE_URL=http://localhost:5173
VITE_EMAIL=tdduong@ioit.ac.vn
VITE_GITHUB=https://github.com/dylantran
VITE_LINKEDIN=https://linkedin.com/in/dylantran
```

For production, set these in your hosting platform dashboard.

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework |
| Vite | 5.2.0 | Build tool & dev server |
| TailwindCSS | 3.4.14 | Utility-first CSS framework |
| React Router | 6.22.3 | Client-side routing |
| Docker | Latest | Containerization |
| Nginx | Alpine | Production web server |

### Dependencies

**Production (3)**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.3"
}
```

**Development (5)**
```json
{
  "vite": "^5.2.0",
  "@vitejs/plugin-react": "^4.3.1",
  "tailwindcss": "^3.4.14",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47"
}
```

### Build Output

```
dist/
├── index.html           0.48 kB (gzipped: 0.31 kB)
├── assets/
│   ├── linux.png       51.02 kB
│   ├── index.css       16.73 kB (gzipped: 4.23 kB)
│   └── index.js       194.03 kB (gzipped: 60.97 kB)
└── pdfs/               ~11 MB total
```

**Total Bundle Size**: ~262 KB (gzipped: ~65 KB)

---

## 📊 Performance

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Optimization Features
- Code splitting with Vite
- Optimized images
- Gzip compression (Nginx)
- Static asset caching (7 days)
- Minimal dependencies
- Fast build times (~800ms)

---

## 🎯 Features Checklist

### Design
- ✅ Hacker theme with neon green
- ✅ Matrix background animation
- ✅ Glass morphism effects
- ✅ Responsive design
- ✅ Smooth animations

### Pages
- ✅ Home with hero section
- ✅ About with 3 tabs
- ✅ Blog listing
- ✅ Individual post pages
- ✅ Tag filtering
- ✅ Contact form

### Components
- ✅ Matrix animation
- ✅ Typing effect
- ✅ Navigation header
- ✅ Profile card
- ✅ PDF download list
- ✅ Blog post cards
- ✅ Tag list
- ✅ Footer

### Content
- ✅ 5 blog posts with full content
- ✅ 6 PDF resources
- ✅ Skills with progress bars
- ✅ Contact information
- ✅ Research interests

### Technical
- ✅ React Router setup
- ✅ Docker configuration
- ✅ Nginx setup
- ✅ Build optimization
- ✅ Responsive design
- ✅ SEO ready

---

## 📝 Changelog

### [2.3.0] - 2026-05-02

#### Changed
- 🔄 **Route Change**: `/projects` → `/researches` across entire project
- 📝 Updated all navigation configs to use `/researches`
- 🔗 Updated all internal links from `/projects` to `/researches`
- 📚 Updated README.md examples with new route

#### Files Updated
- `src/App.jsx` - Route definition
- `src/config/env.js` - Default navigation config
- `src/pages/About.jsx` - Quick links
- `.env` - Navigation buttons
- `.env.example` - Navigation buttons
- `README.md` - All documentation examples

### [2.2.2] - 2026-05-02

#### Added
- 🔄 **Auto-sync Navigation Labels with Page Titles** - Page titles now automatically use navigation button labels
- 🎯 Helper function `getPageTitleFromPath()` to get page title from navigation config
- 🤖 Auto-detection: `useDocumentTitle()` without parameters now auto-detects title from navigation
- 📝 **Auto-sync Page Headers (h1)** - Page headers now also read from navigation config

#### Changed
- 📝 Updated `useDocumentTitle` hook to auto-detect title from navigation config
- 🔄 All pages now use `useDocumentTitle()` without hardcoded titles
- 📄 All page headers (Blog, Projects, Tags, About) now read from navigation config
- 🎨 When you change "Projects" to "Researchs" in .env:
  - Navigation button: "Researchs" ✅
  - Page title (browser tab): "Researchs | Site Name" ✅
  - Page header (h1): "> Researchs" ✅
  - All 3 sync automatically!

#### Example
```bash
# In .env, change navigation label
VITE_NAV_BUTTONS=Blog:/blog|Researchs:/researches|Tags:/tags|About:/about

# Result (ALL sync automatically):
# - Navigation button: "Researchs" ✅
# - Page title: "Researchs | Cygnus Security" ✅
# - Page header: "> Researchs" ✅
```

### [2.2.1] - 2026-05-02

#### Added
- 🎯 **Dynamic Document Title** - Title now reads from `VITE_SITE_TITLE` in .env
- 🪝 Custom hook `useDocumentTitle()` for per-page title management
- 📄 Page-specific titles: "Blog | Site Name", "About | Site Name", etc.
- 🔍 Dynamic post titles: "Post Title | Site Name"
- 📖 Merged NAVIGATION_GUIDE.md into README.md
- 📖 Merged TITLE_CONFIGURATION.md into README.md

#### Changed
- 📝 Updated `index.html` to use dynamic title (was hard-coded)
- 🔄 All pages now use `useDocumentTitle()` hook
- 📱 Title updates automatically when navigating between pages
- 📚 Consolidated all documentation into single README.md

#### Fixed
- 🐛 Fixed `VITE_SITE_TITLE` not working (was hard-coded in HTML)

#### Removed
- ❌ Removed `NAVIGATION_GUIDE.md` (merged into README.md)
- ❌ Removed `TITLE_CONFIGURATION.md` (merged into README.md)

### [2.2.0] - 2026-05-02

#### Added
- 🎯 **Dynamic Navigation Buttons via .env** - Add/remove/reorder buttons without code changes
- 📝 `VITE_NAV_BUTTONS` environment variable for flexible navigation configuration
- 🔧 `parseNavButtons()` function in `src/config/env.js` to parse button configuration
- 📖 Comprehensive documentation for navigation button configuration

#### Changed
- 🔄 Navigation buttons now read from `config.navButtons` instead of static file
- 🗂️ Removed `src/data/headerButtons.js` (replaced by .env configuration)
- 📚 Updated README.md with navigation configuration examples and rules

#### Removed
- ❌ Removed `src/data/headerButtons.js` - navigation now configured via .env

### [2.1.1] - 2026-05-02

#### Added
- ✨ Active page highlight for navigation buttons (Blog, Projects, Tags, About)
- 🎯 Current page button stays highlighted with hover effect
- 🎨 Custom font "Cyber Blast" for logo/site name
- 📁 Created `src/fonts/` directory for custom fonts

#### Changed
- 🎨 Applied download button style to all navigation buttons (Blog, Projects, Tags, About)
- 🎨 Applied download button style to tab buttons in About and Projects pages
- 💅 All buttons now use gradient background (cyan to blue) with shadow effects
- 🎯 Consistent button styling across the entire website
- ✨ Enhanced visual hierarchy with rounded corners and hover effects
- 🔍 Navigation buttons use `useLocation` to detect active route
- 🔤 Logo "Cygnus Security" now uses Cyber Blast font (17.57 KB)

### [2.1.0] - 2026-05-02

#### Added
- ✨ Projects page with 4 tabs (IDS/IPS Research complete, 3 coming soon)
- 📧 Contact tab merged into About page (Tab 3)
- 🔧 Environment variables system with `src/config/env.js`
- 📄 `.env` and `.env.example` files for configuration
- 🎨 Enhanced spacing and padding for header and content

#### Changed
- 🔄 Moved Resources from About to Projects/IDS-IPS tab
- 📝 About page now has 3 tabs: Profile, Skills, Contact
- 🎯 Navigation menu updated: Blog, Projects, Tags, About (removed Contact)
- 🔗 All contact links now point to `/about` instead of `/contact`
- 📖 Merged all documentation into single README.md file

#### Removed
- ❌ Removed standalone Contact page (`/contact` route)
- ❌ Removed contact form (as requested)
- ❌ Removed separate documentation files (merged into README.md)

### [2.0.0] - 2026-02-09

#### Added
- ✨ Complete redesign with hacker theme
- 🎨 Matrix background animation
- 📄 About page with tabbed interface (Profile, Skills, Resources)
- 📝 Blog system with full post content (5 posts)
- 🏷️ Tags page with filtering functionality
- 📧 Contact page with form and information
- 🎭 TypingText component for hero section
- 📚 Enhanced PdfList with file sizes
- 🎨 PostCard component for blog previews
- 🔄 React Router integration
- 📱 Fully responsive design
- 🐳 Docker multi-stage build
- 📖 Comprehensive documentation

#### Changed
- 🎨 Updated color scheme to neon green/cyan
- 💅 Improved glass morphism effects
- 🔧 Refactored component structure
- 📝 Enhanced blog post data structure
- 🎯 Better navigation with Header component
- 🎨 Improved button styles

#### Fixed
- 🐛 Fixed PDF file paths in PdfList
- 🔧 Fixed routing issues
- 🎨 Fixed CSS class conflicts
- 📱 Fixed mobile responsiveness

#### Removed
- ❌ Removed unused ProfileCard component
- ❌ Removed duplicate Infp component
- ❌ Cleaned up old CSS

### [1.0.0] - 2026-01-01

#### Added
- 🎉 Initial release
- 📄 Basic profile page
- 📚 PDF download list
- 🎨 Matrix background
- 🐳 Docker support

---

## 🐛 Troubleshooting

### Issue: 404 on Page Refresh
**Solution**: Configure SPA routing in your web server (see Deployment section)

### Issue: Assets Not Loading
**Solution**: Check `base` path in `vite.config.js`

### Issue: Environment Variables Not Working
**Solution**: Ensure variables start with `VITE_` prefix

### Issue: Build Fails
**Solution**:
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Docker Container Won't Start
**Solution**:
```bash
docker-compose down
docker-compose up --build
```

---

## 📞 Contact

**Author**: Dylan Tran (Trần Đại Dương)  
**Email**: tdduong@ioit.ac.vn  
**Organization**: Institute of Information Technology  
**Location**: Hanoi, Vietnam

**Social Links**:
- GitHub: [github.com/dylantran](https://github.com/dylantran)
- LinkedIn: [linkedin.com/in/dylantran](https://linkedin.com/in/dylantran)

---

## 📄 License

© 2026 Dylan Tran — All rights reserved.

---

## 🙏 Acknowledgments

- Matrix animation inspired by the classic Matrix digital rain
- Design influenced by modern cybersecurity aesthetics
- Built with modern web technologies

---

## 🚀 Getting Started

Ready to launch your cybersecurity portfolio?

```bash
# Clone or download the project
cd dylantran.tech

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

**Happy coding!** 🎉

---

**Version**: 2.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: February 2026
