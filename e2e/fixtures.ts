import { test as base } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

const test = base.extend<{ autoCollectCoverage: void }>({
  autoCollectCoverage: [async ({ page }, use) => {
    await page.coverage.startJSCoverage({ resetOnNavigation: false });
    await use();
    const coverage = await page.coverage.stopJSCoverage();
    await addCoverageReport(coverage, test.info());
  }, { auto: true }],
});

export { test };
export { expect } from '@playwright/test';
