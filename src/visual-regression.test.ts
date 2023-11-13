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

type Viewport = [number, number];

const VIEWPORTS: Viewport[] = [
  [1440, 900],
  [768, 1024],
  [320, 560],
];

const COLOR_SCHEME = (
  process.env.COLOR_SCHEME ? process.env.COLOR_SCHEME : 'light'
) as ColorScheme;

describe('visual regression test for', () => {
  let browser: playwright.Browser;
  let page: playwright.Page;

  const tests: Test[] = [];

  const scenarios: Scenario[] = [
    {
      name: 'Login — email login',
      path: `/iframe.html?args=&id=app-vloginview--default&viewMode=story`,
    },
    {
      name: 'Login — password login',
      path: `/iframe.html?args=&id=app-vloginview--default&viewMode=story`,
      action: async () => {
        await page.click('[data-testid="to-password-mode"]');
      },
    },
    {
      name: 'Login — reset password',
      path: `/iframe.html?args=&id=app-vloginresetview--default&viewMode=story`,
    },
    {
      name: 'Login — change password',
      path: `/iframe.html?args=&id=app-vloginchangeview--default&viewMode=story`,
    },
    {
      name: 'Login — mail sent',
      path: '/iframe.html?args=&id=app-vmailsentview--default&viewMode=story',
    },
    {
      name: 'Certificates',
      path: `/iframe.html?args=&id=app-vcertificatesview--default&viewMode=story`,
    },
    {
      name: 'No Certificates',
      path: `/iframe.html?args=&id=app-vcertificatesview--empty&viewMode=story`,
    },
    {
      name: 'Settings',
      path: `/iframe.html?args=&id=app-vsettingsview--default&viewMode=story`,
    },
    {
      name: 'Materials',
      path: '/iframe.html?args=&id=app-vnotionview--default&viewMode=story',
    },
    {
      name: 'Materials Missing',
      path: '/iframe.html?args=&id=app-vnotionview--empty&viewMode=story',
    },
    {
      name: 'HomeworkAnswers',
      path: `/iframe.html?args=&id=app-vhomeworkanswerview--default&viewMode=story`,
    },
    {
      name: 'HomeworkExpert',
      path: '/iframe.html?args=&id=app-vhomeworkexpertview--default&viewMode=story',
    },
    {
      name: 'HomeworkQuestion',
      path: '/iframe.html?args=&id=app-vhomeworkquestionview--default&viewMode=story',
    },
    {
      name: 'Homepage',
      path: '/iframe.html?args=&id=app-vhomeview--default&viewMode=story',
    },
    {
      name: 'Empty Homepage',
      path: '/iframe.html?args=&id=app-vhomeview--empty&viewMode=story',
    },
  ];

  scenarios.forEach((test) => {
    VIEWPORTS.forEach((viewport) => {
      tests.push([
        `${test.name} — ${viewport[0]}×${viewport[1]} ${COLOR_SCHEME}`,
        test.path,
        test.action ? test.action : async () => {},
        viewport[0],
        viewport[1],
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
    await page.emulateMedia({
      colorScheme: COLOR_SCHEME,
      reducedMotion: 'reduce',
    });
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
