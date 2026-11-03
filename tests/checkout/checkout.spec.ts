// test and expect come from our fixtures file, so tests can ask for inventoryPage by name
import { test, expect } from '../../fixtures';
// The page objects for the cart and checkout screens
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
// Fake shipping details kept in one file instead of typed into every test
import details from '../../test-data/checkout.json';

// inventoryPage is a fixture: the browser is already logged in and sitting on the products page
test('checkout happy path ends on the thank you screen', async ({ page, inventoryPage }) => {
  // Build the page objects for the next two screens from the same browser tab
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Put one product in the cart and open the cart
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.openCart();
  // Click Checkout on the cart page
  await cartPage.checkout();
  // Fill in valid shipping details and continue to the review screen
  await checkoutPage.fillDetails(details.valid.firstName, details.valid.lastName, details.valid.postalCode);
  // Click Finish to place the order
  await checkoutPage.finish();

  // The last screen should say the order went through
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});

test('checkout without a first name shows an error', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Same journey as above, up to the shipping form
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();
  // Leave the first name empty on purpose
  await checkoutPage.fillDetails('', details.valid.lastName, details.valid.postalCode);

  // The form should refuse to continue and explain why
  await expect(checkoutPage.error).toContainText('First Name is required');
});

test('checkout without a postal code shows an error', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Same journey as above, up to the shipping form
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();
  // Leave the postal code empty on purpose
  await checkoutPage.fillDetails(details.valid.firstName, details.valid.lastName, '');

  // The form should refuse to continue and explain why
  await expect(checkoutPage.error).toContainText('Postal Code is required');
});
