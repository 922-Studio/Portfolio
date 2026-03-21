import {test, expect} from './fixtures';

test.describe('Certifications Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('section is visible on the page', async ({page}) => {
    const section = page.locator('#certifications');
    await expect(section).toBeVisible();
  });

  test('heading is displayed', async ({page}) => {
    const heading = page.locator('#certifications h2');
    await expect(heading).toHaveText('Certifications');
  });

  test('certificate card links to Coursera verification', async ({page}) => {
    const link = page.locator('#certifications a[href="https://coursera.org/verify/F8W0F3S0PE3P"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('certificate card displays course name, issuer and date', async ({page}) => {
    const section = page.locator('#certifications');
    await expect(section.getByText('Gen AI: Beyond the Chatbot')).toBeVisible();
    await expect(section.getByText('Google Cloud')).toBeVisible();
    await expect(section.getByText('Mar 2026')).toBeVisible();
  });

  test('certificate card displays series info', async ({page}) => {
    const section = page.locator('#certifications');
    await expect(section.getByText(/Generative AI for Leaders/)).toBeVisible();
  });
});

test.describe('Certifications Section (DE)', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/de');
  });

  test('heading is displayed in German', async ({page}) => {
    const heading = page.locator('#certifications h2');
    await expect(heading).toHaveText('Zertifikate');
  });

  test('certificate card is visible with German date', async ({page}) => {
    const section = page.locator('#certifications');
    await expect(section.getByText('Mär. 2026')).toBeVisible();
  });
});

test.describe('Certifications Navigation', () => {
  test('bottom nav has certifications link', async ({page}) => {
    await page.goto('/en');
    const nav = page.locator('nav');
    const link = nav.locator('a[href="#certifications"]');
    await expect(link).toBeVisible();
  });

  test('clicking nav link scrolls to certifications section', async ({page}) => {
    await page.goto('/en');
    const nav = page.locator('nav');
    await nav.locator('a[href="#certifications"]').click();
    await expect(page).toHaveURL(/.*#certifications/);
  });
});
