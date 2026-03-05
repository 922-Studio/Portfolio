import {test, expect} from '@playwright/test';

test.describe('Impressum Page', () => {
  test.describe('German', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/de/impressum');
    });

    test('page loads and shows heading', async ({page}) => {
      await expect(page.locator('h1')).toContainText('Impressum');
    });

    test('shows legal subheading with DDG reference', async ({page}) => {
      await expect(page.locator('text=§ 5 DDG')).toBeVisible();
    });

    test('displays responsible person name and brand', async ({page}) => {
      const section = page.locator('section');
      await expect(section.locator('text=Gregor Krykon').first()).toBeVisible();
      await expect(section.locator('text=922 Studio')).toBeVisible();
    });

    test('displays full address', async ({page}) => {
      await expect(page.locator('text=Bajuwarenstraße 8')).toBeVisible();
      await expect(page.locator('text=85567 Grafing bei München')).toBeVisible();
      await expect(page.locator('text=Deutschland')).toBeVisible();
    });

    test('email link is correct', async ({page}) => {
      const emailLink = page.locator('a[href="mailto:gregor.krykon@922-studio.com"]');
      await expect(emailLink).toBeVisible();
    });

    test('dispute resolution links to EU ODR platform', async ({page}) => {
      const odrLink = page.locator('a[href="https://ec.europa.eu/consumers/odr/"]');
      await expect(odrLink).toBeVisible();
      await expect(odrLink).toHaveAttribute('target', '_blank');
    });

    test('back link navigates to homepage', async ({page}) => {
      const backLink = page.locator('a', {hasText: 'Zurück zur Startseite'});
      await expect(backLink).toBeVisible();
      await backLink.click();
      await expect(page).toHaveURL(/\/de\/?$/);
    });
  });

  test.describe('English', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/en/impressum');
    });

    test('page loads with English heading', async ({page}) => {
      await expect(page.locator('h1')).toContainText('Legal Notice');
    });

    test('shows English subheading', async ({page}) => {
      await expect(page.locator('text=German Digital Services Act')).toBeVisible();
    });

    test('displays address with English country name', async ({page}) => {
      await expect(page.locator('text=Germany')).toBeVisible();
    });

    test('back link navigates to English homepage', async ({page}) => {
      const backLink = page.locator('a', {hasText: 'Back to Homepage'});
      await expect(backLink).toBeVisible();
      await backLink.click();
      await expect(page).toHaveURL(/\/en\/?$/);
    });
  });

  test.describe('Footer Link', () => {
    test('footer contains Impressum link on German page', async ({page}) => {
      await page.goto('/de');
      const footerLink = page.locator('footer a', {hasText: 'Impressum'});
      await expect(footerLink).toBeVisible();
      await footerLink.click();
      await expect(page).toHaveURL(/\/de\/impressum/);
    });

    test('footer contains Legal Notice link on English page', async ({page}) => {
      await page.goto('/en');
      const footerLink = page.locator('footer a', {hasText: 'Legal Notice'});
      await expect(footerLink).toBeVisible();
      await footerLink.click();
      await expect(page).toHaveURL(/\/en\/impressum/);
    });
  });

  test.describe('Meta', () => {
    test('page has correct title', async ({page}) => {
      await page.goto('/de/impressum');
      await expect(page).toHaveTitle(/Impressum.*922 Studio/);
    });

    test('English page has correct title', async ({page}) => {
      await page.goto('/en/impressum');
      await expect(page).toHaveTitle(/Legal Notice.*922 Studio/);
    });
  });
});
