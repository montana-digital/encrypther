// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We'll use custom base styles
    }),
  ],
  output: 'static', // Static site generation for Cloudflare Pages
  build: {
    inlineStylesheets: 'auto',
  },
});
