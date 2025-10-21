/**
 * EncryptHer Theme Configuration
 * 
 * This file contains all customizable theme options for the website.
 * Modify these values to change the appearance of your site.
 * 
 * Colors use HSL format: Hue (0-360), Saturation (0-100%), Lightness (0-100%)
 */

export const themeConfig = {
  // PRIMARY COLORS
  colors: {
    // Primary purple color (used for main brand elements)
    primary: {
      light: '280 70% 45%',  // Purple in light mode
      dark: '280 65% 60%',   // Lighter purple in dark mode
    },
    // Accent pink color (used for highlights and CTAs)
    accent: {
      light: '320 65% 55%',  // Pink in light mode
      dark: '320 60% 50%',   // Slightly darker pink in dark mode
    },
    // Background colors
    background: {
      light: '0 0% 100%',    // White
      dark: '240 10% 8%',    // Very dark blue-gray
    },
    // Text colors
    foreground: {
      light: '240 10% 15%',  // Dark gray text
      dark: '0 0% 95%',      // Light gray text
    },
  },

  // TYPOGRAPHY
  typography: {
    // Font families
    fontFamily: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
    },
    // Base font size (rem)
    baseFontSize: '16px',
    // Heading sizes (rem)
    headingSizes: {
      h1: '3rem',    // 48px
      h2: '2.5rem',  // 40px
      h3: '2rem',    // 32px
      h4: '1.5rem',  // 24px
      h5: '1.25rem', // 20px
      h6: '1rem',    // 16px
    },
  },

  // SPACING
  spacing: {
    // Multiplier for Tailwind spacing scale (1 = default)
    scale: 1,
    // Section padding (py-20 = 5rem = 80px by default)
    sectionPaddingY: '5rem',
    sectionPaddingX: '1rem',
  },

  // BORDERS
  borders: {
    // Border radius for cards and buttons (0.75rem = 12px)
    radius: '0.75rem',
  },

  // NAVIGATION
  navigation: {
    // Navbar background opacity (0-1)
    opacity: 0.5,
    // Navbar backdrop blur (px)
    backdropBlur: '12px',
    // Navbar is sticky on scroll
    sticky: true,
  },

  // BUTTONS
  buttons: {
    // Border radius: 'rounded' | 'square' | 'pill'
    style: 'rounded' as 'rounded' | 'square' | 'pill',
    // Shadow intensity: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    shadow: 'md' as 'none' | 'sm' | 'md' | 'lg' | 'xl',
  },

  // EFFECTS
  effects: {
    // Card hover shadow intensity: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    cardHoverShadow: 'lg' as 'sm' | 'md' | 'lg' | 'xl' | '2xl',
    // Transition duration (ms)
    transitionDuration: '300ms',
  },
};

export type ThemeConfig = typeof themeConfig;

