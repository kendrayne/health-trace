import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can register and then login', async ({ page }) => {

    await page.goto('/register');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/login');

    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });
});