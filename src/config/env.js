// Environment configuration
// Support both build-time (VITE_*) and runtime (window.ENV_CONFIG) variables

// Lazy getter - reads window.ENV_CONFIG at call time, not at module load time
// This ensures config.js has already been executed before we read it
const get = (key, buildTimeVal, fallback) => {
  const runtime = typeof window !== 'undefined' ? window.ENV_CONFIG : null;
  const runtimeVal = runtime?.[key];

  // Skip unresolved placeholders or empty values
  if (runtimeVal && !(runtimeVal.startsWith('__') && runtimeVal.endsWith('__'))) {
    return runtimeVal;
  }
  return buildTimeVal || fallback;
};

// Parse navigation buttons from environment variable
// Format: "Label:path|Label:path|..."
const parseNavButtons = (navString) => {
  if (!navString) {
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

// Config object uses getters so window.ENV_CONFIG is read lazily at access time
export const config = {
  get siteName()       { return get('SITE_NAME',        import.meta.env.VITE_SITE_NAME,        'CygnusSec'); },
  get siteTitle()      { return get('SITE_TITLE',       import.meta.env.VITE_SITE_TITLE,       'Dylan Tran | InfoSec Library'); },
  get siteUrl()        { return get('SITE_URL',         import.meta.env.VITE_SITE_URL,         'http://localhost:5173'); },
  get avatarUrl()      { return get('AVATAR_URL',       import.meta.env.VITE_AVATAR_URL,       'https://i.ibb.co/MBtjqXQ/avatar.jpg'); },
  get navButtons()     { return parseNavButtons(get('NAV_BUTTONS', import.meta.env.VITE_NAV_BUTTONS, null)); },
  get gaId()           { return get('GA_ID',            import.meta.env.VITE_GA_ID,            ''); },

  get author() {
    return {
      name:         get('AUTHOR_NAME',         import.meta.env.VITE_AUTHOR_NAME,         'Trần Đại Dương'),
      nameEn:       get('AUTHOR_NAME_EN',      import.meta.env.VITE_AUTHOR_NAME_EN,      'Dylan Tran'),
      position:     get('AUTHOR_POSITION',     import.meta.env.VITE_AUTHOR_POSITION,     'Researcher - Institute of Information Technology'),
      organization: get('AUTHOR_ORGANIZATION', import.meta.env.VITE_AUTHOR_ORGANIZATION, 'Institute of Information Technology'),
      location:     get('AUTHOR_LOCATION',     import.meta.env.VITE_AUTHOR_LOCATION,     'Hanoi, Vietnam'),
    };
  },

  get contact() {
    return {
      email: get('EMAIL', import.meta.env.VITE_EMAIL, 'tdduong@ioit.ac.vn'),
      github: {
        url:      get('GITHUB_URL',      import.meta.env.VITE_GITHUB_URL,      'https://github.com/dylantran'),
        username: get('GITHUB_USERNAME', import.meta.env.VITE_GITHUB_USERNAME, 'dylantran'),
      },
      linkedin: {
        url:      get('LINKEDIN_URL',      import.meta.env.VITE_LINKEDIN_URL,      'https://linkedin.com/in/dylantran'),
        username: get('LINKEDIN_USERNAME', import.meta.env.VITE_LINKEDIN_USERNAME, 'dylantran'),
      },
    };
  },
};

// Helper function to get page title from navigation config based on path
export const getPageTitleFromPath = (path) => {
  const button = config.navButtons.find(btn => btn.to === path);
  return button ? button.label : null;
};

export default config;
