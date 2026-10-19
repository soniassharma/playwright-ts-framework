import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  // The "Products" heading, used to prove the page loaded
  readonly title: Locator;
  // The red number on the cart icon, it only exists when the cart has items
  readonly cartBadge: Locator;
  // Every product name on the page, as a list
  readonly itemNames: Locator;
  private readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  // The slug is the product name in lowercase with dashes, e.g. "sauce-labs-backpack"
  async addToCart(slug: string) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug: string) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  // value is the option's value, e.g. "lohi" for price low to high
  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }
}
