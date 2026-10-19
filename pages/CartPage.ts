// Page and Locator are types only, they help the editor catch mistakes
import { Page, Locator } from '@playwright/test';

// One class for the cart page. It holds locators only, tests do the checking.
export class CartPage {
  // The names of the products currently in the cart
  readonly itemNames: Locator;

  constructor(page: Page) {
    // The cart page reuses the same data-test name as the inventory page for product names
    this.itemNames = page.getByTestId('inventory-item-name');
  }
}
