import { expect, describe, test, beforeEach } from 'vitest';
import { VIEWPORTS } from './constants/viewports';
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

class VisualTest {
  name: string;
  path: string;
  action: Function;
  constructor(name: string, path: string, action = () => {}) {
    this.name = name;
    this.path = path;
    this.action = action;
  }
}

type Test = [string, string, Function, number, number];

describe('visual regression test for', () => {
  let browser: playwright.Browser;
  let page: playwright.Page;

  const tests: Test[] = [];

  const scenarios = [
    new VisualTest(
      'Login — email login',
      `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
    ),
    new VisualTest(
      'Login — password login',
      `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
      async () => {
        await page.click('[data-testid="to-password-mode"]');
      },
    ),
    new VisualTest(
      'Login — reset password',
      `/iframe.html?args=&id=pages-app--reset-password&viewMode=story#/login/reset`,
    ),
    new VisualTest(
      'Login — change password',
      `/iframe.html?args=&id=pages-app--change-password&viewMode=story#/auth/password/reset/1234567890/1234567890`,
    ),
    new VisualTest(
      'Settings',
      `/iframe.html?args=&id=pages-app--settings&viewMode=story#/settings`,
    ),
    new VisualTest(
      'Materials',
      '/iframe.html?args=&id=pages-app--notion-view&viewMode=story#/materials/1234567890',
    ),
    new VisualTest(
      'Materials Missing',
      '/iframe.html?id=pages-app--notion-view-missing&viewMode=story#/materials/1234567890',
    ),
    new VisualTest(
      'HomeworkAnswers',
      `/iframe.html?args=&id=pages-app--homework-answer-view&viewMode=story#/homework/answers/1234567890`,
    ),
    new VisualTest(
      'HomeworkExpert',
      '/iframe.html?args=&id=pages-app--homework-expert-view&viewMode=story#/homework/question-admin/1234567890',
    ),
    new VisualTest(
      'HomeworkQuestion',
      '/iframe.html?args=&id=pages-app--homework-question-view&viewMode=story#/homework/questions/1234567890',
    ),
    new VisualTest(
      'Shop',
      '/iframe.html?args=&id=pages-app--shop&viewMode=story#/shop',
    ),
  ];

  scenarios.forEach((test) => {
    VIEWPORTS.forEach((viewport) => {
      tests.push([
        `${test.name} — ${viewport.width}×${viewport.height}`,
        test.path,
        test.action,
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
    await page.setViewportSize({ width, height });
    await goto(route);

    await action();
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot(matchConfig);
  });
});
