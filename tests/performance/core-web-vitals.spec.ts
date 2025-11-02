/**
 * Performance Tests - Core Web Vitals
 * 
 * Tests Core Web Vitals and performance budgets:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - TTFB (Time to First Byte)
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration, getPerformanceMetrics, assertPerformanceBudget } from '../utils/test-helpers';
import { PAGES, PERFORMANCE_BUDGETS } from '../fixtures/test-data';

test.describe('Core Web Vitals', () => {
  test('homepage should meet performance budgets', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Wait a bit for metrics to stabilize
    await page.waitForTimeout(3000);

    const metrics = await getPerformanceMetrics(page);

    // Assert performance budgets
    assertPerformanceBudget(metrics, {
      lcp: PERFORMANCE_BUDGETS.LCP,
      fid: PERFORMANCE_BUDGETS.FID,
      cls: PERFORMANCE_BUDGETS.CLS,
      ttfb: PERFORMANCE_BUDGETS.TTFB,
    });
  });

  test('should have fast page load time', async ({ page }) => {
    const startTime = Date.now();
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(PERFORMANCE_BUDGETS.PAGE_LOAD);
  });

  test('should have low TTFB', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    const ttfb = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return perfData.responseStart - perfData.requestStart;
    });

    expect(ttfb).toBeLessThan(PERFORMANCE_BUDGETS.TTFB);
  });

  test('all pages should load quickly', async ({ page }) => {
    const pagesToTest = [
      PAGES.HOME,
      PAGES.ABOUT,
      PAGES.ONLINE_PRIVACY,
      PAGES.CONTACT,
    ];

    for (const pagePath of pagesToTest) {
      const startTime = Date.now();
      await navigateToPage(page, pagePath);
      await waitForHydration(page);
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(PERFORMANCE_BUDGETS.PAGE_LOAD);
    }
  });

  test('should lazy load images', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    // Check that images have loading="lazy" attribute
    const images = await page.locator('img[loading="lazy"]').all();
    
    // At least some images should be lazy loaded
    // (hero images might be eager, but others should be lazy)
    expect(images.length).toBeGreaterThan(0);
  });

  test('should not have render-blocking resources', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    // Check for render-blocking stylesheets
    const blockingStylesheets = await page.evaluate(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const blocking = Array.from(links).filter((link: Element) => {
        const el = link as HTMLLinkElement;
        return !el.media || el.media === 'all';
      });
      return blocking.length;
    });

    // Should have minimal render-blocking stylesheets
    // (Inlined critical CSS is acceptable)
    expect(blockingStylesheets).toBeLessThan(5);
  });

  test('should have optimized bundle size', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    // Check total transfer size
    const totalSize = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .reduce((total: number, entry: any) => {
          return total + (entry.transferSize || 0);
        }, 0);
    });

    // Total transfer should be reasonable (adjust based on actual site)
    // This is a rough check - actual budget depends on site size
    expect(totalSize).toBeLessThan(2 * 1024 * 1024); // 2MB
  });

  test('should have minimal layout shift', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
    await page.waitForTimeout(2000); // Wait for content to settle

    const metrics = await getPerformanceMetrics(page);

    if (metrics.cls !== undefined) {
      expect(metrics.cls).toBeLessThan(PERFORMANCE_BUDGETS.CLS);
    }
  });
});

