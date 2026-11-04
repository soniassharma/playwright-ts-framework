// test and expect come from our fixtures file, so tests can ask for inventoryPage by name
import { test, expect } from '../../fixtures';

// Screenshots look slightly different on Mac and Linux (fonts, spacing), so a baseline made on one
// would fail on the other. For now this test runs only on CI, where the baseline is made.
test.skip(!process.env.CI, 'visual baselines are made on CI (Linux), not on a Mac');

// inventoryPage is a fixture: the browser is already logged in and sitting on the products page
test('inventory page looks the same as the saved screenshot', async ({ page, inventoryPage }) => {
  // Wait until the heading is there, so we don't take the picture of a half-loaded page
  await expect(inventoryPage.title).toHaveText('Products');

  // Take a screenshot and compare it with the saved one called inventory.png.
  // The first run has nothing to compare with, so it saves the picture and the test fails once.
  // Run it again, or use --update-snapshots, and it compares against that saved picture.
  await expect(page).toHaveScreenshot('inventory.png');
});
