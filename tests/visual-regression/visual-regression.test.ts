import { expect, describe, test, beforeEach } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import playwright from 'playwright';
import { getScenarios, type TestScenario } from './scenarios';
import colorSchemes, { type ColorScheme } from './colorSchemes';
import viewports from './viewports';
import matchConfig from './matchConfig';

expect.extend({ toMatchImageSnapshot });

type Name = string;

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

  const getTests = () => generateTests(getScenarios(page));

  test.each(getTests())('%s', async (name, options) => {
    const { path, action, width, height, colorScheme } = options;
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width, height });
    await goto(path);

    await action();
    const image = await page.screenshot({ fullPage: true });

    expect(image).toMatchImageSnapshot(matchConfig);
  });
});
