import { expect, describe, test, beforeEach } from 'vitest';
import { VIEWPORTS } from './constants/viewports';
import {
  toMatchImageSnapshot,
  type MatchImageSnapshotOptions,
} from 'jest-image-snapshot';
import playwright from 'playwright';

expect.extend({ toMatchImageSnapshot });

const matchConfig = (threshold: number): MatchImageSnapshotOptions => ({
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: threshold,
  failureThresholdType: 'percent',
});

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

type Test = [string, string, Function, number, number, number];

describe('visual regression test for', () => {
  let browser: playwright.Browser;
  let page: playwright.Page;
  let context: playwright.BrowserContext;

  const tests: Test[] = [];

  const scenarios = [
    new VisualTest(
      'LoginView — email login',
      `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
    ),
    new VisualTest(
      'LoginView — password login',
      `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
      async () => {
        await page.click('[data-testid="to-password-mode"]');
      },
    ),
    new VisualTest(
      'ProfileView',
      `/iframe.html?args=&id=pages-app--profile&viewMode=story#/profile`,
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
        viewport.threshold,
      ]);
    });
  });

  beforeEach(async () => {
    browser = await playwright.chromium.launch();
    context = await browser.newContext();
    page = await browser.newPage();
  });

  const goto = (route: string) => {
    return page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'networkidle',
    });
  };

  test.each(tests)(
    '%s',
    async (name, route, action, width, height, threshold) => {
      await page.setViewportSize({ width, height });
      await goto(route);

      await action();
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(matchConfig(threshold));
    },
  );
});
