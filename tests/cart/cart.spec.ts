import { test, expect } from '../../fixtures';
import { CartPage } from '../../pages/CartPage';

test('adding one item sets the cart badge to 1', async ({ inventoryPage }) => {
  await inventoryPage.addToCart('sauce-labs-backpack');

  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('removing the only item clears the cart badge', async ({ inventoryPage }) => {
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.removeFromCart('sauce-labs-backpack');

  // The badge disappears when the cart is empty, so we check it is gone, not that it says 0
  await expect(inventoryPage.cartBadge).toBeHidden();
});

test('cart page lists exactly the items that were added', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);

  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.openCart();

  await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
});
