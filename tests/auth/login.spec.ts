import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('standard user lands on inventory after login', async ({ page }) => {
  // Each test builds the page objects it needs from the same page
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Assertions stay in the test, the page objects only do the actions
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
});

test('locked user sees error and stays on login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.error).toContainText('locked out');
  await expect(page).not.toHaveURL(/inventory/);
});
