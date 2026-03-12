import {test, expect} from '@playwright/test';

test.describe('Header', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('GitHub link points to correct URL', async ({page}) => {
    const link = page.locator('header a[aria-label="GitHub"]');
    await expect(link).toHaveAttribute('href', 'https://github.com/Tannjev922');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('LinkedIn link points to correct URL', async ({page}) => {
    const link = page.locator('header a[aria-label="LinkedIn"]');
    await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/gregor-krykon-11007428a/');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('Language switcher has EN and DE options', async ({page}) => {
    const en = page.locator('header').getByText('EN', {exact: true});
    const de = page.locator('header').getByText('DE', {exact: true});
    await expect(en).toBeVisible();
    await expect(de).toBeVisible();
  });

  test('Language switcher DE links to /de', async ({page}) => {
    const de = page.locator('header').getByText('DE', {exact: true});
    await expect(de).toHaveAttribute('href', /\/de/);
  });
});

test.describe('BottomNav', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('active nav links have correct hrefs', async ({page}) => {
    const nav = page.locator('nav');
    const expectedLinks = [
      {text: 'Home', href: '#'},
      {text: 'About', href: '#about'},
      {text: 'Stack', href: '#stack'},
      {text: 'Projects', href: '#projects'},
      {text: 'Testimonials', href: '#testimonials'},
      {text: 'Contact', href: '#contact'},
    ];

    for (const {href} of expectedLinks) {
      const link = nav.locator(`a[href="${href}"]`).first();
      await expect(link).toBeVisible();
    }
  });

});

test.describe('Hero Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('CV button links to English PDF on /en', async ({page}) => {
    const cv = page.locator('#hero a[href="/cv-en.pdf"]');
    await expect(cv).toBeVisible();
    await expect(cv).toHaveAttribute('target', '_blank');
  });

  test('CV button links to German PDF on /de', async ({page}) => {
    await page.goto('/de');
    const cv = page.locator('#hero a[href="/cv-de.pdf"]');
    await expect(cv).toBeVisible();
    await expect(cv).toHaveAttribute('target', '_blank');
  });
});

test.describe('Projects Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('project cards link to correct live URLs', async ({page}) => {
    const expectedUrls = [
      'https://sweatvalley-bingo.922-studio.com',
      'https://krimispiele.com',
      'https://samhain-verlag.de',
      'https://krimidinnerverzeichnis.de',
    ];

    for (const url of expectedUrls) {
      const link = page.locator(`#projects a[href="${url}"]`).first();
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('tech tags link to official documentation', async ({page}) => {
    const tagLinks = page.locator('#projects .border-t a[target="_blank"]');
    const count = await tagLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await tagLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
    }
  });
});

test.describe('External Links', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('all target="_blank" links have valid https hrefs or local paths', async ({page}) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await externalLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^(https:\/\/|\/)/);
    }
  });
});

test.describe('Contact Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('email link has correct mailto href', async ({page}) => {
    const emailLink = page.locator('#contact a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:gregor.krykon@922-studio.com');
  });

  test('Discord link points to correct URL', async ({page}) => {
    const link = page.locator('#contact a[aria-label="Discord"]');
    await expect(link).toHaveAttribute('href', 'https://discord.com/users/tannjev922');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('Telegram link points to correct URL', async ({page}) => {
    const link = page.locator('#contact a[aria-label="Telegram"]');
    await expect(link).toHaveAttribute('href', 'https://t.me/Gregor_0203');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('WhatsApp link points to correct URL', async ({page}) => {
    const link = page.locator('#contact a[aria-label="WhatsApp"]');
    await expect(link).toHaveAttribute('href', 'https://wa.me/4915737997074');
    await expect(link).toHaveAttribute('target', '_blank');
  });
});
