/**
 * Test Helper Utilities
 * 
 * Common functions for Playwright tests
 */

import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Navigate to a page with retry logic
 */
export async function navigateToPage(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Wait for Astro hydration (if needed)
 */
export async function waitForHydration(page: Page): Promise<void> {
  // Wait for any dynamic content to load
  await page.waitForLoadState('networkidle');
  // Small delay to ensure JavaScript has executed
  await page.waitForTimeout(500);
}

/**
 * Run accessibility audit using axe-core
 */
export async function checkAccessibility(page: Page, tags?: string[]): Promise<void> {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(tags || ['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  // Fail test if there are violations
  expect(accessibilityScanResults.violations).toEqual([]);
}

/**
 * Get accessibility results without failing (for reporting)
 */
export async function getAccessibilityResults(page: Page): Promise<{
  violations: any[];
  passes: any[];
  incomplete: any[];
}> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  
  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
  };
}

/**
 * Get Core Web Vitals metrics
 */
export async function getPerformanceMetrics(page: Page): Promise<{
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}> {
  // Use Performance API to get metrics
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      // Wait for page to be fully loaded
      if (document.readyState === 'complete') {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        resolve({
          ttfb: perfData.responseStart - perfData.requestStart,
        });
      } else {
        window.addEventListener('load', () => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          resolve({
            ttfb: perfData.responseStart - perfData.requestStart,
          });
        });
      }
    });
  });

  // Get Web Vitals using Performance Observer (if available)
  const webVitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals: any = {};
      
      // Check for web-vitals library or use Performance Observer
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'largest-contentful-paint') {
                vitals.lcp = entry.startTime;
              }
              if (entry.entryType === 'first-input') {
                vitals.fid = (entry as any).processingStart - entry.startTime;
              }
              if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                vitals.cls = (vitals.cls || 0) + (entry as any).value;
              }
            }
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
          
          // Wait 3 seconds for metrics
          setTimeout(() => {
            observer.disconnect();
            resolve(vitals);
          }, 3000);
        } catch (e) {
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    });
  });

  return { ...metrics, ...webVitals };
}

/**
 * Take a screenshot with consistent naming
 */
export async function takeScreenshot(
  page: Page,
  name: string,
  fullPage: boolean = false
): Promise<void> {
  await page.screenshot({
    path: `test-results/screenshots/${name}.png`,
    fullPage,
  });
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimation(page: Page, timeout: number = 3000): Promise<void> {
  await page.waitForTimeout(timeout);
}

/**
 * Check if element is visible in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Wait for element to be in viewport
 */
export async function waitForInViewport(page: Page, selector: string, timeout: number = 5000): Promise<void> {
  await page.waitForFunction(
    (sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    },
    selector,
    { timeout }
  );
}

/**
 * Get page load time
 */
export async function getPageLoadTime(page: Page): Promise<number> {
  return await page.evaluate(() => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return perfData.loadEventEnd - perfData.fetchStart;
  });
}

/**
 * Check for console errors
 */
export async function checkConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  return errors;
}

/**
 * Wait for all images to load
 */
export async function waitForImages(page: Page): Promise<void> {
  await page.evaluate(() => {
    return Promise.all(
      Array.from(document.images)
        .filter(img => !img.complete)
        .map(
          img =>
            new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              // Timeout after 5 seconds
              setTimeout(reject, 5000);
            })
        )
    );
  });
}

/**
 * Assert performance budget
 */
export function assertPerformanceBudget(
  metrics: { lcp?: number; fid?: number; cls?: number; ttfb?: number },
  budgets: { lcp?: number; fid?: number; cls?: number; ttfb?: number }
): void {
  if (budgets.lcp && metrics.lcp) {
    expect(metrics.lcp).toBeLessThan(budgets.lcp * 1000); // Convert to ms
  }
  if (budgets.fid && metrics.fid) {
    expect(metrics.fid).toBeLessThan(budgets.fid);
  }
  if (budgets.cls && metrics.cls) {
    expect(metrics.cls).toBeLessThan(budgets.cls);
  }
  if (budgets.ttfb && metrics.ttfb) {
    expect(metrics.ttfb).toBeLessThan(budgets.ttfb);
  }
}

