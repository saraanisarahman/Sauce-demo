import { test, expect } from '@playwright/test';

test('homepage loads with correct title and products', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Sauce Demo');
  await expect(page.locator('text=Grey jacket')).toBeVisible();
});