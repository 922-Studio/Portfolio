import {test, expect} from '@playwright/test';

test.describe('Share Card', () => {
  test.describe('EN locale', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/en');
    });

    test('share button is visible in contact section', async ({page}) => {
      const btn = page.locator('#contact button[aria-label="Share this page"]');
      await expect(btn).toBeVisible();
    });

    test('clicking share button opens modal', async ({page}) => {
      const btn = page.locator('#contact button[aria-label="Share this page"]');
      await btn.click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal).toBeVisible();

      await expect(modal.getByText('Gregor Krykon')).toBeVisible();
    });

    test('modal shows correct name and title', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal.getByText('Gregor Krykon')).toBeVisible();
      await expect(modal.getByText('Automation Engineer · Full-Stack Dev')).toBeVisible();
    });

    test('modal shows EN tagline', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal.getByText('I automate so you can focus on what matters.')).toBeVisible();
    });

    test('modal shows EN site URL', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal.getByText('gregor.922-studio.com/en')).toBeVisible();
    });

    test('modal shows scan hint in English', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal.getByText('Scan to visit my site')).toBeVisible();
    });

    test('modal displays EN QR code image', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const qrImg = page.locator('[data-testid="share-modal"] img[alt="QR code to website"]');
      await expect(qrImg).toBeVisible();
      await expect(qrImg).toHaveAttribute('src', /qr-en/);
    });

    test('close button dismisses modal', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal).toBeVisible();

      await modal.locator('button[aria-label="Close"]:visible').click();

      await expect(modal).not.toBeVisible();
    });

    test('clicking overlay backdrop dismisses modal', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal).toBeVisible();

      // Click the backdrop (top-left corner, outside the card)
      await modal.click({position: {x: 10, y: 10}});

      await expect(modal).not.toBeVisible();
    });

    test('pressing Escape dismisses modal', async ({page}) => {
      await page.locator('#contact button[aria-label="Share this page"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal).toBeVisible();

      await page.keyboard.press('Escape');

      await expect(modal).not.toBeVisible();
    });
  });

  test.describe('DE locale', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/de');
    });

    test('share button is visible with DE label', async ({page}) => {
      const btn = page.locator('#contact button[aria-label="Seite teilen"]');
      await expect(btn).toBeVisible();
    });

    test('modal shows DE tagline', async ({page}) => {
      await page.locator('#contact button[aria-label="Seite teilen"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(
        modal.getByText('Ich automatisiere, um dir mehr Zeit fürs Wesentliche zu verschaffen.')
      ).toBeVisible();
    });

    test('modal shows DE site URL', async ({page}) => {
      await page.locator('#contact button[aria-label="Seite teilen"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal.getByText('gregor.922-studio.com/de')).toBeVisible();
    });

    test('modal displays DE QR code image', async ({page}) => {
      await page.locator('#contact button[aria-label="Seite teilen"]').click();

      const qrImg = page.locator('[data-testid="share-modal"] img[alt="QR-Code zur Website"]');
      await expect(qrImg).toBeVisible();
      await expect(qrImg).toHaveAttribute('src', /qr-de/);
    });

    test('modal shows scan hint in German', async ({page}) => {
      await page.locator('#contact button[aria-label="Seite teilen"]').click();

      const modal = page.locator('[data-testid="share-modal"]');
      await expect(modal.getByText('Scannen, um meine Seite zu öffnen')).toBeVisible();
    });
  });

  test.describe('QR Code Validation', () => {
    test('DE QR code resolves to gregor.922-studio.com/de', async ({page}) => {
      // Go to the actual site page so we have a full DOM with document.head
      await page.goto('/de');

      const decodedUrl = await page.evaluate(async () => {
        // Load jsQR
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
        document.head.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });

        // Fetch the SVG as text and render it
        const resp = await fetch('/images/qr-de.svg');
        const svgText = await resp.text();

        const svgBlob = new Blob([svgText], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);

        const image = new Image();
        image.src = url;
        await new Promise((resolve) => { image.onload = resolve; });

        const canvas = document.createElement('canvas');
        const size = 400;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(image, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const code = (window as any).jsQR(imageData.data, imageData.width, imageData.height);
        URL.revokeObjectURL(url);

        return code?.data || null;
      });

      expect(decodedUrl).toBe('https://gregor.922-studio.com/de');
    });

    test('EN QR code resolves to gregor.922-studio.com/en', async ({page}) => {
      await page.goto('/en');

      const decodedUrl = await page.evaluate(async () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
        document.head.appendChild(script);
        await new Promise((resolve) => { script.onload = resolve; });

        const resp = await fetch('/images/qr-en.svg');
        const svgText = await resp.text();

        const svgBlob = new Blob([svgText], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);

        const image = new Image();
        image.src = url;
        await new Promise((resolve) => { image.onload = resolve; });

        const canvas = document.createElement('canvas');
        const size = 400;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(image, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const code = (window as any).jsQR(imageData.data, imageData.width, imageData.height);
        URL.revokeObjectURL(url);

        return code?.data || null;
      });

      expect(decodedUrl).toBe('https://gregor.922-studio.com/en');
    });

    test('QR code URLs actually resolve (HTTP 200)', async ({request}) => {
      const deUrl = await request.get('https://gregor.922-studio.com/de');
      expect(deUrl.status()).toBe(200);

      const enUrl = await request.get('https://gregor.922-studio.com/en');
      expect(enUrl.status()).toBe(200);
    });
  });
});
