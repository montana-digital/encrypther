/**
 * SEO Configuration
 * 
 * Centralized SEO metadata for the EncryptHer website.
 * Update these values to customize meta tags across all pages.
 */

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  author: string;
  keywords: string[];
  locale: string;
  themeColor: string;
  twitterHandle?: string;
  organization: {
    name: string;
    legalName: string;
    foundingDate: string;
    email: string;
    telephone?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
}

export const seoConfig: SEOConfig = {
  // Site Information
  siteName: 'EncryptHer',
  siteUrl: 'https://encrypther.pages.dev', // Will be updated when custom domain is configured
  defaultTitle: 'EncryptHer - Your Safety, Your Privacy, Your Power',
  defaultDescription: 'EncryptHer provides essential education on online privacy, personal safety, and digital advocacy for women worldwide.',
  defaultImage: '/images/hero-privacy.jpg',
  author: 'Anastasiya, Cybersecurity Analyst and Founder of EncryptHer',
  
  // SEO Keywords (top keywords for search engines)
  keywords: [
    'women digital safety',
    'online privacy education',
    'cybersecurity for women',
    'personal safety training',
    'travel safety women',
    'public awareness',
    'digital advocacy',
    'privacy legislation',
    'data protection',
    'women empowerment',
    'digital rights',
    'online harassment prevention',
    'situational awareness',
    'cyber safety',
    'women privacy rights'
  ],
  
  // Localization
  locale: 'en_US',
  
  // Branding
  themeColor: '#8b5cf6', // Primary purple color
  
  // Social Media (Optional - update when handles are created)
  // twitterHandle: '@EncryptHer', // Uncomment and update when Twitter/X account is created
  
  // Organization Details (for structured data)
  organization: {
    name: 'EncryptHer',
    legalName: 'EncryptHer',
    foundingDate: '2024',
    email: 'info@encrypther.org',
    // telephone: '+1-XXX-XXX-XXXX', // Update when available
    // address: { // Update when physical address is established
    //   streetAddress: '',
    //   addressLocality: '',
    //   addressRegion: '',
    //   postalCode: '',
    //   addressCountry: 'US'
    // }
  }
};

/**
 * Page-specific SEO configurations
 * Override defaults for specific pages
 */
export const pageSEO = {
  home: {
    title: 'EncryptHer - Your Safety, Your Privacy, Your Power',
    description: 'EncryptHer empowers women through comprehensive education on online privacy, personal safety, travel security, and digital advocacy. Join thousands learning to protect themselves in the digital age.',
    keywords: ['women digital safety', 'online privacy education', 'cybersecurity training', 'personal safety for women']
  },
  about: {
    title: 'About EncryptHer - Our Mission & Values',
    description: 'Learn about EncryptHer\'s mission to empower women through cybersecurity education, privacy awareness, and practical safety training. Founded by cybersecurity analyst Anastasiya.',
    keywords: ['EncryptHer mission', 'women empowerment', 'cybersecurity analyst', 'privacy advocacy', 'digital safety education']
  },
  onlinePrivacy: {
    title: 'Online Privacy & Security Course - EncryptHer',
    description: '1 in 3 women experience online harassment. Learn to protect your digital footprint, secure your accounts, and maintain privacy online with our comprehensive privacy course.',
    keywords: ['online privacy', 'digital security', 'cybersecurity course', 'data protection', 'online harassment prevention']
  },
  publicSafety: {
    title: 'Public Safety & Awareness Training - EncryptHer',
    description: 'Research shows awareness and education can reduce women\'s risk of violence by up to 50%. Turn fear into preparedness with situational awareness and safety training.',
    keywords: ['public safety', 'situational awareness', 'self-defense', 'violence prevention', 'women safety training']
  },
  travelSafety: {
    title: 'Travel Safety for Women - EncryptHer',
    description: '1 in 4 female travelers feel unsafe when traveling alone. Learn to identify danger before it starts, from rideshare red flags to hotel security checks.',
    keywords: ['travel safety', 'women solo travel', 'safe travel tips', 'travel security', 'international travel safety']
  },
  digitalAdvocacy: {
    title: 'Digital Advocacy - Fighting for Privacy Rights',
    description: 'EncryptHer advocates for comprehensive federal privacy legislation. Learn how to demand privacy protections and join the fight for digital rights in America.',
    keywords: ['digital advocacy', 'privacy legislation', 'data protection laws', 'privacy rights', 'GDPR', 'CCPA', 'digital rights']
  },
  contact: {
    title: 'Contact Us - EncryptHer',
    description: 'Get in touch with EncryptHer. We\'re here to answer questions, provide support, and help with media inquiries.',
    keywords: ['contact EncryptHer', 'support', 'inquiries', 'get help']
  },
  donate: {
    title: 'Donate - Support Women\'s Digital Safety',
    description: 'Support EncryptHer\'s mission to empower women through digital safety education. Your donation helps us provide free resources and advocacy.',
    keywords: ['donate', 'support women', 'nonprofit', 'digital safety donation']
  }
};

