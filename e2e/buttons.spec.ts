import {test, expect} from './fixtures';

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

  test('GK logo scrolls to top on homepage', async ({page}) => {
    // Scroll down then back up slightly to reveal the header
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(500);

    const logo = page.locator('header a.text-gradient');
    await logo.click();
    await page.waitForTimeout(500);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(50);
  });

  test('GK logo navigates to homepage from impressum', async ({page}) => {
    await page.goto('/en/impressum');
    const logo = page.locator('header a.text-gradient');
    await expect(logo).toHaveAttribute('href', '/en');
    await logo.click();
    await page.waitForURL('**/en');
  });

  test('Header hides on scroll down and shows on scroll up', async ({page}) => {
    const header = page.locator('header');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    await expect(header).toHaveClass(/-translate-y-full/);

    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);
    await expect(header).toHaveClass(/translate-y-0/);
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

  test('clicking DE navigates to /de locale', async ({page}) => {
    const de = page.locator('header').getByText('DE', {exact: true});
    await de.click();
    await page.waitForURL('**/de');
    await expect(page).toHaveURL(/\/de/);
  });

  test('clicking EN from /de navigates back to /en', async ({page}) => {
    await page.goto('/de');
    const en = page.locator('header').getByText('EN', {exact: true});
    await en.click();
    await page.waitForURL('**/en');
    await expect(page).toHaveURL(/\/en/);
  });

  test('EN label has active style on /en', async ({page}) => {
    const en = page.locator('header').getByText('EN', {exact: true});
    await expect(en).toHaveClass(/text-text-primary/);
  });

  test('DE label has active style on /de', async ({page}) => {
    await page.goto('/de');
    const de = page.locator('header').getByText('DE', {exact: true});
    await expect(de).toHaveClass(/text-text-primary/);
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
      {text: 'Certs', href: '#certifications'},
      {text: 'Projects', href: '#projects'},
      {text: 'Testimonials', href: '#testimonials'},
      {text: 'Contact', href: '#contact'},
    ];

    for (const {href} of expectedLinks) {
      const link = nav.locator(`a[href="${href}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test('BottomNav is horizontally scrollable on small viewports', async ({page}) => {
    await page.setViewportSize({width: 320, height: 568});
    await page.goto('/en');
    const navContainer = page.locator('nav > div');
    const overflowX = await navContainer.evaluate((el) => getComputedStyle(el).overflowX);
    expect(overflowX).toBe('auto');
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

  test('Xing link points to correct URL', async ({page}) => {
    const link = page.locator('#contact a[aria-label="Xing"]');
    await expect(link).toHaveAttribute('href', 'https://www.xing.com/profile/Gregor_Krykon');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('Google Developer link points to correct URL', async ({page}) => {
    const link = page.locator('#contact a[aria-label="Google Developer"]');
    await expect(link).toHaveAttribute('href', 'https://g.dev/krykon-gregor');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('WhatsApp link points to correct URL', async ({page}) => {
    const link = page.locator('#contact a[aria-label="WhatsApp"]');
    await expect(link).toHaveAttribute('href', 'https://wa.me/4915737997074');
    await expect(link).toHaveAttribute('target', '_blank');
  });
});
