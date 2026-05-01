import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { config, getPageTitleFromPath } from '../config/env';

/**
 * Custom hook to set document title
 * @param {string} title - Page title (optional - will auto-detect from navigation config if not provided)
 * @param {boolean} useDefault - If true, uses only the site title from config
 */
export const useDocumentTitle = (title, useDefault = false) => {
  const location = useLocation();

  useEffect(() => {
    if (useDefault) {
      // Use full site title
      document.title = config.siteTitle;
    } else if (title) {
      // Use provided title
      document.title = `${title} | ${config.siteName}`;
    } else {
      // Auto-detect title from navigation config based on current path
      const autoTitle = getPageTitleFromPath(location.pathname);
      if (autoTitle) {
        document.title = `${autoTitle} | ${config.siteName}`;
      } else {
        // Fallback to default site title
        document.title = config.siteTitle;
      }
    }

    // Cleanup: restore default title when component unmounts
    return () => {
      document.title = config.siteTitle;
    };
  }, [title, useDefault, location.pathname]);
};

export default useDocumentTitle;
