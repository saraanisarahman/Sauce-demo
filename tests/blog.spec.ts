import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blogs/news');
  });

  test('blog page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('News – Sauce Demo');
  });

  test('blog post preview is visible with title and author', async ({ page }) => {
    await expect(page.locator("a[href='/blogs/news/12832805-first-post']")).toBeVisible();

    // "Shopify" onek jaygay ache, tai "Posted by" text er shathe check kora hocche
    await expect(page.getByText('Posted by')).toBeVisible();
  });

  test('clicking a blog post navigates to the full article', async ({ page }) => {
    await page.locator("a[href='/blogs/news/12832805-first-post']").first().click();

    await expect(page).toHaveURL(/\/blogs\/news\/12832805-first-post/);
    await expect(page.getByRole('heading', { name: 'First Post' })).toBeVisible();
  });

  test('blog navigation link from homepage works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Blog' }).click();

    await expect(page).toHaveURL(/\/blogs\/news/);
    await expect(page).toHaveTitle('News – Sauce Demo');
  });

  test('breadcrumb navigates back to home from blog', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL('/');
  });
});