/**
 * Navigation E2E Tests
 * 
 * Tests all navigation functionality:
 * - Header navigation links
 * - Mobile menu
 * - Footer links
 * - Programs dropdown
 * - Browser navigation
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES, NAVIGATION_LINKS, PROGRAM_LINKS, FOOTER_LINKS } from '../fixtures/test-data';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
  });

  test('should display header with logo and navigation', async ({ page }) => {
    // Check logo is visible
    const logo = page.getByAltText('EncryptHer logo');
    await expect(logo).toBeVisible();

    // Check logo links to homepage
    await logo.click();
    await expect(page).toHaveURL(PAGES.HOME);

    // Check navigation links are visible on desktop
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'What We Do' })).toBeVisible();
  });

  test('should navigate to all main pages from header', async ({ page }) => {
    // Test About link
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(PAGES.ABOUT);
    await expect(page.locator('h1')).toContainText(/about/i);

    // Test Digital Advocacy link
    await page.getByRole('link', { name: 'Digital Advocacy' }).click();
    await expect(page).toHaveURL(PAGES.DIGITAL_ADVOCACY);

    // Test Donate link
    await page.getByRole('link', { name: 'Donate' }).click();
    await expect(page).toHaveURL(PAGES.DONATE);
  });

  test('should open and navigate Programs dropdown', async ({ page }) => {
    // Hover over Programs to open dropdown
    const programsButton = page.getByRole('button', { name: 'Programs' });
    await programsButton.hover();

    // Check dropdown links are visible
    await expect(page.getByRole('link', { name: /online privacy/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /public safety/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /travel safety/i })).toBeVisible();

    // Click Online Privacy link
    await page.getByRole('link', { name: /online privacy/i }).click();
    await expect(page).toHaveURL(PAGES.ONLINE_PRIVACY);
  });

  test('should navigate using footer links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Test footer links
    await page.getByRole('link', { name: 'About', exact: true }).last().click();
    await expect(page).toHaveURL(PAGES.ABOUT);

    await navigateToPage(page, PAGES.HOME);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await page.getByRole('link', { name: 'Contact' }).last().click();
    await expect(page).toHaveURL(PAGES.CONTACT);
  });

  test('should handle mobile menu toggle', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile menu button is visible
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Check menu links are accessible
    await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Contact' })).toBeVisible();

    // Close menu by clicking outside
    await page.click('body', { position: { x: 10, y: 10 } });
    await expect(mobileMenu).not.toBeVisible();

    // Reopen and close with Escape key
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate from mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click();

    // Navigate to About
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(PAGES.ABOUT);
    
    // Menu should close after navigation
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should highlight active page in navigation', async ({ page }) => {
    // Navigate to About
    await page.getByRole('link', { name: 'About' }).click();
    await waitForHydration(page);

    // Check About link is highlighted
    const aboutLink = page.getByRole('link', { name: 'About' }).first();
    await expect(aboutLink).toHaveClass(/font-semibold/);
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate through pages
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(PAGES.ABOUT);

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(PAGES.CONTACT);

    // Go back
    await page.goBack();
    await expect(page).toHaveURL(PAGES.ABOUT);

    // Go forward
    await page.goForward();
    await expect(page).toHaveURL(PAGES.CONTACT);
  });

  test('should handle anchor links', async ({ page }) => {
    // Click "What We Do" anchor link
    await page.getByRole('link', { name: 'What We Do' }).click();
    
    // Should scroll to section (check URL has hash or element is in viewport)
    const whatWeDoSection = page.locator('#what-we-do');
    await expect(whatWeDoSection).toBeVisible();
  });

  test('should have no broken links', async ({ page }) => {
    // Get all links on page
    const links = await page.locator('a[href]').all();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('#')) continue;
      
      // Skip external links for now
      if (href.startsWith('http') && !href.includes('localhost')) continue;

      // Check link response
      const response = await page.request.get(new URL(href, page.url()).toString());
      expect(response.status()).toBeLessThan(400);
    }
  });
});

