// Security Configuration for CygnusSec
// This file contains security settings and validation rules

export const SECURITY_CONFIG = {
  // Content Security Policy
  CSP: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    fontSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "https:"],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"]
  },

  // Environment Variable Validation
  ENV_VALIDATION: {
    maxLength: 500,
    allowedProtocols: ['http:', 'https:'],
    blockedPatterns: [
      /javascript:/gi,
      /data:/gi,
      /vbscript:/gi,
      /<script/gi,
      /<\/script>/gi,
      /on\w+\s*=/gi,
      /[<>]/g,
      /[&]/g,
      /[`]/g,
      /[$]/g
    ]
  },

  // Rate Limiting
  RATE_LIMITS: {
    api: {
      windowMs: 60 * 1000, // 1 minute
      max: 10 // 10 requests per minute
    },
    content: {
      windowMs: 60 * 1000, // 1 minute
      max: 30 // 30 requests per minute
    }
  },

  // Allowed file types
  ALLOWED_FILE_TYPES: {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
    documents: ['.pdf'],
    content: ['.md', '.json']
  },

  // Security Headers
  SECURITY_HEADERS: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=(), vibrate=(), fullscreen=(self)'
  }
};

// Validation functions
export const validateEnvironmentVariable = (value) => {
  if (!value || typeof value !== 'string') return '';
  
  // Check length
  if (value.length > SECURITY_CONFIG.ENV_VALIDATION.maxLength) {
    value = value.substring(0, SECURITY_CONFIG.ENV_VALIDATION.maxLength);
  }
  
  // Apply blocked patterns
  SECURITY_CONFIG.ENV_VALIDATION.blockedPatterns.forEach(pattern => {
    value = value.replace(pattern, '');
  });
  
  return value;
};

export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return SECURITY_CONFIG.ENV_VALIDATION.allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

export const sanitizeMarkdownContent = (content) => {
  if (!content || typeof content !== 'string') return '';
  
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export default SECURITY_CONFIG;