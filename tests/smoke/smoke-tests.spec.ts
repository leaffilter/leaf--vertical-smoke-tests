import { test, expect } from '@playwright/test';
import core from './smoke-tests.json' assert { type: "json" };

interface DomainPattern {
  url: string;
  active: boolean;
}

const smokeOnly: boolean = core.SMOKE_ONLY;

test.describe('Website Verticals: Smoke Tests', () => {

  core.DOMAINS.forEach((domain: DomainPattern) => {
    if (domain.active === true) {

      const paths: Array<string> = smokeOnly
        ? [...core[domain.url].smoke]
        : [...core[domain.url].detailed, ...core[domain.url].smoke];

      paths.forEach(async (path: string) => {
        const fullpath: string = `${domain.url}${path}`;
  
        test.skip(`Smoke Test for "${fullpath}"`, async ({ page }) => {
          await page.goto(fullpath, { timeout: 60000, waitUntil: "networkidle" });
          await expect(page).toHaveScreenshot({
            fullPage: true,
            // maxDiffPixelRatio: 0.1,
          });
        });

      });
    }
  });

});