// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Site URL - Update this when custom domain is configured
  site: 'https://encrypther.pages.dev',
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
    sitemap({
      // Customize sitemap generation
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Customize priority and changefreq for specific pages
      serialize(item) {
        // Homepage - highest priority
        if (item.url.endsWith('/')) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Program pages - high priority
        else if (item.url.includes('/online-privacy') || 
                 item.url.includes('/travel-safety') || 
                 item.url.includes('/public-safety') ||
                 item.url.includes('/digital-advocacy')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // About and contact - medium priority
        else if (item.url.includes('/about') || 
                 item.url.includes('/contact')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  
  output: 'static', // Static site generation for Cloudflare Pages
  
  // Build configuration optimized for Cloudflare Pages
  build: {
    format: 'file', // Generate clean URLs (about.html instead of about/index.html)
    inlineStylesheets: 'auto', // Inline small stylesheets for better performance
    assets: '_astro', // Asset directory name
  },
  
  // Cloudflare Pages compatibility
  trailingSlash: 'ignore', // Let Cloudflare handle trailing slashes
  
  // Optimize images (if using Astro's Image component in future)
  image: {
    domains: ['encrypther.pages.dev'],
  },
  
  // Vite configuration for build optimization
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunking for better caching
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});
