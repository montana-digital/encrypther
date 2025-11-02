import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * 
 * Comprehensive testing setup for EncryptHer website
 * Tests UI, accessibility, performance, SEO, and user experience
 */

export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Test execution
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['list'],
    process.env.CI ? ['github'] : ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL - use preview server in CI, localhost in dev
    baseURL: process.env.CI 
      ? process.env.PREVIEW_URL || 'http://localhost:4321'
      : 'http://localhost:4321',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure (optional, can be enabled)
    video: 'retain-on-failure',
    
    // Trace on failure for debugging
    trace: 'on-first-retry',
    
    // Browser context options
    viewport: { width: 1920, height: 1080 },
    
    // Reduced motion for accessibility testing
    colorScheme: 'light',
    
    // Timeouts
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  // Configure projects for different browsers and viewports
  projects: [
    // Desktop Chrome
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Desktop Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // Desktop Safari/WebKit
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile iPhone
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    // Mobile Safari
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tablet
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro'] },
    },

    // Dark mode testing
    {
      name: 'chromium-dark',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
      },
    },
  ],

  // Web server configuration for local testing
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});

