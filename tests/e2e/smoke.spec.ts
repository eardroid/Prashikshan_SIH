import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Prashiskshan/);
    await expect(page.locator('h1')).toContainText('Verified Internships');
  });

  test('should navigate to micro-learning page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Micro-Learning');
    await expect(page).toHaveURL(/.*micro-learning/);
    await expect(page.locator('h1')).toContainText('Micro-Learning');
  });

  test('should open login modal', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Sign in / Sign up');
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });

  test('should navigate to SOS page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=SOS');
    await expect(page).toHaveURL(/.*sos/);
    await expect(page.locator('h1')).toContainText('Report an Incident');
  });

  test('should submit SOS form', async ({ page }) => {
    await page.goto('/sos');
    
    // Select severity
    await page.click('input[value="ORANGE"]');
    
    // Fill description
    await page.fill('textarea[id="description"]', 'This is a test incident report for automated testing purposes.');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('text=Case Submitted Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to analytics', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Analytics');
    await expect(page).toHaveURL(/.*analytics/);
  });

  test('should display student portal', async ({ page }) => {
    await page.goto('/portals/student');
    await expect(page.locator('h1')).toContainText('Welcome back');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
