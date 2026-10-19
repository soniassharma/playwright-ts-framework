import { test, expect } from '../../fixtures';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../test-data/users.json';

// This test has to do the login itself, so it uses loginPage and not the logged-in inventoryPage
test('standard user lands on inventory after login', async ({ page, loginPage }) => {
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
});

test('locked user sees error and stays on login', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.locked.username, users.locked.password);

  await expect(loginPage.error).toContainText('locked out');
  await expect(page).not.toHaveURL(/inventory/);
});
