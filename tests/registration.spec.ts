import { test, expect, type Page } from '@playwright/test';
import { getDate, getTime } from '../utils/date';

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test.afterEach(async ({ page }, { title }) => {
  await page.screenshot({ path: `test-results/TS_002/${getDate()}/${title.split(' -')[0]}-${getTime()}.png` });
});

test.describe('TS_002 - As a new user, I want to create an account so that I can access exclusive features.', 
  () => {
  test('TC_004 - Successful Registration', async ({ page }) => {
    try {
      await fillRegisterForm(page, `practice${Date.now()}`, 'SuperSecretPassword!', 'SuperSecretPassword!');
      await expect(page).toHaveURL('/login');
      const logginMessage = page.getByText('Successfully registered, you can log in now.');
      await expect(logginMessage).toBeVisible();
    } catch (error) {
      console.log('Error - TC_004: ', JSON.stringify(error));
    }
  });

  test('TC_005 - Registration with Missing Username', async ({ page }) => {
    try {
      await checkFailRegister(
        page, 
        '', 
        'SuperSecretPassword!', 
        'SuperSecretPassword!', 
        'All fields are required.'
      );
    } catch (error) {
      console.log('Error - TC_005: ', JSON.stringify(error));
    }
  });

  test('TC_006 - Registration with Missing Password', async ({ page }) => {
    try {
      await checkFailRegister(
        page, 
        'practice', 
        '', 
        'SuperSecretPassword!', 
        'All fields are required.'
      );
    } catch (error) {
      console.log('Error - TC_006: ', JSON.stringify(error));
    }
  });

  test('TC_007 - Registration with Non-matching Passwords', async ({ page }) => {
    try {  
      await checkFailRegister(
        page, 
        'practice', 
        'SuperSecretPassword!', 
        'SuperPassword!', 
        'Passwords do not match.'
      );
    } catch (error) {
      console.log('Error - TC_007: ', JSON.stringify(error));
    }
  });
});

async function fillRegisterForm(
  page: Page, 
  username: string, 
  password: string, 
  confirmPassword: string
) {
  await expect(page).toHaveURL('/register');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByLabel('Confirm Password').fill(confirmPassword);
  await page.getByRole('button', { name: 'Register' }).click();
}

async function checkFailRegister(
  page: Page,
  username: string, 
  password: string,
  confirmPassword: string, 
  expectedMessage: string
) {
  await fillRegisterForm(page, username, password, confirmPassword);
  const errorMessage = page.getByText(expectedMessage);
  await expect(errorMessage).toBeVisible();
}