/**
 * All Pages E2E Tests
 * 
 * Tests that all pages render correctly:
 * - Content loads
 * - No errors
 * - Basic functionality works
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES, EXPECTED_TITLES } from '../fixtures/test-data';

test.describe('All Pages Rendering', () => {
  test('homepage should load without errors', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Check for console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to catch any delayed errors
    await page.waitForTimeout(2000);

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      (error) => !error.includes('favicon') && !error.includes('analytics')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('about page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.ABOUT);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.ABOUT);
    await expect(page.locator('h1')).toContainText(/about/i);

    // Check for mission section
    await expect(page.getByText(/Our Mission/i)).toBeVisible();
  });

  test('online privacy page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.ONLINE_PRIVACY);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.ONLINE_PRIVACY);
    await expect(page.locator('h1')).toContainText(/Digital Footprint/i);

    // Check for course sections
    await expect(page.getByText(/What You'll Learn/i)).toBeVisible();
  });

  test('travel safety page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.TRAVEL_SAFETY);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.TRAVEL_SAFETY);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('public safety page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.PUBLIC_SAFETY);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.PUBLIC_SAFETY);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('digital advocacy page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.DIGITAL_ADVOCACY);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.DIGITAL_ADVOCACY);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('contact page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.CONTACT);
    await expect(page.getByText(/Get in Touch/i)).toBeVisible();

    // Check form is present
    await expect(page.locator('form')).toBeVisible();
  });

  test('donate page should render correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.DONATE);
    await waitForHydration(page);

    await expect(page).toHaveTitle(EXPECTED_TITLES.DONATE);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('all pages should have hero sections', async ({ page }) => {
    const pagesToTest = [
      PAGES.HOME,
      PAGES.ABOUT,
      PAGES.ONLINE_PRIVACY,
      PAGES.TRAVEL_SAFETY,
      PAGES.PUBLIC_SAFETY,
    ];

    for (const pagePath of pagesToTest) {
      await navigateToPage(page, pagePath);
      await waitForHydration(page);

      // Check for hero section (H1 should be in hero)
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('all pages should have footer', async ({ page }) => {
    const pagesToTest = [
      PAGES.HOME,
      PAGES.ABOUT,
      PAGES.CONTACT,
    ];

    for (const pagePath of pagesToTest) {
      await navigateToPage(page, pagePath);
      await waitForHydration(page);

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Check footer is visible
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    }
  });

  test('all pages should have header', async ({ page }) => {
    const pagesToTest = [
      PAGES.HOME,
      PAGES.ABOUT,
      PAGES.CONTACT,
    ];

    for (const pagePath of pagesToTest) {
      await navigateToPage(page, pagePath);
      await waitForHydration(page);

      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Check logo is visible
      const logo = page.getByAltText('EncryptHer logo');
      await expect(logo).toBeVisible();
    }
  });

  test('all pages should load images correctly', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);

    // Check images load (have dimensions)
    for (const img of images) {
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      // Images should load (naturalWidth > 0) or be decorative (alt="")
      const alt = await img.getAttribute('alt');
      if (alt !== '') {
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });
});

