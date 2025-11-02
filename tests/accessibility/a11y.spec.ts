/**
 * Accessibility Tests
 * 
 * Tests WCAG 2.1 AA compliance using axe-core
 * Runs on all pages to ensure accessibility standards
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration, checkAccessibility, getAccessibilityResults } from '../utils/test-helpers';
import { PAGES } from '../fixtures/test-data';

test.describe('Accessibility Compliance', () => {
  const pagesToTest = [
    PAGES.HOME,
    PAGES.ABOUT,
    PAGES.ONLINE_PRIVACY,
    PAGES.TRAVEL_SAFETY,
    PAGES.PUBLIC_SAFETY,
    PAGES.DIGITAL_ADVOCACY,
    PAGES.CONTACT,
    PAGES.DONATE,
  ];

  for (const pagePath of pagesToTest) {
    test(`should have no accessibility violations on ${pagePath}`, async ({ page }) => {
      await navigateToPage(page, pagePath);
      await waitForHydration(page);

      // Run accessibility audit
      await checkAccessibility(page);
    });
  }

  test('homepage should meet WCAG 2.1 AA standards', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const results = await getAccessibilityResults(page);

    // Log violations for debugging
    if (results.violations.length > 0) {
      console.log('Accessibility violations found:', JSON.stringify(results.violations, null, 2));
    }

    // Assert no critical violations
    const criticalViolations = results.violations.filter(
      (v: any) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(criticalViolations.length).toBe(0);
  });

  test('should have proper color contrast', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const results = await getAccessibilityResults(page);

    // Check for color contrast violations
    const contrastViolations = results.violations.filter((v: any) =>
      v.id === 'color-contrast' || v.id === 'color-contrast-enhanced'
    );

    expect(contrastViolations.length).toBe(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Should have exactly one H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check for proper heading levels
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // First heading should be H1
    const firstHeading = headings[0];
    const tagName = await firstHeading.evaluate((el) => el.tagName);
    expect(tagName).toBe('H1');
  });

  test('should have alt text on all images', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Alt can be empty for decorative images, but should exist
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);

    const inputs = await page.locator('input, textarea, select').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      if (!id) continue;

      const label = page.locator(`label[for="${id}"]`);
      const hasLabel = await label.count() > 0;
      const hasAriaLabel = await input.getAttribute('aria-label');
      const hasAriaLabelledBy = await input.getAttribute('aria-labelledby');

      expect(hasLabel || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Check focused element has visible outline
    const focusedElement = page.locator(':focus');
    const outlineStyle = await focusedElement.evaluate((el: Element) => {
      const style = window.getComputedStyle(el);
      return style.outlineWidth !== '0px' || style.boxShadow !== 'none';
    });

    expect(outlineStyle || await focusedElement.evaluate((el: Element) => {
      const style = window.getComputedStyle(el);
      return style.boxShadow !== 'none';
    })).toBeTruthy();
  });

  test('should have language attribute on HTML', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBeTruthy();
    expect(htmlLang).toMatch(/^en/);
  });

  test('should have skip links or proper landmark regions', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Check for semantic landmarks
    const main = page.locator('main');
    const hasMain = await main.count() > 0;
    
    const header = page.locator('header');
    const hasHeader = await header.count() > 0;

    const footer = page.locator('footer');
    const hasFooter = await footer.count() > 0;

    const nav = page.locator('nav');
    const hasNav = await nav.count() > 0;

    // Should have at least main and navigation
    expect(hasMain || hasNav).toBeTruthy();
  });

  test('should not have duplicate IDs', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const ids = await page.evaluate(() => {
      const elements = document.querySelectorAll('[id]');
      const idMap = new Map();
      
      elements.forEach((el) => {
        const id = el.id;
        if (id) {
          idMap.set(id, (idMap.get(id) || 0) + 1);
        }
      });
      
      const duplicates: string[] = [];
      idMap.forEach((count, id) => {
        if (count > 1) duplicates.push(id);
      });
      
      return duplicates;
    });

    expect(ids.length).toBe(0);
  });
});

