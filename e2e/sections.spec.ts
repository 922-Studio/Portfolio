import {test, expect} from './fixtures';

test.describe('About Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('section heading is visible', async ({page}) => {
    await expect(page.locator('#about h2')).toBeVisible();
  });

  test('body paragraphs are visible', async ({page}) => {
    const paragraphs = page.locator('#about p');
    await expect(paragraphs.first()).toBeVisible();
  });

  test('photo stack is visible and clickable', async ({page}) => {
    const stack = page.locator('#about .cursor-pointer');
    await stack.scrollIntoViewIfNeeded();
    await expect(stack).toBeVisible();
  });

  test('clicking photo stack rotates photos', async ({page}) => {
    const stack = page.locator('#about .cursor-pointer');
    await stack.scrollIntoViewIfNeeded();

    // Capture src of the first image before rotation
    const firstImg = stack.locator('img').first();
    const srcBefore = await firstImg.getAttribute('src');

    await stack.click();
    await page.waitForTimeout(600); // 500ms CSS transition + buffer

    // After rotate(): order changes from [0,1,2] to [2,0,1] — first img src changes
    const srcAfter = await firstImg.getAttribute('src');
    expect(srcAfter).not.toBe(srcBefore);
  });

  test('clicking photo stack twice cycles back correctly', async ({page}) => {
    const stack = page.locator('#about .cursor-pointer');
    await stack.scrollIntoViewIfNeeded();

    const firstImg = stack.locator('img').first();
    const srcInitial = await firstImg.getAttribute('src');

    // Three clicks returns to original order [0,1,2]
    await stack.click();
    await page.waitForTimeout(600);
    await stack.click();
    await page.waitForTimeout(600);
    await stack.click();
    await page.waitForTimeout(600);

    const srcFinal = await firstImg.getAttribute('src');
    expect(srcFinal).toBe(srcInitial);
  });

  test('photos hint label is visible', async ({page}) => {
    const stack = page.locator('#about .cursor-pointer');
    await stack.scrollIntoViewIfNeeded();
    await expect(stack.locator('span')).toBeVisible();
  });
});

test.describe('About Section (DE)', () => {
  test('section heading is visible in German', async ({page}) => {
    await page.goto('/de');
    await expect(page.locator('#about h2')).toBeVisible();
  });
});

test.describe('Stack Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('section heading is visible', async ({page}) => {
    await expect(page.locator('#stack h2')).toBeVisible();
  });

  test('renders all three categories', async ({page}) => {
    const categories = page.locator('#stack h3');
    await expect(categories).toHaveCount(3);
  });

  test('tech items link to external documentation', async ({page}) => {
    const techLinks = page.locator('#stack a[target="_blank"]');
    const count = await techLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await techLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test('Next.js item links to nextjs.org docs', async ({page}) => {
    const link = page.locator('#stack a[href="https://nextjs.org/docs"]');
    await expect(link).toBeVisible();
  });

  test('Docker item links to docker docs', async ({page}) => {
    const link = page.locator('#stack a[href="https://docs.docker.com"]');
    await expect(link).toBeVisible();
  });
});

test.describe('Testimonials Section', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/en');
  });

  test('section heading is visible', async ({page}) => {
    const heading = page.locator('#testimonials h2');
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('testimonial quote is visible', async ({page}) => {
    const quote = page.locator('#testimonials blockquote');
    await quote.scrollIntoViewIfNeeded();
    await expect(quote).toBeVisible();
  });

  test('testimonial author name is visible', async ({page}) => {
    const section = page.locator('#testimonials');
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator('p.font-heading')).toBeVisible();
  });

  test('testimonial author role is visible', async ({page}) => {
    const section = page.locator('#testimonials');
    await section.scrollIntoViewIfNeeded();
    // Author role is a second <p> inside the author info block
    const role = section.locator('.text-sm.text-text-secondary').first();
    await expect(role).toBeVisible();
  });

  test('testimonial author avatar is rendered', async ({page}) => {
    const section = page.locator('#testimonials');
    await section.scrollIntoViewIfNeeded();
    const avatar = section.locator('img').first();
    await expect(avatar).toBeVisible();
  });
});

test.describe('Testimonials Section (DE)', () => {
  test('section heading is visible in German', async ({page}) => {
    await page.goto('/de');
    await expect(page.locator('#testimonials h2')).toBeVisible();
  });
});
