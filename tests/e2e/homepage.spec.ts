/**
 * Homepage E2E Tests
 * 
 * Tests homepage functionality:
 * - Hero section
 * - Content sections
 * - Cards and features
 * - CTAs
 * - Content rendering from markdown
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration, waitForImages } from '../utils/test-helpers';
import { PAGES, EXPECTED_TITLES } from '../fixtures/test-data';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
  });

  test('should display correct title and meta', async ({ page }) => {
    await expect(page).toHaveTitle(EXPECTED_TITLES.HOME);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('should display hero section', async ({ page }) => {
    // Check hero title
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText(/Your Safety/i);

    // Check hero subtitle
    const subtitle = page.locator('text=/provides essential education/i');
    await expect(subtitle).toBeVisible();

    // Check primary CTA
    const primaryCTA = page.getByRole('link', { name: /Get Empowered/i });
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', /#courses/);
  });

  test('should display "What We Do" section', async ({ page }) => {
    const whatWeDoSection = page.locator('#what-we-do');
    await expect(whatWeDoSection).toBeVisible();

    const heading = whatWeDoSection.getByRole('heading', { name: /What We Do/i });
    await expect(heading).toBeVisible();

    // Check cards are visible
    const cards = whatWeDoSection.locator('[class*="Card"]');
    await expect(cards.first()).toBeVisible();
  });

  test('should display courses section', async ({ page }) => {
    const coursesSection = page.locator('#courses');
    await expect(coursesSection).toBeVisible();

    const heading = coursesSection.getByRole('heading', { name: /Learn It/i });
    await expect(heading).toBeVisible();

    // Check course cards are visible and linkable
    const onlinePrivacyCard = page.getByRole('link', { name: /Online Privacy/i });
    await expect(onlinePrivacyCard).toBeVisible();
    await expect(onlinePrivacyCard).toHaveAttribute('href', PAGES.ONLINE_PRIVACY);

    const travelSafetyCard = page.getByRole('link', { name: /Travel Safety/i });
    await expect(travelSafetyCard).toBeVisible();
  });

  test('should display digital advocacy section', async ({ page }) => {
    const advocacySection = page.locator('#advocacy');
    await expect(advocacySection).toBeVisible();

    const heading = advocacySection.getByRole('heading', { name: /Digital Advocacy/i });
    await expect(heading).toBeVisible();

    // Check advocacy content card
    const advocacyCard = advocacySection.getByText(/Join Our Advocacy Movement/i);
    await expect(advocacyCard).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    const ctaSection = page.getByText(/Ready to Take Control/i);
    await expect(ctaSection).toBeVisible();

    // Check CTA buttons
    const enrollButton = page.getByRole('link', { name: /Enroll Now/i });
    await expect(enrollButton).toBeVisible();
  });

  test('should have all images with alt text', async ({ page }) => {
    await waitForImages(page);
    
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt).not.toBe('');
    }
  });

  test('should have working primary CTA button', async ({ page }) => {
    const ctaButton = page.getByRole('link', { name: /Get Empowered/i });
    await ctaButton.click();
    
    // Should scroll to courses section or navigate
    await page.waitForTimeout(1000); // Wait for scroll
    const coursesSection = page.locator('#courses');
    await expect(coursesSection).toBeVisible();
  });

  test('should render content from markdown', async ({ page }) => {
    // Check that markdown content is rendered
    const content = page.locator('main');
    await expect(content).toContainText(/What We Do/i);
    await expect(content).toContainText(/EncryptHer empowers/i);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Should have exactly one H1
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);

    // Should have H2 headings for sections
    const h2Elements = await page.locator('h2').count();
    expect(h2Elements).toBeGreaterThan(0);
  });
});

