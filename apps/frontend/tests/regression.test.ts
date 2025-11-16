import { describe, beforeEach, expect, test } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import playwright from 'playwright';
expect.extend({ toMatchImageSnapshot });

interface Scenario {
  name: string;
  path: string;
  action?: () => Promise<void>;
}

enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

type Test = [string, string, () => Promise<void>, number, number, ColorScheme];

type Viewport = [number, number];

const VIEWPORTS: Viewport[] = [
  [1440, 900],
  [768, 1024],
  [320, 560],
];

const getColorSchemes = (): ColorScheme[] => {
  const envColorScheme = process.env.COLOR_SCHEME;
  if (
    envColorScheme === ColorScheme.Light ||
    envColorScheme === ColorScheme.Dark
  ) {
    return [envColorScheme];
  }

  return [ColorScheme.Light, ColorScheme.Dark];
};

const COLOR_SCHEMES: ColorScheme[] = getColorSchemes();

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
    {
      name: 'Materials',
      path: '/iframe?id=app-vnotionview--default&viewMode=story',
    },
    {
      name: 'Materials Missing',
      path: '/iframe?id=app-vnotionview--empty&viewMode=story',
    },
    {
      name: 'Course',
      path: '/iframe?id=app-vcourseview--default&viewMode=story',
    },
    {
      name: 'No Course Modules',
      path: '/iframe?id=app-vcourseview--empty&viewMode=story',
    },
    {
      name: 'Course Without Extra Info',
      path: '/iframe?id=app-vcourseview--without-extra-info&viewMode=story',
    },
    {
      name: 'Module',
      path: '/iframe?id=app-vmoduleview--default&viewMode=story',
    },
    {
      name: 'No Module Lessons',
      path: '/iframe?id=app-vmoduleview--empty&viewMode=story',
    },
    {
      name: 'Module Without Text',
      path: '/iframe?id=app-vmoduleview--without-module-text&viewMode=story',
    },
    {
      name: 'Homework Question',
      path: '/iframe?id=app-vhomeworkquestionview--default&viewMode=story',
    },
    {
      name: 'Homework Answer',
      path: '/iframe?id=app-vhomeworkanswerview--default&viewMode=story',
    },
    {
      name: 'Homework Answer Other User',
      path: '/iframe?id=app-vhomeworkanswerview--other-user-answer&viewMode=story',
    },
    {
      name: 'Homework Answer Without CrossChecks',
      path: '/iframe?id=app-vhomeworkanswerview--without-cross-checks&viewMode=story',
    },
  ];

  scenarios.forEach((scenario) => {
    VIEWPORTS.forEach((viewport) => {
      COLOR_SCHEMES.forEach((colorScheme) => {
        tests.push([
          `${scenario.name} — ${viewport[0]}×${viewport[1]} ${colorScheme}`,
          scenario.path,
          scenario.action || (async () => {}),
          viewport[0],
          viewport[1],
          colorScheme,
        ]);
      });
    });
  });

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

      await page.goto(`http://localhost:3001${route}`, {
        waitUntil: 'networkidle',
      });

      if (colorScheme === ColorScheme.Dark) {
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
