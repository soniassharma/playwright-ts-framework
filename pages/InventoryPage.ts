import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  // The "Products" heading, used to prove the page loaded
  readonly title: Locator;
  // The red number on the cart icon, it only exists when the cart has items
  readonly cartBadge: Locator;
  // Every product name on the page, as a list
  readonly itemNames: Locator;
  // Every price on the page, as text like "$29.99"
  readonly itemPrices: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async openCart() {
    await this.cartLink.click();
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
