// Environment configuration
// All environment variables must be prefixed with VITE_ to be exposed to the client

// Parse navigation buttons from environment variable
// Format: "Label:path|Label:path|..."
const parseNavButtons = (navString) => {
  if (!navString) {
    // Default buttons if not configured
    return [
      { name: 'Blog', label: 'Blog', to: '/blog' },
      { name: 'Projects', label: 'Projects', to: '/researches' },
      { name: 'Tags', label: 'Tags', to: '/tags' },
      { name: 'About', label: 'About', to: '/about' },
    ];
  }

  return navString.split('|').map(item => {
    const [label, path] = item.split(':');
    return {
      name: label.trim(),
      label: label.trim(),
      to: path.trim(),
    };
  });
};

export const config = {
  // Site
  siteName: import.meta.env.VITE_SITE_NAME || 'CygnusSec',
  siteTitle: import.meta.env.VITE_SITE_TITLE || 'Dylan Tran | InfoSec Library',
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',

  // Author
  author: {
    name: import.meta.env.VITE_AUTHOR_NAME || 'Trần Đại Dương',
    nameEn: import.meta.env.VITE_AUTHOR_NAME_EN || 'Dylan Tran',
    position: import.meta.env.VITE_AUTHOR_POSITION || 'Researcher - Institute of Information Technology',
    organization: import.meta.env.VITE_AUTHOR_ORGANIZATION || 'Institute of Information Technology',
    location: import.meta.env.VITE_AUTHOR_LOCATION || 'Hanoi, Vietnam',
  },

  // Contact
  contact: {
    email: import.meta.env.VITE_EMAIL || 'tdduong@ioit.ac.vn',
    github: {
      url: import.meta.env.VITE_GITHUB_URL || 'https://github.com/dylantran',
      username: import.meta.env.VITE_GITHUB_USERNAME || 'dylantran',
    },
    linkedin: {
      url: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/dylantran',
      username: import.meta.env.VITE_LINKEDIN_USERNAME || 'dylantran',
    },
  },

  // Images
  avatarUrl: import.meta.env.VITE_AVATAR_URL || 'https://i.ibb.co/MBtjqXQ/avatar.jpg',

  // Navigation
  navButtons: parseNavButtons(import.meta.env.VITE_NAV_BUTTONS),

  // Analytics
  gaId: import.meta.env.VITE_GA_ID,
};

// Helper function to get page title from navigation config based on path
export const getPageTitleFromPath = (path) => {
  const button = config.navButtons.find(btn => btn.to === path);
  return button ? button.label : null;
};

export default config;
