/**
 * Social Media Configuration
 * 
 * Configure your social media presence here.
 * Set `enabled: true` for platforms you want to display on the website.
 * Comment out or set `enabled: false` for platforms not yet active.
 */

export interface SocialPlatform {
  name: string;
  url: string;
  handle?: string;
  enabled: boolean;
  icon: string; // Lucide icon name
  ariaLabel: string;
}

export interface SocialMediaConfig {
  twitter: SocialPlatform;
  facebook: SocialPlatform;
  instagram: SocialPlatform;
  linkedin: SocialPlatform;
  youtube: SocialPlatform;
  tiktok: SocialPlatform;
  github: SocialPlatform;
  email: SocialPlatform;
}

export const socialMediaConfig: SocialMediaConfig = {
  // Twitter/X
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/encrypther', // Update with actual handle
    handle: '@encrypther', // Update with actual handle
    enabled: false, // Set to true when account is created
    icon: 'Twitter',
    ariaLabel: 'Follow us on Twitter'
  },

  // Facebook
  facebook: {
    name: 'Facebook',
    url: 'https://facebook.com/encrypther', // Update with actual page
    enabled: false, // Set to true when page is created
    icon: 'Facebook',
    ariaLabel: 'Follow us on Facebook'
  },

  // Instagram
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/encrypther', // Update with actual handle
    handle: '@encrypther', // Update with actual handle
    enabled: false, // Set to true when account is created
    icon: 'Instagram',
    ariaLabel: 'Follow us on Instagram'
  },

  // LinkedIn
  linkedin: {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/encrypther', // Update with actual company page
    enabled: false, // Set to true when page is created
    icon: 'Linkedin',
    ariaLabel: 'Connect with us on LinkedIn'
  },

  // YouTube
  youtube: {
    name: 'YouTube',
    url: 'https://youtube.com/@encrypther', // Update with actual channel
    handle: '@encrypther', // Update with actual handle
    enabled: false, // Set to true when channel is created
    icon: 'Youtube',
    ariaLabel: 'Subscribe to our YouTube channel'
  },

  // TikTok
  tiktok: {
    name: 'TikTok',
    url: 'https://tiktok.com/@encrypther', // Update with actual handle
    handle: '@encrypther', // Update with actual handle
    enabled: false, // Set to true when account is created
    icon: 'Music', // Lucide doesn't have TikTok, using Music as placeholder
    ariaLabel: 'Follow us on TikTok'
  },

  // GitHub (for open-source resources)
  github: {
    name: 'GitHub',
    url: 'https://github.com/encrypther', // Update with actual organization
    enabled: false, // Set to true when repository is created
    icon: 'Github',
    ariaLabel: 'View our open-source resources on GitHub'
  },

  // Email (Always available)
  email: {
    name: 'Email',
    url: 'mailto:info@encrypther.org',
    enabled: true, // Email is always enabled
    icon: 'Mail',
    ariaLabel: 'Email us at info@encrypther.org'
  }
};

/**
 * Get only enabled social platforms
 * Use this to filter and display only active platforms
 */
export function getEnabledPlatforms(): SocialPlatform[] {
  return Object.values(socialMediaConfig).filter(platform => platform.enabled);
}

/**
 * Get social media URLs for structured data (JSON-LD)
 * Returns array of enabled platform URLs
 */
export function getSocialMediaUrls(): string[] {
  return Object.values(socialMediaConfig)
    .filter(platform => platform.enabled && platform.name !== 'Email')
    .map(platform => platform.url);
}

