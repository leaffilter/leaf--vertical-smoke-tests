import { test, expect } from '@playwright/test';

interface DomainPattern {
  url: string;
  active: boolean;
}

import core from './smoke-tests.json';

const smokeOnly: boolean = core.SMOKE_ONLY;
const maxDiffPixelRatio = core.MAX_DIFF_PIXEL_RATIO;

test.describe('Smoke Tests', () => {

  core.DOMAINS.forEach((domain: DomainPattern) => {
    if (domain.active === true) {

      const paths: Array<string> = smokeOnly
        ? [...core[domain.url].smoke]
        : [...core[domain.url].detailed, ...core[domain.url].smoke];

      paths.forEach(async (path: string) => {
        const fullpath: string = `${domain.url}${path}`;
  
        test(`for "${fullpath}"`, async ({ page }) => {
          await page.goto(fullpath, { timeout: 60000, waitUntil: "networkidle" });
          await page.waitForTimeout(1000);
          await expect(page).toHaveScreenshot({
            fullPage: true,
            maxDiffPixelRatio,
          });  
        });

      });

    }
  });
});
