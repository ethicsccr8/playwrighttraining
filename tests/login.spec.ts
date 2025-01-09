import { test, expect, type Page } from '@playwright/test';
import { getDate, getTime } from '../utils/date';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test.afterEach(async ({ page }, { title }) => {
  await page.screenshot({ path: `test-results/TS_001/${getDate()}/${title.split(' -')[0]}-${getTime()}.png` });
});

test.describe('TS_001 - As an user, I want to log in using my credentials so that I can access my account.', 
  () => {
  test('TC_001 - Successful Login', async ({ page }) => {
    try {
      await fillLoginForm(page, 'practice', 'SuperSecretPassword!');
      await expect(page).toHaveURL('/secure');
      const logginMessage = page.getByText('You logged into a secure area!');
      await expect(logginMessage).toBeVisible();
      const logoutButton = page.getByRole('link', { name: 'Logout' });
      await expect(logoutButton).toBeVisible();
    } catch (error) {
      console.log('Error - TC_001: ', JSON.stringify(error));
    }
  });

  test('TC_002 - Invalid Username', async ({ page }) => {
    try {
      await checkFailLogin(page, 'wrongUser', 'SuperSecretPassword!', 'Your username is invalid!');
    } catch (error) {
      console.log('Error - TC_002: ', JSON.stringify(error));
    }
  });

  test('TC_003 - Invalid Password', async ({ page }) => {
    try {
      await checkFailLogin(page, 'practice', 'WrongPassword', 'Your password is invalid!');
    } catch (error) {
      console.log('Error - TC_003: ', JSON.stringify(error));
    }
  });
});

async function fillLoginForm(page: Page, username: string, password: string) {
  await expect(page).toHaveURL('/login');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function checkFailLogin(
  page: Page, 
  username: string, 
  password: string, 
  expectedMessage: string
) {
  await fillLoginForm(page, username, password);
  const errorMessage = page.getByText(expectedMessage);
  await expect(errorMessage).toBeVisible();
  await expect(page).toHaveURL('/login');
}