// base is Playwright's normal test. We extend it with our own ready-made objects.
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import users from '../test-data/users.json';

// Tells TypeScript which fixtures exist and what type each one is
type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
  // A fresh LoginPage for the test. use() hands it over, and the test runs while we wait.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Logs in as the standard user first, so the test starts already on the inventory page
  inventoryPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
    await use(new InventoryPage(page));
  },
});

// Re-export expect so tests can import both from this one file
export { expect } from '@playwright/test';
