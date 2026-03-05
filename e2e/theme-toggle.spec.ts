import {test, expect} from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.use({colorScheme: 'dark'});

  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('toggle button exists and is visible', async ({page}) => {
    const toggle = page.locator('header button[aria-label*="mode"]');
    await expect(toggle).toBeVisible();
  });

  test('clicking toggle switches from dark to light', async ({page}) => {
    const html = page.locator('html');

    // Should start in dark mode (prefers-color-scheme: dark)
    await expect(html).toHaveClass(/dark/);

    // Click toggle to switch to light
    const toggle = page.locator('header button[aria-label*="mode"]');
    await toggle.click();

    // Should no longer have dark class
    await expect(html).not.toHaveClass(/dark/);
  });

  test('clicking toggle again switches back to dark', async ({page}) => {
    const html = page.locator('html');
    const toggle = page.locator('header button[aria-label*="mode"]');

    // Switch to light
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);

    // Switch back to dark
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
  });

  test('preference is stored in localStorage', async ({page}) => {
    const toggle = page.locator('header button[aria-label*="mode"]');

    // Toggle to light
    await toggle.click();
    let theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('light');

    // Toggle back to dark
    await toggle.click();
    theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });

  test('preference persists across page navigation', async ({page}) => {
    const toggle = page.locator('header button[aria-label*="mode"]');

    // Toggle to light
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Navigate to another locale
    await page.goto('/de');

    // Should still be light mode
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
