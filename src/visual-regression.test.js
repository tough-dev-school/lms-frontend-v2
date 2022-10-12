import { expect, describe, test, beforeEach } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';

expect.extend({ toMatchImageSnapshot });

const matchConfig = {
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
};

const DESKTOP_VIEWPORT = [1440, 900];
const TABLET_VIEWPORT = [768, 1024];
const MOBILE_VIEWPORT = [320, 560];

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
        `${test.name} — ${viewport[0]}×${viewport[1]}`,
        test.path,
        test.action,
        ...viewport,
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

  test.each(tests)('%s', async (name, route, action, width, height) => {
    await page.setViewport({ width, height });
    await goto(route);

    await action();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(matchConfig);
  });
});
