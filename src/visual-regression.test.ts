import { expect, describe, test, beforeEach } from 'vitest';
import {
  toMatchImageSnapshot,
  type MatchImageSnapshotOptions,
} from 'jest-image-snapshot';
import playwright from 'playwright';

expect.extend({ toMatchImageSnapshot });

const matchConfig: MatchImageSnapshotOptions = {
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: Math.pow(16, 2),
  failureThresholdType: 'pixel',
};

interface TestScenario {
  name: string;
  path: string;
  action?: () => Promise<void>;
}

type Name = string;
type ColorScheme = null | 'light' | 'dark' | 'no-preference';

interface TestOptions {
  path: string;
  action: () => Promise<void>;
  width: number;
  height: number;
  colorScheme: ColorScheme;
}

type Test = [Name, TestOptions];

const generateTests = (scenarios: TestScenario[]) => {
  const tests: Test[] = [];

  scenarios.forEach((scenario) => {
    const viewports = [
      [1440, 900],
      [768, 1024],
      [320, 560],
    ];

    const colorSchemes: ColorScheme[] = ['light', 'dark'];

    viewports.forEach((viewport) => {
      colorSchemes.forEach((colorScheme) => {
        const name = `${test.name} — ${viewport[0]}×${viewport[1]} ${colorScheme}`;
        const { path } = scenario;
        let { action } = scenario;
        action = action ? action : async () => {};
        const [width, height] = viewport;
        tests.push([
          name,
          {
            path,
            action,
            width,
            height,
            colorScheme,
          },
        ]);
      });
    });
  });

  return tests;
};

describe('visual regression test for', () => {
  let browser: playwright.Browser;
  let page: playwright.Page;

  beforeEach(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();
  });

  const goto = (route: string) => {
    return page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'networkidle',
    });
  };

  const scenarios = [
    {
      name: 'Login — email login',
      path: `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
    },
    {
      name: 'Login — password login',
      path: `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
      action: async () => {
        await page.click('[data-testid="to-password-mode"]');
      },
    },
    {
      name: 'Login — reset password',
      path: `/iframe.html?args=&id=pages-app--reset-password&viewMode=story#/login/reset`,
    },
    {
      name: 'Login — change password',
      path: `/iframe.html?args=&id=pages-app--change-password&viewMode=story#/auth/password/reset/1234567890/1234567890`,
    },
    {
      name: 'Settings',
      path: `/iframe.html?args=&id=pages-app--settings&viewMode=story#/settings`,
    },
    {
      name: 'Materials',
      path: '/iframe.html?args=&id=pages-app--notion-view&viewMode=story#/materials/1234567890',
    },
    {
      name: 'Materials Missing',
      path: '/iframe.html?id=pages-app--notion-view-missing&viewMode=story#/materials/1234567890',
    },
    {
      name: 'HomeworkAnswers',
      path: `/iframe.html?args=&id=pages-app--homework-answer-view&viewMode=story#/homework/answers/1234567890`,
    },
    {
      name: 'HomeworkExpert',
      path: '/iframe.html?args=&id=pages-app--homework-expert-view&viewMode=story#/homework/question-admin/1234567890',
    },
    {
      name: 'HomeworkQuestion',
      path: '/iframe.html?args=&id=pages-app--homework-question-view&viewMode=story#/homework/questions/1234567890',
    },
    {
      name: 'Shop',
      path: '/iframe.html?args=&id=pages-app--shop&viewMode=story#/shop',
    },
  ];

  const tests = generateTests(scenarios);

  test.each(tests)('%s', async (name, options) => {
    const { path, action, width, height, colorScheme } = options;
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width, height });
    await goto(path);

    await action();
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot(matchConfig);
  });
});
