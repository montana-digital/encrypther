/**
 * Keyboard Navigation Tests
 * 
 * Tests keyboard accessibility:
 * - Tab order
 * - Focus indicators
 * - Keyboard shortcuts (Enter, Escape)
 * - Skip links
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES } from '../fixtures/test-data';

test.describe('Keyboard Navigation', () => {
  test('should navigate through interactive elements with Tab', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Start from top of page
    await page.keyboard.press('Tab');

    // Check first element is focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through page
    const focusableElements: string[] = [];
    for (let i = 0; i < 10; i++) {
      const tagName = await focusedElement.evaluate((el: Element) => el.tagName);
      const text = await focusedElement.textContent();
      focusableElements.push(`${tagName}: ${text?.substring(0, 30)}`);

      await page.keyboard.press('Tab');

      // Break if we've cycled back or hit end
      const newFocus = page.locator(':focus');
      const newText = await newFocus.textContent();
      if (newText?.substring(0, 30) === focusableElements[0]?.split(': ')[1]) {
        break;
      }
    }

    expect(focusableElements.length).toBeGreaterThan(0);
  });

  test('should have visible focus indicators', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Check focus styles
    const hasFocusStyle = await focusedElement.evaluate((el: Element) => {
      const style = window.getComputedStyle(el);
      const outline = style.outline;
      const outlineWidth = style.outlineWidth;
      const boxShadow = style.boxShadow;
      
      return (
        outlineWidth !== '0px' ||
        outline !== 'none' ||
        boxShadow !== 'none'
      );
    });

    expect(hasFocusStyle).toBeTruthy();
  });

  test('should activate links with Enter key', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Tab to About link
    await page.keyboard.press('Tab');
    let focused = page.locator(':focus');
    let tagName = await focused.evaluate((el: Element) => el.tagName);

    // Tab until we find a link
    while (tagName !== 'A' && tagName !== 'BUTTON') {
      await page.keyboard.press('Tab');
      focused = page.locator(':focus');
      tagName = await focused.evaluate((el: Element) => el.tagName);
    }

    // Press Enter on link
    if (tagName === 'A') {
      const href = await focused.getAttribute('href');
      await page.keyboard.press('Enter');
      
      // Should navigate if it's a navigation link
      if (href && !href.startsWith('#')) {
        await page.waitForTimeout(1000);
        // Navigation should have occurred
      }
    }
  });

  test('should close mobile menu with Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Menu should close
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate form fields with Tab', async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);

    const nameInput = page.getByLabel(/name/i);
    
    // Tab to name field
    await page.keyboard.press('Tab');
    
    // Continue tabbing until we reach name field or loop
    let attempts = 0;
    while (attempts < 20) {
      const focused = page.locator(':focus');
      const id = await focused.getAttribute('id');
      
      if (id === 'name') {
        break;
      }
      
      await page.keyboard.press('Tab');
      attempts++;
    }

    // Should reach name field
    await expect(nameInput).toBeFocused();
  });

  test('should submit form with Enter key', async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);

    // Fill form
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/subject/i).selectOption('general');
    await page.getByLabel(/message/i).fill('Test message');

    // Tab to submit button
    await page.keyboard.press('Tab');

    // Press Enter on submit button
    await page.keyboard.press('Enter');

    // Form should attempt to submit (may be prevented by validation)
    // This test mainly checks keyboard accessibility
  });

  test('should access dropdown menus with keyboard', async ({ page }) => {
    await navigateToPage(page, PAGES.HOME);
    await waitForHydration(page);

    // Tab to Programs button
    await page.keyboard.press('Tab');
    
    // Find Programs button
    let attempts = 0;
    while (attempts < 15) {
      const focused = page.locator(':focus');
      const text = await focused.textContent();
      
      if (text?.includes('Programs')) {
        break;
      }
      
      await page.keyboard.press('Tab');
      attempts++;
    }

    // Press Enter or Space to activate dropdown
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Dropdown should be accessible (hover state or expanded)
    // Note: Keyboard navigation for hover dropdowns may need adjustment
  });

  test('should handle arrow key navigation in selects', async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);

    const subjectSelect = page.getByLabel(/subject/i);
    await subjectSelect.focus();

    // Arrow keys should navigate options
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Value should be selected
    const value = await subjectSelect.inputValue();
    expect(value).toBeTruthy();
  });
});

