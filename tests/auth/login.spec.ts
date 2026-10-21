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

// Each entry below is one bad login. The loop after it turns every entry into its own test.
const badLogins = [
  // The locked user has the right password but is not allowed in
  { name: 'locked user', user: users.locked.username, pass: users.locked.password, msg: /locked out/ },
  // A real username with the wrong password
  { name: 'wrong password', user: users.standard.username, pass: 'not_the_password', msg: /do not match/ },
  // Password filled in, username left empty
  { name: 'empty username', user: '', pass: users.standard.password, msg: /Username is required/ },
  // Username filled in, password left empty
  { name: 'empty password', user: users.standard.username, pass: '', msg: /Password is required/ },
];

// Go through the list one entry at a time
for (const c of badLogins) {
  // The test name includes the case name, so each shows up separately in the report
  test(`login rejected: ${c.name}`, async ({ page, loginPage }) => {
    // Open the login page
    await loginPage.goto();
    // Try to log in with this entry's username and password
    await loginPage.login(c.user, c.pass);

    // The red error box should show this entry's message
    await expect(loginPage.error).toContainText(c.msg);
    // We should not have moved on to the products page
    await expect(page).not.toHaveURL(/inventory/);
  });
}
