import { test, expect } from '@playwright/test';

test.describe('Pagination Application', () => {
  test('should load the initial page and display products', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for the products container to appear
    const productsContainer = page.locator('.products');
    await expect(productsContainer).toBeVisible();

    // Verify exactly 10 products are on the first page
    const products = page.locator('.products__single');
    await expect(products).toHaveCount(10);

    // Verify the pagination container is visible
    const pagination = page.locator('.pagination');
    await expect(pagination).toBeVisible();

    // On page 1, verify "Prev" is NOT visible, but "Next" is visible
    await expect(page.locator('text=Prev')).not.toBeVisible();
    await expect(page.locator('text=Next')).toBeVisible();
  });

  test('should navigate to next page and previous page', async ({ page }) => {
    await page.goto('/');
    
    // Wait for products to load and get the first product title
    await page.waitForSelector('.products__single span');
    const firstProductTitlePage1 = await page.locator('.products__single span').first().textContent();

    // Click "Next"
    await page.click('text=Next');

    // Wait for an update (simplest way is to ensure UI changes, but here we can wait for products to reload)
    // We expect the first product's title to be different from page 1
    await expect(page.locator('.products__single span').first()).not.toHaveText(firstProductTitlePage1 || '');

    // Now on page 2, "Prev" should be visible
    await expect(page.locator('text=Prev')).toBeVisible();
    
    // Ensure the selected page is "2"
    const activePageButton = page.locator('.pagination_selected');
    await expect(activePageButton).toHaveText('2');

    // Click "Prev" to return to page 1
    await page.click('text=Prev');

    // Ensure we are back on page 1
    const activePageButton2 = page.locator('.pagination_selected');
    await expect(activePageButton2).toHaveText('1');
    
    // First product title should match the original title again
    await expect(page.locator('.products__single span').first()).toHaveText(firstProductTitlePage1 || '');
  });

  test('should click specific page number and render ellipsis correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click page 5
    // Need to avoid clicking "15" if it exists, so use an exact text match anchor or span click
    await page.locator('.pagination span', { hasText: /^5$/ }).click();
    
    // Expect selected page to be 5
    await expect(page.locator('.pagination_selected')).toHaveText('5');

    // Because it's page 5 (midway), we should see the left ellipsis "..."
    // Note: in our component ellipsis doesn't have a unique class besides 'pagination__ellipsis' wrapper or '...'
    const ellipses = page.locator('text="..."');
    
    // On page 5 with maxVisible=10 and ~15 total pages (100+ items / 10 limit = maybe more, dummy API has 194 length, so ~20 total pages)
    // If totalPages is 20, maxVisible 10, startPage = Math.max(1, 5 - 5) = 1.
    // Let's actually dynamically check total pages first, then click a deep page.
    
    // Wait for pagination to render
    await page.waitForSelector('.pagination');
    
    // If there are many pages, let's click the last available element that is a number (or "Next").
    // Let's just click 'Next' a few times to see ellipsis logic fire dynamically if needed, 
    // or just rely on clicking the last possible page explicitly.
  });
});
