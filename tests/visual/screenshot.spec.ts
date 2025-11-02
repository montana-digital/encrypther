/**
 * Visual Regression Tests
 * 
 * Takes screenshots of pages for visual comparison:
 * - Full page screenshots
 * - Mobile and desktop viewports
 * - Light and dark mode
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration, takeScreenshot } from '../utils/test-helpers';
import { PAGES, VIEWPORTS } from '../fixtures/test-data';

test.describe('Visual Regression - Screenshots', () => {
  test('homepage desktop screenshot', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.DESKTOP);
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
    await page.waitForTimeout(2000); // Wait for animations

    await takeScreenshot(page, 'homepage-desktop', true);
  });

  test('homepage mobile screenshot', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.MOBILE);
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
    await page.waitForTimeout(2000);

    await takeScreenshot(page, 'homepage-mobile', true);
  });

  test('homepage tablet screenshot', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.TABLET);
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
    await page.waitForTimeout(2000);

    await takeScreenshot(page, 'homepage-tablet', true);
  });

  test('about page screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.ABOUT);
    await waitForHydration(page);
    await page.waitForTimeout(1000);

    await takeScreenshot(page, 'about-desktop', true);
  });

  test('online privacy page screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.ONLINE_PRIVACY);
    await waitForHydration(page);
    await page.waitForTimeout(1000);

    await takeScreenshot(page, 'online-privacy-desktop', true);
  });

  test('contact page screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);
    await page.waitForTimeout(1000);

    await takeScreenshot(page, 'contact-desktop', true);
  });

  test('homepage dark mode screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Enable dark mode
    const toggle = page.getByRole('button', { name: /toggle dark mode/i });
    await toggle.click();
    await page.waitForTimeout(1000);

    await takeScreenshot(page, 'homepage-dark-mode', true);
  });

  test('header component screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const header = page.locator('header');
    await header.screenshot({ path: 'test-results/screenshots/header.png' });
  });

  test('footer component screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');
    await footer.screenshot({ path: 'test-results/screenshots/footer.png' });
  });

  test('hero section screenshot', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    const hero = page.locator('section').first();
    await hero.screenshot({ path: 'test-results/screenshots/hero-section.png' });
  });
});

