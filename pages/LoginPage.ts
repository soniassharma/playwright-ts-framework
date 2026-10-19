// Page and Locator are types only, they help the editor catch mistakes
import { Page, Locator } from '@playwright/test';

// One class per page. It holds the locators and the actions, but no assertions.
export class LoginPage {
  // private: only this class needs the form fields
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  // not private: tests need the error box to check its text
  readonly error: Locator;

  // The test hands us its page, so we use the same browser tab
  constructor(private readonly page: Page) {
    // Locators are lazy, they only look for the element when we use them
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  // Open the site's home page, which is the login screen
  async goto() {
    // '/' is added to the baseURL from the config
    await this.page.goto('/');
  }

  // The three steps every login test repeats, now written once
  async login(user: string, pass: string) {
    // Type the username into its box
    await this.username.fill(user);
    // Type the password into its box
    await this.password.fill(pass);
    // Click the Login button
    await this.submit.click();
  }
}
