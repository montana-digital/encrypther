/**
 * Analytics Configuration
 * 
 * Configure analytics tracking for the website.
 * Supports Google Analytics 4 and Cloudflare Web Analytics.
 */

export interface AnalyticsConfig {
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
    enableInDev: boolean;
  };
  cloudflareAnalytics: {
    enabled: boolean;
    token?: string; // Optional - automatically enabled on Cloudflare Pages
    enableInDev: boolean;
  };
}

export const analyticsConfig: AnalyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    enabled: false, // Set to true when ready to track
    measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 measurement ID
    enableInDev: false, // Set to true to test tracking in development
  },

  // Cloudflare Web Analytics
  cloudflareAnalytics: {
    enabled: false, // Set to true when deployed to Cloudflare Pages
    // token: 'XXXXXXXXXXXXX', // Optional - only needed for custom beacon
    enableInDev: false, // Cloudflare analytics only work in production
  }
};

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}

/**
 * Check if Google Analytics should be enabled
 */
export function shouldEnableGA(): boolean {
  const { enabled, enableInDev } = analyticsConfig.googleAnalytics;
  return enabled && (isProduction() || enableInDev);
}

/**
 * Check if Cloudflare Analytics should be enabled
 */
export function shouldEnableCF(): boolean {
  const { enabled, enableInDev } = analyticsConfig.cloudflareAnalytics;
  return enabled && (isProduction() || enableInDev);
}

