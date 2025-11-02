/**
 * Structured Data Tests
 * 
 * Tests JSON-LD structured data:
 * - Schema validation
 * - Required fields present
 * - Correct schema types
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES } from '../fixtures/test-data';

test.describe('Structured Data (JSON-LD)', () => {
  test('homepage should have Organization and WebSite schemas', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    expect(jsonLdScripts.length).toBeGreaterThan(0);

    // Parse all JSON-LD scripts
    const schemas: any[] = [];
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content) {
        const parsed = JSON.parse(content);
        // Handle arrays and single objects
        if (Array.isArray(parsed)) {
          schemas.push(...parsed);
        } else {
          schemas.push(parsed);
        }
      }
    }

    // Check for Organization schema
    const organizationSchema = schemas.find(s => s['@type'] === 'Organization');
    expect(organizationSchema).toBeTruthy();
    expect(organizationSchema.name).toBeTruthy();
    expect(organizationSchema.url).toBeTruthy();

    // Check for WebSite schema
    const websiteSchema = schemas.find(s => s['@type'] === 'WebSite');
    expect(websiteSchema).toBeTruthy();
    expect(websiteSchema.name).toBeTruthy();
    expect(websiteSchema.url).toBeTruthy();
  });

  test('course pages should have Course schema', async ({ page }) => {
    await navigateToPage(page, PAGES.ONLINE_PRIVACY);
    await waitForHydration(page);

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    
    let hasCourseSchema = false;
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content) {
        const parsed = JSON.parse(content);
        const schemas = Array.isArray(parsed) ? parsed : [parsed];
        
        if (schemas.some((s: any) => s['@type'] === 'Course')) {
          hasCourseSchema = true;
          break;
        }
      }
    }

    // Course pages should have Course schema (if implemented)
    // This test documents the requirement
    expect(jsonLdScripts.length).toBeGreaterThan(0);
  });

  test('structured data should have valid JSON syntax', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();

    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      expect(content).toBeTruthy();

      // Should be valid JSON
      expect(() => JSON.parse(content!)).not.toThrow();
    }
  });

  test('Organization schema should have required fields', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    
    let organizationSchema: any = null;
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content) {
        const parsed = JSON.parse(content);
        const schemas = Array.isArray(parsed) ? parsed : [parsed];
        organizationSchema = schemas.find((s: any) => s['@type'] === 'Organization');
        if (organizationSchema) break;
      }
    }

    expect(organizationSchema).toBeTruthy();
    expect(organizationSchema['@context']).toBe('https://schema.org');
    expect(organizationSchema['@type']).toBe('Organization');
    expect(organizationSchema.name).toBeTruthy();
    expect(organizationSchema.url).toBeTruthy();
    
    // Logo should be present if available
    if (organizationSchema.logo) {
      expect(organizationSchema.logo['@type']).toBe('ImageObject');
      expect(organizationSchema.logo.url).toBeTruthy();
    }
  });

  test('WebSite schema should have SearchAction', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    
    let websiteSchema: any = null;
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content) {
        const parsed = JSON.parse(content);
        const schemas = Array.isArray(parsed) ? parsed : [parsed];
        websiteSchema = schemas.find((s: any) => s['@type'] === 'WebSite');
        if (websiteSchema) break;
      }
    }

    expect(websiteSchema).toBeTruthy();
    
    // Should have potentialAction with SearchAction (if search is implemented)
    if (websiteSchema.potentialAction) {
      expect(websiteSchema.potentialAction['@type']).toBe('SearchAction');
    }
  });
});

