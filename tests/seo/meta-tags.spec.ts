/**
 * SEO Tests - Meta Tags
 * 
 * Tests SEO optimization:
 * - Title tags
 * - Meta descriptions
 * - Canonical URLs
 * - Open Graph tags
 * - Twitter Cards
 * - Structured data
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES, EXPECTED_TITLES } from '../fixtures/test-data';

test.describe('SEO Meta Tags', () => {
  test('should have unique title tags on all pages', async ({ page }) => {
    const pageTests = [
      { path: PAGES.HOME, expected: EXPECTED_TITLES.HOME },
      { path: PAGES.ABOUT, expected: EXPECTED_TITLES.ABOUT },
      { path: PAGES.ONLINE_PRIVACY, expected: EXPECTED_TITLES.ONLINE_PRIVACY },
      { path: PAGES.TRAVEL_SAFETY, expected: EXPECTED_TITLES.TRAVEL_SAFETY },
      { path: PAGES.PUBLIC_SAFETY, expected: EXPECTED_TITLES.PUBLIC_SAFETY },
      { path: PAGES.DIGITAL_ADVOCACY, expected: EXPECTED_TITLES.DIGITAL_ADVOCACY },
      { path: PAGES.CONTACT, expected: EXPECTED_TITLES.CONTACT },
      { path: PAGES.DONATE, expected: EXPECTED_TITLES.DONATE },
    ];

    for (const { path, expected } of pageTests) {
      await navigateToPage(page, path);
      await expect(page).toHaveTitle(expected);
      
      // Title should be reasonable length (< 60 chars recommended)
      const title = await page.title();
      expect(title.length).toBeLessThan(60);
    }
  });

  test('should have meta descriptions on all pages', async ({ page }) => {
    const pagesToTest = [
      PAGES.HOME,
      PAGES.ABOUT,
      PAGES.ONLINE_PRIVACY,
      PAGES.CONTACT,
    ];

    for (const pagePath of pagesToTest) {
      await navigateToPage(page, pagePath);
      
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', /.+/);
      
      const description = await metaDescription.getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(120);
      expect(description!.length).toBeLessThan(160); // Google recommended length
    }
  });

  test('should have canonical URLs', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
    
    const href = await canonical.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('should have Open Graph tags', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    // Check required Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
  });

  test('should have Twitter Card tags', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /.+/);
  });

  test('should have robots meta tag', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /.+/);
    
    const content = await robots.getAttribute('content');
    expect(content).toMatch(/index|follow/);
  });

  test('should have structured data (JSON-LD)', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThan(0);
    
    // Parse and validate JSON-LD
    const firstJsonLd = jsonLd.first();
    const content = await firstJsonLd.textContent();
    expect(content).toBeTruthy();
    
    // Should be valid JSON
    const parsed = JSON.parse(content!);
    expect(parsed).toBeTruthy();
    expect(parsed['@context']).toBeTruthy();
    expect(parsed['@type']).toBeTruthy();
  });

  test('should have proper heading hierarchy for SEO', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    // Should have exactly one H1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // H1 should contain main keyword/title
    const h1Text = await page.locator('h1').first().textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text!.length).toBeGreaterThan(10);
  });

  test('should have alt text on all images for SEO', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Alt should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });
});

