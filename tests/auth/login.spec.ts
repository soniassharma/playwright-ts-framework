// test is the function that defines a test, expect is how we check results
import { test, expect } from '@playwright/test';

// The name says what behavior we expect, not just "login test"
test('standard user lands on inventory after login', async ({ page }) => {
  // '/' is added to the baseURL from the config, so this opens saucedemo.com
  await page.goto('/');

  // getByTestId looks for data-test="username" because of testIdAttribute in the config
  await page.getByTestId('username').fill('standard_user');
  // This is the demo password saucedemo shows on its own login page
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  // After a good login the URL should contain "inventory"
  await expect(page).toHaveURL(/inventory/);
  // The page heading should say "Products", which shows the inventory page really loaded
  await expect(page.getByTestId('title')).toHaveText('Products');
});
