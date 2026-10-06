# playwright-ts-framework

End-to-end UI tests for [saucedemo.com](https://www.saucedemo.com) using Playwright and TypeScript.

> Work in progress. Currently at Phase 1: Playwright is set up and configured, and the tests are coming next.

## Stack

- Playwright Test
- TypeScript
- Node.js 20 (see `.nvmrc`)

## Run locally

```bash
nvm use                      # picks the Node version from .nvmrc
npm ci                       # installs the exact versions from package-lock.json
npx playwright install       # downloads the browsers
npx playwright test          # runs all tests in chromium and firefox
npx playwright show-report   # opens the HTML report
```

## Test data

The usernames and password used in the tests are the demo credentials that saucedemo.com publishes on its own login page. They are not real secrets.

## Design decisions

- **Test ids:** saucedemo marks elements with `data-test`, not Playwright's default `data-testid`. I set `testIdAttribute: 'data-test'` in the config so `getByTestId` works.
- **Base URL:** set once in the config, so tests use `page.goto('/')`.
- **Browsers:** chromium and firefox. Webkit is left out to keep runs shorter.
- **Retries:** only on CI. Locally I want a failure to show up right away.
- **Debugging:** traces are saved on the first retry and screenshots on failure, so failed runs can be inspected without re-running them.

## What I'd add next

- Page objects and fixtures
- Cart, sorting and checkout tests
- Negative login tests
- GitHub Actions and a published HTML report
