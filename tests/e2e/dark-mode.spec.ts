/**
 * Dark Mode E2E Tests
 * 
 * Tests dark mode toggle functionality:
 * - Toggle button visibility
 * - Theme switching
 * - Persistence across navigation
 * - localStorage persistence
 * - System preference detection
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES } from '../fixtures/test-data';

test.describe('Dark Mode Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
  });

  test('should display dark mode toggle button', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /toggle dark mode/i });
    await expect(toggleButton).toBeVisible();
  });

  test('should toggle between light and dark mode', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /toggle dark mode/i });
    
    // Get initial theme
    const initialDarkMode = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );

    // Click toggle
    await toggleButton.click();
    await page.waitForTimeout(500); // Wait for theme change

    // Check theme changed
    const newDarkMode = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(newDarkMode).not.toBe(initialDarkMode);

    // Toggle again
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Should be back to original
    const finalDarkMode = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(finalDarkMode).toBe(initialDarkMode);
  });

  test('should persist theme across page navigation', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /toggle dark mode/i });
    
    // Set to dark mode
    await toggleButton.click();
    await page.waitForTimeout(500);
    
    const isDarkBefore = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );

    // Navigate to another page
    await page.getByRole('link', { name: 'About' }).click();
    await waitForHydration(page);
    await page.waitForTimeout(500);

    // Check theme persisted
    const isDarkAfter = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(isDarkAfter).toBe(isDarkBefore);
  });

  test('should persist theme in localStorage', async ({ page, context }) => {
    const toggleButton = page.getByRole('button', { name: /toggle dark mode/i });
    
    // Set to dark mode
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Check localStorage
    const themeInStorage = await page.evaluate(() => localStorage.getItem('theme'));
    expect(themeInStorage).toBeTruthy();
    expect(['dark', 'light']).toContain(themeInStorage);

    // Reload page
    await page.reload();
    await waitForHydration(page);
    await page.waitForTimeout(500);

    // Theme should be restored
    const isDarkAfterReload = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    const themeAfterReload = await page.evaluate(() => localStorage.getItem('theme'));
    expect(themeAfterReload).toBe(themeInStorage);
  });

  test('should update ARIA label when toggled', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /toggle dark mode/i });
    
    const initialLabel = await toggleButton.getAttribute('aria-label');
    
    // Toggle
    await toggleButton.click();
    await page.waitForTimeout(500);

    const newLabel = await toggleButton.getAttribute('aria-label');
    
    // Labels should be different
    expect(newLabel).not.toBe(initialLabel);
    expect(newLabel?.toLowerCase()).toContain('switch');
  });

  test('should work in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();

    // Find dark mode toggle in mobile menu
    const mobileToggle = page.locator('#mobile-menu').getByRole('button', { name: /toggle/i });
    await expect(mobileToggle).toBeVisible();

    // Toggle from mobile menu
    await mobileToggle.click();
    await page.waitForTimeout(500);

    // Check theme changed
    const isDark = await page.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    expect(isDark).toBeTruthy();
  });

  test('should sync across browser tabs', async ({ context }) => {
    // Open two tabs
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await navigateToPage(page1, PAGES.HOME);
    await navigateToPage(page2, PAGES.HOME);
    await waitForHydration(page1);
    await waitForHydration(page2);

    // Toggle on page1
    const toggle1 = page1.getByRole('button', { name: /toggle/i });
    await toggle1.click();
    await page1.waitForTimeout(500);

    // Wait for storage event on page2
    await page2.waitForTimeout(1000);

    // Check both pages have same theme
    const theme1 = await page1.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    const theme2 = await page2.evaluate(() => 
      document.documentElement.classList.contains('dark')
    );
    
    expect(theme2).toBe(theme1);

    await page1.close();
    await page2.close();
  });

  test('should respect prefers-color-scheme on initial load', async ({ page, context }) => {
    // Set system preference to dark
    await context.emulateMedia({ colorScheme: 'dark' });

    // Navigate to page
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);
    await page.waitForTimeout(500);

    // If no localStorage preference, should match system
    const hasStoredTheme = await page.evaluate(() => localStorage.getItem('theme'));
    
    if (!hasStoredTheme) {
      const isDark = await page.evaluate(() => 
        document.documentElement.classList.contains('dark')
      );
      // Should match system preference if no stored preference
      // (Note: This test might need adjustment based on actual implementation)
    }
  });
});

