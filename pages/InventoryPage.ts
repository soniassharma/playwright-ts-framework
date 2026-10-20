// Page and Locator are types only, they help the editor catch mistakes
import { Page, Locator } from '@playwright/test';

// One class for the products page. It holds the locators and actions, but no assertions.
export class InventoryPage {
  // The "Products" heading, used to prove the page loaded
  readonly title: Locator;
  // The red number on the cart icon, it only exists when the cart has items
  readonly cartBadge: Locator;
  // Every product name on the page, as a list
  readonly itemNames: Locator;
  // Every price on the page, as text like "$29.99"
  readonly itemPrices: Locator;
  // private: only this class clicks the sort dropdown, tests call sortBy() instead
  private readonly sortDropdown: Locator;
  // private: tests call openCart() instead of touching the link
  private readonly cartLink: Locator;

  // The test hands us its page, so we use the same browser tab
  constructor(private readonly page: Page) {
    // Each line below says how to find one element, using its data-test name
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  // Click the cart icon to go to the cart page
  async openCart() {
    await this.cartLink.click();
  }

  // The slug is the product name in lowercase with dashes, e.g. "sauce-labs-backpack"
  async addToCart(slug: string) {
    // Each product's button is named "add-to-cart-" plus its slug
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  // Same idea: after adding, the button is renamed "remove-" plus the slug
  async removeFromCart(slug: string) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  // value is the option's value, e.g. "lohi" for price low to high
  async sortBy(value: string) {
    // selectOption picks that entry in the dropdown
    await this.sortDropdown.selectOption(value);
  }
}
