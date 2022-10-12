import { expect, describe, test, beforeEach } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';

expect.extend({ toMatchImageSnapshot });

const matchConfig = {
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
};

describe('visual regression test', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    page.setViewport({ width: 1440, height: 900 });
  });

  const goto = (route) => {
    return page.goto(`http://localhost:3000${route}`, {
      waitUntil: 'networkidle0',
    });
  };

  test('LoginView — email login', async () => {
    await goto(`/iframe.html?args=&id=pages-app--login&viewMode=story#/login`);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(matchConfig);
  });

  test('LoginView — password login', async () => {
    await goto(`/iframe.html?args=&id=pages-app--login&viewMode=story#/login`);

    await page.click('[data-testid="to-password-mode"]');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(matchConfig);
  });

  test('ProfileView', async () => {
    await goto(
      `/iframe.html?args=&id=pages-app--profile&viewMode=story#/profile`,
    );

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(matchConfig);
  });
});
