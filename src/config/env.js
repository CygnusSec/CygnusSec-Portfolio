// Environment configuration
// Support both build-time (VITE_*) and runtime (window.ENV_CONFIG) variables

// Get runtime config from window.ENV_CONFIG (injected by docker-entrypoint.sh)
const getRuntimeConfig = () => {
  if (typeof window !== 'undefined' && window.ENV_CONFIG) {
    // Filter out unresolved placeholders and empty strings
    const cfg = {};
    for (const [key, val] of Object.entries(window.ENV_CONFIG)) {
      if (typeof val === 'string' && (val.startsWith('__') && val.endsWith('__'))) continue;
      if (val === '' || val === null || val === undefined) continue;
      cfg[key] = val;
    }
    return cfg;
  }
  return {};
};

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

const runtimeConfig = getRuntimeConfig();

export const config = {
  // Site - Runtime config takes precedence
  siteName: runtimeConfig.SITE_NAME || import.meta.env.VITE_SITE_NAME || 'CygnusSec',
  siteTitle: runtimeConfig.SITE_TITLE || import.meta.env.VITE_SITE_TITLE || 'Dylan Tran | InfoSec Library',
  siteUrl: runtimeConfig.SITE_URL || import.meta.env.VITE_SITE_URL || 'http://localhost:5173',

  // Author
  author: {
    name: runtimeConfig.AUTHOR_NAME || import.meta.env.VITE_AUTHOR_NAME || 'Trần Đại Dương',
    nameEn: runtimeConfig.AUTHOR_NAME_EN || import.meta.env.VITE_AUTHOR_NAME_EN || 'Dylan Tran',
    position: runtimeConfig.AUTHOR_POSITION || import.meta.env.VITE_AUTHOR_POSITION || 'Researcher - Institute of Information Technology',
    organization: runtimeConfig.AUTHOR_ORGANIZATION || import.meta.env.VITE_AUTHOR_ORGANIZATION || 'Institute of Information Technology',
    location: runtimeConfig.AUTHOR_LOCATION || import.meta.env.VITE_AUTHOR_LOCATION || 'Hanoi, Vietnam',
  },

  // Contact
  contact: {
    email: runtimeConfig.EMAIL || import.meta.env.VITE_EMAIL || 'tdduong@ioit.ac.vn',
    github: {
      url: runtimeConfig.GITHUB_URL || import.meta.env.VITE_GITHUB_URL || 'https://github.com/dylantran',
      username: runtimeConfig.GITHUB_USERNAME || import.meta.env.VITE_GITHUB_USERNAME || 'dylantran',
    },
    linkedin: {
      url: runtimeConfig.LINKEDIN_URL || import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/dylantran',
      username: runtimeConfig.LINKEDIN_USERNAME || import.meta.env.VITE_LINKEDIN_USERNAME || 'dylantran',
    },
  },

  // Images
  avatarUrl: runtimeConfig.AVATAR_URL || import.meta.env.VITE_AVATAR_URL || 'https://i.ibb.co/MBtjqXQ/avatar.jpg',

  // Navigation
  navButtons: parseNavButtons(runtimeConfig.NAV_BUTTONS || import.meta.env.VITE_NAV_BUTTONS),

  // Analytics
  gaId: runtimeConfig.GA_ID || import.meta.env.VITE_GA_ID,
};

// Helper function to get page title from navigation config based on path
export const getPageTitleFromPath = (path) => {
  const button = config.navButtons.find(btn => btn.to === path);
  return button ? button.label : null;
};

export default config;
