const { test, expect } = require('@playwright/test');
const { fillLoginForm } = require('./utils/form-helpers');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Test Login/);
  });

  test('Successful Login', async ({ page }) => {
    await fillLoginForm(page, 'practice', 'SuperSecretPassword!');
    await expect(page.locator('text=welcome')).toBeVisible();
  });

  test('Invalid Username Login Attempt', async ({ page }) => {
    await fillLoginForm(page, 'wrongUser', 'SuperSecretPassword!');
    await expect(page.getByText('Your username is invalid!')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('Invalid Password Login Attempt', async ({ page }) => {
    await fillLoginForm(page, 'practice', 'WrongPassword');
    await expect(page.getByText('Your password is invalid!')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
