// defineConfig helps your editor suggest options. devices has ready-made browser settings.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Playwright looks for test files only inside this folder.
  testDir: './tests',

  // Run tests at the same time to finish faster.
  fullyParallel: true,

  // On CI, fail the run if someone left test.only in the code (it would skip all other tests).
  forbidOnly: !!process.env.CI,

  // If a test fails on CI, try it 2 more times. On your laptop, don't retry, so you see failures at once.
  retries: process.env.CI ? 2 : 0,

  // On CI, use 2 workers (parallel test runners). On your laptop, let Playwright choose.
  workers: process.env.CI ? 2 : undefined,

  // Show results in the terminal, and also save an HTML report. 'never' stops it opening a browser by itself.
  reporter: [['list'], ['html', { open: 'never' }]],

  // Settings shared by every test.
  use: {
    // The website address. Now page.goto('/') opens saucedemo.com.
    baseURL: 'https://www.saucedemo.com',

    // This site marks elements with data-test (not the default data-testid), so getByTestId needs to know.
    testIdAttribute: 'data-test',

    // Save a trace (a step-by-step recording) only when a test is retried after failing.
    trace: 'on-first-retry',

    // Take a screenshot only when a test fails.
    screenshot: 'only-on-failure',
  },

  // Each project runs all tests in one browser.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
