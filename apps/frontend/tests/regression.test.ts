import { describe, beforeEach, expect, test } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import playwright from 'playwright';
expect.extend({ toMatchImageSnapshot });

interface Scenario {
  name: string;
  path: string;
  action?: () => Promise<void>;
}

type ColorScheme = 'light' | 'dark';

type Test = [string, string, () => Promise<void>, number, number, ColorScheme];

type Viewport = [number, number];

const VIEWPORTS: Viewport[] = [
  [1440, 900],
  [768, 1024],
  [390, 840],
  [320, 560],
];

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];

describe('visual regression test for', () => {
  let browser: playwright.Browser;
  let page: playwright.Page;

  const tests: Test[] = [];

  const scenarios: Scenario[] = [
    {
      name: 'Login — email login',
      path: `/iframe?id=app-vloginview--default&viewMode=story`,
    },
    {
      name: 'Login — password login',
      path: `/iframe?id=app-vloginview--default&viewMode=story`,
      action: async () => {
        await page.click('[data-testid="to-password-mode"]');
      },
    },
    {
      name: 'Login — reset password',
      path: `/iframe?id=app-vloginresetview--default&viewMode=story`,
    },
    {
      name: 'Login — change password',
      path: `/iframe?id=app-vloginchangeview--default&viewMode=story`,
    },
    {
      name: 'Login — mail sent',
      path: '/iframe?id=app-vmailsentview--default&viewMode=story',
    },
    {
      name: 'Certificates',
      path: `/iframe?id=app-vcertificatesview--default&viewMode=story`,
    },
    {
      name: 'No Certificates',
      path: `/iframe?id=app-vcertificatesview--empty&viewMode=story`,
    },
    {
      name: 'Settings',
      path: `/iframe?id=app-vsettingsview--default&viewMode=story`,
    },
    // {
    //   name: 'Materials',
    //   path: '/iframe?id=app-vnotionview--default&viewMode=story',
    // },
    // {
    //   name: 'Materials Missing',
    //   path: '/iframe?id=app-vnotionview--empty&viewMode=story',
    // },
  ];

  for (const scenario of scenarios) {
    for (const viewport of VIEWPORTS) {
      for (const colorScheme of COLOR_SCHEMES) {
        tests.push([
          `${scenario.name} — ${viewport[0]}×${viewport[1]} ${colorScheme}`,
          scenario.path,
          scenario.action || (async () => {}),
          viewport[0],
          viewport[1],
          colorScheme,
        ]);
      }
    }
  }

  beforeAll(async () => {
    browser = await playwright.chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  let testIndex = 0;

  test.each(tests)(
    '%s',
    async (name, route, action, width, height, colorScheme) => {
      // eslint-disable-next-line no-console
      console.log(`Running test ${++testIndex} of ${tests.length}: ${name}`);
      await page.setViewportSize({ width, height });

      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: 'networkidle',
      });

      if (colorScheme === 'dark') {
        await page.evaluate(() => {
          document.documentElement.classList.add('dark');
        });
        await page.waitForTimeout(100);
      }

      await action();
      const image = await page.screenshot({ fullPage: true });

      expect(image).toMatchImageSnapshot({
        comparisonMethod: 'ssim',
        customDiffConfig: {
          ssim: 'fast',
        },
        failureThreshold: 16 ** 2,
        failureThresholdType: 'pixel',
        storeReceivedOnFailure: true,
        customReceivedPostfix: '',
      });
    },
  );
});
