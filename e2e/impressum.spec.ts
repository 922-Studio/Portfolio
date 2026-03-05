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
  });

  test.describe('Footer Link', () => {
    test('footer contains Impressum link on German page', async ({page}) => {
      await page.goto('/de');
      const footerLink = page.locator('footer a', {hasText: 'Impressum'});
      await expect(footerLink).toBeVisible();
      await footerLink.dispatchEvent('click');
      await expect(page).toHaveURL(/\/de\/impressum/);
    });

    test('footer contains Legal Notice link on English page', async ({page}) => {
      await page.goto('/en');
      const footerLink = page.locator('footer a', {hasText: 'Legal Notice'});
      await expect(footerLink).toBeVisible();
      await footerLink.dispatchEvent('click');
      await expect(page).toHaveURL(/\/en\/impressum/);
    });
  });

  test.describe('Bottom Navigation from Impressum', () => {
    const navLabels = {
      de: ['Start', 'Über mich', 'Technik', 'Projekte', 'Kontakt'],
      en: ['Home', 'About', 'Stack', 'Projects', 'Contact'],
    } as const;

    for (const locale of ['de', 'en'] as const) {
      for (const label of navLabels[locale]) {
        test(`${locale}: bottom nav "${label}" navigates to homepage`, async ({page}) => {
          await page.goto(`/${locale}/impressum`);
          const nav = page.locator('nav');
          const link = nav.locator('a', {hasText: label});
          await link.click();
          await page.waitForURL(url => !url.pathname.includes('impressum'));
          await expect(page).not.toHaveURL(/impressum/);
        });
      }
    }
  });

  test.describe('Bottom Nav Visibility', () => {
    test('bottom nav stays visible on impressum when scrolling down', async ({page}) => {
      await page.goto('/de/impressum');
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      await expect(nav).toHaveAttribute('data-always-visible', 'true');
      // Scroll down — nav should remain visible
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(400);
      await expect(nav).toBeVisible();
      await expect(nav).not.toHaveCSS('opacity', '0');
    });

    test('bottom nav hides on homepage when scrolling down', async ({page}) => {
      await page.goto('/de');
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      await expect(nav).not.toHaveAttribute('data-always-visible');
      // Scroll down past threshold — nav should hide
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(400);
      await expect(nav).toHaveCSS('opacity', '0');
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
