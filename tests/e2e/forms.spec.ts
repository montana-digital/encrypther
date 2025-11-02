/**
 * Forms E2E Tests
 * 
 * Tests form functionality:
 * - Contact form validation
 * - Form field interactions
 * - Error handling
 * - Accessibility
 */

import { test, expect } from '@playwright/test';
import { navigateToPage, waitForHydration } from '../utils/test-helpers';
import { PAGES, FORM_TEST_DATA } from '../fixtures/test-data';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page, PAGES.CONTACT);
    await waitForHydration(page);
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check all form fields are visible
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/subject/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should have proper labels for all fields', async ({ page }) => {
    // Check labels are associated with inputs
    const nameLabel = page.getByLabel(/name/i);
    await expect(nameLabel).toBeVisible();
    await expect(nameLabel).toHaveAttribute('for', 'name');

    const emailLabel = page.getByLabel(/email/i);
    await expect(emailLabel).toBeVisible();

    const messageLabel = page.getByLabel(/message/i);
    await expect(messageLabel).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /send message/i });

    // Try to submit empty form
    await submitButton.click();

    // HTML5 validation should prevent submission
    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toBeFocused();

    // Check required attribute
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel(/email/i);
    const submitButton = page.getByRole('button', { name: /send message/i });

    // Fill with invalid email
    await emailInput.fill(FORM_TEST_DATA.INVALID_EMAIL.email);

    // Try to submit
    await submitButton.click();

    // Should show validation error or prevent submission
    const validity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('should accept valid form data', async ({ page }) => {
    const form = page.locator('form');
    const nameInput = page.getByLabel(/name/i);
    const emailInput = page.getByLabel(/email/i);
    const subjectSelect = page.getByLabel(/subject/i);
    const messageTextarea = page.getByLabel(/message/i);

    // Fill form with valid data
    await nameInput.fill(FORM_TEST_DATA.VALID_CONTACT.name);
    await emailInput.fill(FORM_TEST_DATA.VALID_CONTACT.email);
    await subjectSelect.selectOption(FORM_TEST_DATA.VALID_CONTACT.subject);
    await messageTextarea.fill(FORM_TEST_DATA.VALID_CONTACT.message);

    // Verify values are set
    await expect(nameInput).toHaveValue(FORM_TEST_DATA.VALID_CONTACT.name);
    await expect(emailInput).toHaveValue(FORM_TEST_DATA.VALID_CONTACT.email);
    await expect(messageTextarea).toHaveValue(FORM_TEST_DATA.VALID_CONTACT.message);
  });

  test('should be keyboard navigable', async ({ page }) => {
    const nameInput = page.getByLabel(/name/i);
    
    // Start from top and tab through form
    await page.keyboard.press('Tab');
    
    // Should focus on name field
    await expect(nameInput).toBeFocused();

    // Continue tabbing
    await page.keyboard.press('Tab');
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeFocused();

    await page.keyboard.press('Tab');
    const subjectSelect = page.getByLabel(/subject/i);
    await expect(subjectSelect).toBeFocused();
  });

  test('should have accessible subject dropdown', async ({ page }) => {
    const subjectSelect = page.getByLabel(/subject/i);
    await expect(subjectSelect).toBeVisible();

    // Check options are available
    const options = await subjectSelect.locator('option').count();
    expect(options).toBeGreaterThan(1);

    // Select an option
    await subjectSelect.selectOption('general');
    await expect(subjectSelect).toHaveValue('general');
  });

  test('should display contact information', async ({ page }) => {
    // Check email links are present
    const emailLinks = page.locator('a[href^="mailto:"]');
    const count = await emailLinks.count();
    expect(count).toBeGreaterThan(0);

    // Check email addresses
    await expect(page.getByText(/info@encrypther.org/i)).toBeVisible();
  });

  test('should display emergency resources', async ({ page }) => {
    const emergencySection = page.getByText(/Emergency Resources/i);
    await expect(emergencySection).toBeVisible();

    // Check emergency phone numbers are visible
    await expect(page.getByText(/911/i)).toBeVisible();
    await expect(page.getByText(/1-800-799-7233/i)).toBeVisible();
  });
});

