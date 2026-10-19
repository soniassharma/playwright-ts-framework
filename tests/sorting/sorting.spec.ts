import { test, expect } from '../../fixtures';

test('price low to high shows prices in ascending order', async ({ inventoryPage }) => {
  // Pick "Price (low to high)" in the sort dropdown. "lohi" is that option's value.
  await inventoryPage.sortBy('lohi');

  // Read the text of every price on the page, e.g. ["$7.99", "$9.99", ...]
  const texts = await inventoryPage.itemPrices.allTextContents();
  // Remove the "$" and turn each text into a number so we can compare them, e.g. "$7.99" becomes 7.99
  const prices = texts.map((t) => Number(t.replace('$', '')));

  // Make a sorted copy of the list and check the page's order is the same.
  // [...prices] copies the list first, because sort() would otherwise change the original.
  // (a, b) => a - b sorts numbers from smallest to largest.
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('name Z to A shows names in descending order', async ({ inventoryPage }) => {
  // Pick "Name (Z to A)". "za" is that option's value.
  await inventoryPage.sortBy('za');

  // Read every product name as text
  const names = await inventoryPage.itemNames.allTextContents();

  // Sort a copy A to Z, flip it to Z to A, and check the page matches it
  expect(names).toEqual([...names].sort().reverse());
});
