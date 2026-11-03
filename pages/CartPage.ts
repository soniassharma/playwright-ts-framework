// Page and Locator are types only, they help the editor catch mistakes
import { Page, Locator } from '@playwright/test';

// One class for the cart page. It holds locators and actions, tests do the checking.
export class CartPage {
  // The names of the products currently in the cart
  readonly itemNames: Locator;
  // private: tests call checkout() instead of clicking the button themselves
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    // The cart page reuses the same data-test name as the inventory page for product names
    this.itemNames = page.getByTestId('inventory-item-name');
    // The "Checkout" button at the bottom of the cart
    this.checkoutButton = page.getByTestId('checkout');
  }

  // Click Checkout to move on to the shipping details form
  async checkout() {
    await this.checkoutButton.click();
  }
}
