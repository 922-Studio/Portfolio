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

  test('certificate cards link to Coursera verification', async ({page}) => {
    const foundationalLink = page.locator('#certifications a[href="https://coursera.org/verify/ACFDEDI153XB"]');
    await expect(foundationalLink).toBeVisible();
    await expect(foundationalLink).toHaveAttribute('target', '_blank');

    const chatbotLink = page.locator('#certifications a[href="https://coursera.org/verify/F8W0F3S0PE3P"]');
    await expect(chatbotLink).toBeVisible();
    await expect(chatbotLink).toHaveAttribute('target', '_blank');
  });

  test('certificate cards display course names, issuer and date', async ({page}) => {
    const section = page.locator('#certifications');
    await expect(section.getByText('Gen AI: Unlock Foundational Concepts')).toBeVisible();
    await expect(section.getByText('Gen AI: Beyond the Chatbot')).toBeVisible();
    await expect(section.getByText('Google Cloud').first()).toBeVisible();
    await expect(section.getByText('Mar 2026').first()).toBeVisible();
  });

  test('certificate card displays series info', async ({page}) => {
    const section = page.locator('#certifications');
    await expect(section.getByText(/Generative AI for Leaders/).first()).toBeVisible();
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
    await expect(section.getByText('Mär. 2026').first()).toBeVisible();
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
