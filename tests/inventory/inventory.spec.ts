// test and expect come from our fixtures file, so tests can ask for inventoryPage by name
import { test, expect } from '../../fixtures';

// No login steps here: the inventoryPage fixture already logged in
test('logged in user sees the full product list', async ({ inventoryPage }) => {
  await expect(inventoryPage.title).toHaveText('Products');
  // saucedemo always shows 6 products
  await expect(inventoryPage.itemNames).toHaveCount(6);
});
