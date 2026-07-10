import { test, expect } from '@playwright/test';

test.describe('About Us Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/about-us');
  });

  test('about us page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('About Us – Sauce Demo');
  });

  test('main heading and content are visible', async ({ page }) => {
    // "About Us" heading ekhane 2 jaygay ache (main + footer),
    // tai .first() use kora hoyeche
    await expect(page.getByRole('heading', { name: 'About Us' }).first()).toBeVisible();

    // description text check kora
    await expect(page.getByText(/demo site created for/i).first()).toBeVisible();
  });

  test('link to Sauce (sauceapp.io) is present', async ({ page }) => {
  const sauceLink = page.getByRole('link', { name: 'Sauce', exact: true }).first();
  await expect(sauceLink).toBeVisible();
  await expect(sauceLink).toHaveAttribute('href', 'http://sauceapp.io');
});

  test('about us navigation link from homepage works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About Us', exact: true }).first().click();

    await expect(page).toHaveURL(/\/pages\/about-us/);
    await expect(page).toHaveTitle('About Us – Sauce Demo');
  });

  test('breadcrumb navigates back to home', async ({ page }) => {
  await page.getByRole('link', { name: 'Home' }).first().click();
  await expect(page).toHaveURL('/');
});
});