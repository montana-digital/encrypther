import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

/**
 * Vitest Configuration
 * 
 * Unit testing configuration for EncryptHer project.
 * Tests TypeScript utilities, configs, and business logic.
 * 
 * E2E tests use Playwright (configured in playwright.config.ts)
 */

export default defineConfig({
  test: {
    // Test environment (happy-dom for DOM APIs without browser)
    environment: 'happy-dom',
    
    // Test file patterns
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.astro', 'tests/**'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/types.ts',
        'tests/**',
        '**/*.test.{ts,js}',
        '**/*.spec.{ts,js}',
      ],
      // Thresholds (adjusted for browser-specific code better tested in E2E)
      thresholds: {
        lines: 50,
        functions: 45,
        branches: 35,
        statements: 47,
      },
    },
    
    // Globals (vitest globals available without import)
    globals: true,
    
    // Test timeout
    testTimeout: 10000,
    
    // Setup files (if needed for global test setup)
    // setupFiles: ['./tests/setup.ts'],
    
    // Reporter configuration
    reporters: ['verbose'],
    
    // Watch mode
    watch: false,
  },
  
  // Resolve paths (for cleaner imports in tests)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@config': resolve(__dirname, './src/config'),
      '@scripts': resolve(__dirname, './src/scripts'),
    },
  },
});

