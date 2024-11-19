import { test } from '@playwright/test';
import core from './migration-tests.json' assert { type: "json" };

interface MigrationPattern {
  from: string;
  to: string;
}

test.describe('Website Migrations: Visual Tests', () => {

  core.forEach((comparison: MigrationPattern) => {
    test(`Comparison from "${comparison.from}" to "${comparison.to}"`, async ({ page }, testInfo) => {
      const fromScreenshotPath: string = `./tests/migration/migration-screenshots/${urlToFilename(comparison.from)}--FROM--${urlToFilename(testInfo.project.name)}.png`;
      const toScreenshotPath: string = `./tests/migration/migration-screenshots/${urlToFilename(comparison.to)}--TO--${urlToFilename(testInfo.project.name)}.png`;
      const diffScreenshotPath = `./tests/migration/migration-screenshots/${urlToFilename(comparison.from)}--DIFF--${urlToFilename(testInfo.project.name)}.png`;

      await page.goto(comparison.from, { timeout: 60000, waitUntil: "networkidle" });
      await page.screenshot({ path: fromScreenshotPath, timeout: 5000 });

      await page.goto(comparison.to, { timeout: 60000, waitUntil: "networkidle" });
      await page.screenshot({ path: toScreenshotPath, timeout: 5000 });
    });
  });

});

function urlToFilename(url: string): string {
  return url
    .replace('https://', '')
    .replace(/\//, '')
    .replaceAll('.', '-')
    .replaceAll('&', '-')
    .replaceAll(' ', '-')
    .replaceAll('?', '--');
}
