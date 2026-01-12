import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('/login')

  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')

  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/')
})

test('shows error on invalid login', async ({ page }) => {
  await page.goto('/login')

  await page.fill('input[name="email"]', 'wrong@example.com')
  await page.fill('input[name="password"]', 'nope')

  await page.click('button[type="submit"]')

  await expect(
    page.getByText(/invalid credentials/i)
  ).toBeVisible()
})
