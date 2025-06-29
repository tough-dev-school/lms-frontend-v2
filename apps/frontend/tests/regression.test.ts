import { test, expect, Page } from '@playwright/test';

interface Scenario {
  name: string;
  path: string;
  action?: (context: { page: Page }) => Promise<void>;
}

const VIEWPORTS = [
  [1440, 900],
  [768, 1024],
  [390, 840],
  [320, 560],
] as const;

const COLOR_SCHEMES = ['light', 'dark'] as const;

const scenarios: Scenario[] = [
  {
    name: 'Login — email login',
    path: `/iframe?id=app-vloginview--default&viewMode=story`,
  },
  {
    name: 'Login — password login',
    path: `/iframe?id=app-vloginview--default&viewMode=story`,
    action: async ({ page }) => {
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
  // {
  //   name: 'Materials',
  //   path: '/iframe?id=app-vnotionview--default&viewMode=story',
  // },
  // {
  //   name: 'Materials Missing',
  //   path: '/iframe?id=app-vnotionview--empty&viewMode=story',
  // },
];

for (const scenario of scenarios) {
  for (const [width, height] of VIEWPORTS) {
    for (const colorScheme of COLOR_SCHEMES) {
      const testName = `${scenario.name} — ${width}×${height} ${colorScheme}`;

      test(testName, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(scenario.path, { waitUntil: 'networkidle' });

        if (colorScheme === 'dark') {
          await page.evaluate(() => {
            document.documentElement.classList.add('dark');
          });
          await page.waitForTimeout(100);
        }

        if (scenario.action) {
          await scenario.action({ page });
        }

        const snapshotName = `regression-test-ts-tests-regression-test-ts-visual-regression-test-for-${scenario.name
          .toLowerCase()
          .replace(/\s+/g, '-')}-${width}-${height}-${colorScheme}-1-snap`;
        await expect(page).toHaveScreenshot(snapshotName + '.png', {
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  }
}
