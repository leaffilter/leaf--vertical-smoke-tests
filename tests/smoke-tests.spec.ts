import { test, expect } from '@playwright/test';

interface DomainStructure {
  smoke: Array<string>;
  detailed: Array<string>;
}

import core from './smoke-tests.json';
const smokeOnly: boolean = true;

test.describe('Leaf Website Verticals: Smoke Tests', () => {

  core.DOMAINS.forEach((domain: string) => {
    const type: string = smokeOnly ? 'smoke' : 'detailed';
    core[domain][type].forEach(async (path: DomainStructure) => {
      const fullpath: string = `${domain}${path}`;

      test(`Smoke Test for "${fullpath}"`, async ({ page }) => {
        await page.goto(fullpath, { timeout: 60000, waitUntil: "networkidle" });
        await expect(page).toHaveScreenshot();  
      });

    });
  });

});