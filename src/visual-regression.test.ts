import { expect, describe, test, beforeEach } from 'vitest';
import { VIEWPORTS } from './constants/viewports';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import playwright from 'playwright';
expect.extend({ toMatchImageSnapshot });

interface Scenario {
  name: string;
  path: string;
  action?: () => Promise<void>;
}

type ColorScheme = 'light' | 'dark';

type Test = [string, string, () => Promise<void>, number, number];

const colorScheme = (
  process.env.COLOR_SCHEME ? process.env.COLOR_SCHEME : 'light'
) as ColorScheme;

describe('visual regression test for', () => {
  let browser: playwright.Browser;
  let page: playwright.Page;

  const tests: Test[] = [];

  const scenarios: Scenario[] = [
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

  scenarios.forEach((test) => {
    VIEWPORTS.forEach((viewport) => {
      tests.push([
        `${test.name} — ${viewport.width}×${viewport.height} ${colorScheme}`,
        test.path,
        test.action ? test.action : async () => {},
        viewport.width,
        viewport.height,
      ]);
    });
  });

  beforeEach(async () => {
    browser = await playwright.chromium.launch();
    page = await browser.newPage();
  });

  const goto = (route: string) => {
    return page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'networkidle',
    });
  };

  test.each(tests)('%s', async (name, route, action, width, height) => {
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width, height });
    await goto(route);

    await action();
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot({
      comparisonMethod: 'ssim',
      customDiffConfig: {
        ssim: 'fast',
      },
      failureThreshold: Math.pow(16, 2),
      failureThresholdType: 'pixel',
    });
  });
});
