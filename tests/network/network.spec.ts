// test and expect come from our fixtures file, so tests can ask for loginPage by name
import { test, expect } from '../../fixtures';
// The demo usernames and passwords, kept in one file instead of typed into every test
import users from '../../test-data/users.json';

// loginPage is used here, not inventoryPage, because the route must be set up BEFORE logging in
test('inventory still loads when product images are blocked', async ({ page, loginPage }) => {
  // Counts how many image requests we stopped, so we can prove the block really happened
  let blockedImages = 0;

  // Catch every request for a .png or .jpg file, on any page, from now on
  await page.route('**/*.{png,jpg}', (route) => {
    // Add one to the counter
    blockedImages++;
    // Stop the request, so the browser never gets the image
    return route.abort();
  });

  // Log in as the standard user. The products page is where the images would normally load.
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  // The page should still show its heading and all 6 products, images or not
  await expect(page.getByTestId('title')).toHaveText('Products');
  await expect(page.getByTestId('inventory-item-name')).toHaveCount(6);
  // At least one image request was caught, so the route really did something
  expect(blockedImages).toBeGreaterThan(0);
});
