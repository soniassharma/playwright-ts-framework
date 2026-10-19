import { test, expect } from '../../fixtures';

test('price low to high shows prices in ascending order', async ({ inventoryPage }) => {
  await inventoryPage.sortBy('lohi');

  // Read every price on the page, e.g. "$29.99" becomes 29.99
  const texts = await inventoryPage.itemPrices.allTextContents();
  const prices = texts.map((t) => Number(t.replace('$', '')));

  // Compare with a sorted copy of the same list. [...prices] copies it so sort() does not change the original.
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('name Z to A shows names in descending order', async ({ inventoryPage }) => {
  await inventoryPage.sortBy('za');

  const names = await inventoryPage.itemNames.allTextContents();

  expect(names).toEqual([...names].sort().reverse());
});
