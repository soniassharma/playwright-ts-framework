// test and expect come from our fixtures file, not straight from Playwright
import { test, expect } from '../../fixtures';
import { CartPage } from '../../pages/CartPage';

// inventoryPage is a fixture: the browser is already logged in and sitting on the products page
test('adding one item sets the cart badge to 1', async ({ inventoryPage }) => {
  // Click "Add to cart" on the backpack. The slug is the product name in lowercase with dashes.
  await inventoryPage.addToCart('sauce-labs-backpack');

  // The red number on the cart icon should now say 1
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('removing the only item clears the cart badge', async ({ inventoryPage }) => {
  // First put the backpack in the cart...
  await inventoryPage.addToCart('sauce-labs-backpack');
  // ...then take it out again. The button changes from "Add to cart" to "Remove" after adding.
  await inventoryPage.removeFromCart('sauce-labs-backpack');

  // The badge disappears when the cart is empty, so we check it is gone, not that it says 0
  await expect(inventoryPage.cartBadge).toBeHidden();
});

// page is the raw browser tab, we need it to build a CartPage
test('cart page lists exactly the items that were added', async ({ page, inventoryPage }) => {
  // CartPage knows where things are on the cart screen
  const cartPage = new CartPage(page);

  // Add two different products
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  // Click the cart icon to go to the cart page
  await inventoryPage.openCart();

  // The cart should show these two names, in this order, and nothing else
  await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
});
