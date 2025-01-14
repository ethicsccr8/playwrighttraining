const { test, expect } = require('@playwright/test');
const { fillRegistrationForm } = require('./utils/form-helpers');

test.describe('Registration Tests', () => {
  test.setTimeout(160000);

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveTitle(/Test Register/);
  });

  test('Successful Registration', async ({ page }) => {
    await fillRegistrationForm(page, `testuser${Date.now()}`, 'Test123!@#', 'Test123!@#');
    await expect(page).toHaveURL('/login');
    const successMessage = await page.locator('#flash');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    await expect(successMessage).toContainText('Successfully registered');
  });

  test('Registration with Missing Username', async ({ page }) => {
    await fillRegistrationForm(page, '', 'Test123!@#', 'Test123!@#');
    await expect(page.getByText('All fields are required.')).toBeVisible();
  });

  test('Registration with Missing Password', async ({ page }) => {
    await fillRegistrationForm(page, `testuser${Date.now()}`, '', 'Test123!@#');
    await expect(page.getByText('All fields are required.')).toBeVisible();
  });

  test('Registration with Non-matching Passwords', async ({ page }) => {
    await fillRegistrationForm(page, `testuser${Date.now()}`, 'Test123!@#', 'DifferentPassword123!@#');
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
  });
}); 