// Page and Locator are types only, they help the editor catch mistakes
import { Page, Locator } from '@playwright/test';

// One class for the whole checkout flow: the details form, the review step and the thank-you screen.
// They are separate screens on the site, but together they are one small flow.
export class CheckoutPage {
  // private: tests call fillDetails() instead of touching the boxes
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  // The red error box under the form, tests read its text
  readonly error: Locator;
  // The big "Thank you for your order!" heading on the last screen
  readonly completeHeader: Locator;

  constructor(private readonly page: Page) {
    // Each line below says how to find one element, using its data-test name
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.error = page.getByTestId('error');
    this.completeHeader = page.getByTestId('complete-header');
  }

  // Fill the shipping form and click Continue. Pass '' to leave a box empty.
  async fillDetails(first: string, last: string, postal: string) {
    // Type into each box
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    // Click Continue to submit the form
    await this.continueButton.click();
  }

  // Click Finish on the review screen to place the order
  async finish() {
    await this.finishButton.click();
  }
}
