import { test, expect } from '@playwright/test';

test.describe('Catalog Page', () => {
  test.beforeEach(async ({ page }) => {
    // baseURL playwright.config.ts theke ashche, tai shudhu path likhlei hobe
    await page.goto('/collections/all');
  });

  test('catalog page loads with correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle('Products – Sauce Demo');
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  });

  test('all products are visible with name and price', async ({ page }) => {
    // Kisu product name check kora hocche jegulo amra jani thakbei
    await expect(page.getByText('Grey jacket', { exact: true })).toBeVisible();
    await expect(page.getByText('Noir jacket', { exact: true })).toBeVisible();
    await expect(page.getByText('Striped top', { exact: true })).toBeVisible();

    // Price o check kora
    await expect(page.getByText('£55.00')).toBeVisible();
    await expect(page.getByText('£60.00')).toBeVisible();
  });

  test('clicking a product navigates to its product detail page', async ({ page }) => {
    await page.getByRole('link', { name: /Grey jacket/i }).first().click();

    // URL product page e change hoyeche kina check kora
    await expect(page).toHaveURL(/\/products\/grey-jacket/);
  });

  test('sold out products are marked as sold out', async ({ page }) => {
    await expect(page.getByText('Sold Out').first()).toBeVisible();
  });

  test('catalog navigation link from homepage works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Catalog' }).click();

    await expect(page).toHaveURL(/\/collections\/all/);
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  });
});