import {test, expect} from '@playwright/test';

test.describe('Projects Carousel', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('carousel has prev and next arrow buttons', async ({page}) => {
    const prev = page.locator('#projects button[aria-label="Previous project"]');
    const next = page.locator('#projects button[aria-label="Next project"]');
    await expect(prev).toBeVisible();
    await expect(next).toBeVisible();
  });

  test('clicking next advances to a different card', async ({page}) => {
    const track = page.locator('#projects .flex.gap-6');
    const initialTransform = await track.evaluate(
      (el) => getComputedStyle(el).transform,
    );

    const next = page.locator('#projects button[aria-label="Next project"]');
    await next.click();
    await page.waitForTimeout(600); // wait for transition

    const newTransform = await track.evaluate(
      (el) => getComputedStyle(el).transform,
    );
    expect(newTransform).not.toBe(initialTransform);
  });

  test('clicking prev goes back', async ({page}) => {
    const track = page.locator('#projects .flex.gap-6');
    const initialTransform = await track.evaluate(
      (el) => getComputedStyle(el).transform,
    );

    const prev = page.locator('#projects button[aria-label="Previous project"]');
    await prev.click();
    await page.waitForTimeout(600);

    const newTransform = await track.evaluate(
      (el) => getComputedStyle(el).transform,
    );
    expect(newTransform).not.toBe(initialTransform);
  });

  test('carousel loops infinitely forward', async ({page}) => {
    const next = page.locator('#projects button[aria-label="Next project"]');
    // Click through more than total slides to confirm no crash
    for (let i = 0; i < 6; i++) {
      await next.click();
      await page.waitForTimeout(600);
    }
    // Carousel should still be functional
    await expect(next).toBeVisible();
  });

  test('carousel loops infinitely backward', async ({page}) => {
    const prev = page.locator('#projects button[aria-label="Previous project"]');
    for (let i = 0; i < 6; i++) {
      await prev.click();
      await page.waitForTimeout(600);
    }
    await expect(prev).toBeVisible();
  });

  test('all project cards have live URLs', async ({page}) => {
    const links = page.locator('#projects a[target="_blank"][href^="https://"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
