import { expect, describe, test, beforeEach } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';

expect.extend({ toMatchImageSnapshot });

const matchConfig = (threshold) => ({
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: threshold,
  failureThresholdType: 'percent',
});

const DESKTOP_VIEWPORT = { width: 1440, height: 900, threshold: 0.03 };
const TABLET_VIEWPORT = { width: 768, height: 1024, threshold: 0.05 };
const MOBILE_VIEWPORT = { width: 320, height: 560, threshold: 0.08 };

class VisualTest {
  constructor(name, path, action = () => {}) {
    this.name = name;
    this.path = path;
    this.action = action;
  }
}

describe('visual regression test for', () => {
  let browser;
  let page;

  let tests = [];

  [
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
  ].forEach((test) => {
    [DESKTOP_VIEWPORT, TABLET_VIEWPORT, MOBILE_VIEWPORT].forEach((viewport) => {
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
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  const goto = (route) => {
    return page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'networkidle0',
    });
  };

  test.each(tests)(
    '%s',
    async (name, route, action, width, height, threshold) => {
      await page.setViewport({ width, height });
      await goto(route);

      await action();
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(matchConfig(threshold));
    },
  );
});
