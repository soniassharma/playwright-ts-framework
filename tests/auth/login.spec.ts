// test and expect come from our fixtures file, so tests can ask for loginPage by name
import { test, expect } from '../../fixtures';
// We build an InventoryPage by hand below, so we need the class
import { InventoryPage } from '../../pages/InventoryPage';
// The demo usernames and passwords, kept in one file instead of typed into every test
import users from '../../test-data/users.json';

// This test has to do the login itself, so it uses loginPage and not the logged-in inventoryPage
test('standard user lands on inventory after login', async ({ page, loginPage }) => {
  // InventoryPage knows where things are on the products screen. We need it to check the heading.
  const inventoryPage = new InventoryPage(page);

  // Open the login page
  await loginPage.goto();
  // Type the standard user's name and password, then click Login
  await loginPage.login(users.standard.username, users.standard.password);

  // After a good login the URL should contain "inventory"
  await expect(page).toHaveURL(/inventory/);
  // The heading should say "Products", which shows the products page really loaded
  await expect(inventoryPage.title).toHaveText('Products');
});

test('locked user sees error and stays on login', async ({ page, loginPage }) => {
  // Open the login page
  await loginPage.goto();
  // Try to log in as the locked-out user
  await loginPage.login(users.locked.username, users.locked.password);

  // The red error box should say the user is locked out
  await expect(loginPage.error).toContainText('locked out');
  // We should not have moved on to the products page
  await expect(page).not.toHaveURL(/inventory/);
});
