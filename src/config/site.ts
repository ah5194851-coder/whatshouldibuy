/**
 * Site Configuration
 * 
 * Configurable SITE_URL constant. Default is the Cloudflare live URL.
 * Can be overridden via VITE_SITE_URL environment variable if a custom domain is attached later.
 */
export const SITE_URL =
  (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) ||
  'https://whatshouldibuy.ah5194851.workers.dev';

export const SITE_NAME = 'What Should I Buy?';
export const SITE_TAGLINE = 'Independent Consumer Product Finder & Comparison';
