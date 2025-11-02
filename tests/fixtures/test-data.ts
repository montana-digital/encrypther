/**
 * Test Data Fixtures
 * 
 * Centralized test data for consistency across tests
 */

export const PAGES = {
  HOME: '/',
  ABOUT: '/about',
  ONLINE_PRIVACY: '/online-privacy',
  TRAVEL_SAFETY: '/travel-safety',
  PUBLIC_SAFETY: '/public-safety',
  DIGITAL_ADVOCACY: '/digital-advocacy',
  CONTACT: '/contact',
  DONATE: '/donate',
  BLOG: '/blog',
  NEWSLETTER: '/newsletter',
} as const;

export const EXPECTED_TITLES = {
  HOME: 'EncryptHer - Your Safety, Your Privacy, Your Power',
  ABOUT: 'About EncryptHer - Our Mission & Values',
  ONLINE_PRIVACY: 'Online Privacy & Security Course - EncryptHer',
  TRAVEL_SAFETY: 'Travel Safety for Women - EncryptHer',
  PUBLIC_SAFETY: 'Public Safety & Awareness Training - EncryptHer',
  DIGITAL_ADVOCACY: 'Digital Advocacy - Fighting for Privacy Rights | EncryptHer',
  CONTACT: 'Contact Us - EncryptHer',
  DONATE: 'Donate - Support Women\'s Safety & Empowerment | EncryptHer',
} as const;

export const NAVIGATION_LINKS = [
  { text: 'About', href: '/about' },
  { text: 'What We Do', href: '/#what-we-do' },
  { text: 'Programs', href: null }, // Dropdown
  { text: 'Digital Advocacy', href: '/digital-advocacy' },
  { text: 'Donate', href: '/donate' },
] as const;

export const PROGRAM_LINKS = [
  { text: 'Online Privacy', href: '/online-privacy' },
  { text: 'Public Safety', href: '/public-safety' },
  { text: 'Travel Safety', href: '/travel-safety' },
] as const;

export const FOOTER_LINKS = [
  { text: 'About', href: '/about' },
  { text: 'Online Privacy Course', href: '/online-privacy' },
  { text: 'Public Safety Course', href: '/public-safety' },
  { text: 'Travel Safety Course', href: '/travel-safety' },
  { text: 'Digital Advocacy', href: '/digital-advocacy' },
  { text: 'Contact', href: '/contact' },
  { text: 'Donate', href: '/donate' },
] as const;

export const FORM_TEST_DATA = {
  VALID_CONTACT: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'general',
    message: 'This is a test message for the contact form.',
  },
  INVALID_EMAIL: {
    name: 'Test User',
    email: 'invalid-email',
    subject: 'general',
    message: 'Test message',
  },
  EMPTY_FIELDS: {
    name: '',
    email: '',
    subject: '',
    message: '',
  },
} as const;

export const PERFORMANCE_BUDGETS = {
  LCP: 2.5, // seconds
  FID: 100, // milliseconds
  CLS: 0.1,
  TTFB: 800, // milliseconds
  PAGE_LOAD: 3000, // milliseconds
} as const;

export const VIEWPORTS = {
  MOBILE: { width: 375, height: 667 }, // iPhone SE
  TABLET: { width: 768, height: 1024 }, // iPad
  DESKTOP: { width: 1920, height: 1080 },
  LAPTOP: { width: 1366, height: 768 },
} as const;

export const ACCESSIBILITY_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa'] as const;

