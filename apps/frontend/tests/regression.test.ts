import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { toMatchImageSnapshot } from '@brachkow/vitest-image-snapshot';
import playwright from 'playwright';
import { kebabCase } from 'lodash-es';
// @ts-expect-error vitest-image-snapshot 0.2.0 types snapshotState._counters as public, Vitest 3 has it private. Remove once the library types are fixed
expect.extend({ toMatchImageSnapshot });

interface Scenario {
  name: string;
  storyId: string;
  action?: (page: playwright.Page) => Promise<void>;
}

enum ColorScheme {
  Light = 'light',
  Dark = 'dark',
}

interface Test {
  name: string;
  scenario: Scenario;
  width: number;
  height: number;
  colorScheme: ColorScheme;
}

type Viewport = [number, number];

const VIEWPORTS: Viewport[] = [
  [1440, 900],
  [768, 1024],
  [320, 560],
];

const getColorSchemes = (): ColorScheme[] => {
  const envColorScheme = process.env.COLOR_SCHEME;
  if (
    envColorScheme === ColorScheme.Light ||
    envColorScheme === ColorScheme.Dark
  ) {
    return [envColorScheme];
  }

  return [ColorScheme.Light, ColorScheme.Dark];
};

const COLOR_SCHEMES: ColorScheme[] = getColorSchemes();

// Stories use fixed dates and render them relative to now ("2 года назад"),
// so without a fixed clock snapshots break as time passes
const FIXED_TIME = new Date('2026-01-01T00:00:00Z');

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'http://localhost:3001';

// Each page renders one story at a time, so this is also the test concurrency
const PAGE_COUNT = Number(process.env.REGRESSION_PAGES ?? 4);

const scenarios: Scenario[] = [
  { name: 'Login — email login', storyId: 'app-vloginview--default' },
  {
    name: 'Login — password login',
    storyId: 'app-vloginview--default',
    action: async (page) => {
      await page.click('[data-testid="to-password-mode"]');
    },
  },
  { name: 'Login — reset password', storyId: 'app-vloginresetview--default' },
  { name: 'Login — change password', storyId: 'app-vloginchangeview--default' },
  { name: 'Login — mail sent', storyId: 'app-vmailsentview--default' },
  { name: 'Certificates', storyId: 'app-vcertificatesview--default' },
  { name: 'No Certificates', storyId: 'app-vcertificatesview--empty' },
  { name: 'Settings', storyId: 'app-vsettingsview--default' },
  { name: 'Materials', storyId: 'app-vmaterialview--default' },
  { name: 'Materials Missing', storyId: 'app-vmaterialview--empty' },
  { name: 'Course', storyId: 'app-vcourseview--default' },
  { name: 'No Course Modules', storyId: 'app-vcourseview--empty' },
  {
    name: 'Course Without Extra Info',
    storyId: 'app-vcourseview--without-extra-info',
  },
  { name: 'Module', storyId: 'app-vmoduleview--default' },
  { name: 'No Module Lessons', storyId: 'app-vmoduleview--empty' },
  {
    name: 'Module Without Text',
    storyId: 'app-vmoduleview--without-module-text',
  },
  {
    name: 'Homework Question',
    storyId: 'app-vhomeworkquestionview--default',
  },
  { name: 'Homework Answer', storyId: 'app-vhomeworkanswerview--default' },
  {
    name: 'Homework Answer Other User',
    storyId: 'app-vhomeworkanswerview--other-user-answer',
  },
  {
    name: 'Homework Answer Without CrossChecks',
    storyId: 'app-vhomeworkanswerview--without-cross-checks',
  },
];

// Test names are part of the snapshot file names, so they must not change
const tests: Test[] = scenarios.flatMap((scenario) =>
  VIEWPORTS.flatMap(([width, height]) =>
    COLOR_SCHEMES.map((colorScheme) => ({
      name: `${scenario.name} — ${width}×${height} ${colorScheme}`,
      scenario,
      width,
      height,
      colorScheme,
    })),
  ),
);

// Renders a story through the Storybook channel instead of reloading iframe.html.
// The same story is remounted, otherwise Storybook keeps the previous render and its state
const renderStory = (page: playwright.Page, storyId: string) =>
  page.evaluate(
    (id) =>
      new Promise<void>((resolve, reject) => {
        // @ts-expect-error Storybook sets this global in the preview iframe and does not type it
        const preview = window.__STORYBOOK_PREVIEW__;
        const channel = preview.channel;
        const fail = (event: string) => () => {
          cleanup();
          reject(new Error(`Story ${id} emitted ${event}`));
        };
        const onRendered = (renderedId: string) => {
          if (renderedId !== id) return;
          cleanup();
          resolve();
        };
        const onErrored = fail('storyErrored');
        const onThrew = fail('storyThrewException');
        const onMissing = fail('storyMissing');
        const cleanup = () => {
          channel.off('storyRendered', onRendered);
          channel.off('storyErrored', onErrored);
          channel.off('storyThrewException', onThrew);
          channel.off('storyMissing', onMissing);
        };
        channel.on('storyRendered', onRendered);
        channel.on('storyErrored', onErrored);
        channel.on('storyThrewException', onThrew);
        channel.on('storyMissing', onMissing);

        const currentId = preview.currentRender?.id;
        if (currentId === id) {
          channel.emit('forceRemount', { storyId: id });
        } else {
          channel.emit('setCurrentStory', { storyId: id, viewMode: 'story' });
        }
      }),
    storyId,
  );

// Replaces networkidle: the page is ready once fonts and images are decoded
// and transitions (dark mode switches colors with transition-colors) are over
const waitForStablePage = (page: playwright.Page) =>
  page.evaluate(async () => {
    const nextFrame = () =>
      new Promise((resolve) => requestAnimationFrame(resolve));

    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
    await Promise.all(
      document
        .getAnimations()
        .map((animation) => animation.finished.catch(() => {})),
    );
    await nextFrame();
    await nextFrame();
  });

// Pages are reused across tests, and tests take whichever page is free
const createPagePool = (pages: playwright.Page[]) => {
  const free = [...pages];
  const waiting: ((page: playwright.Page) => void)[] = [];

  const acquire = () =>
    new Promise<playwright.Page>((resolve) => {
      const page = free.pop();
      if (page) {
        resolve(page);
      } else {
        waiting.push(resolve);
      }
    });

  const release = (page: playwright.Page) => {
    const next = waiting.shift();
    if (next) {
      next(page);
    } else {
      free.push(page);
    }
  };

  return { acquire, release };
};

const SUITE_NAME = 'visual regression test for';

// The matcher names files after the current test, but with concurrent tests
// it reads the name of whichever test ran last. This rebuilds its default identifier
// (lodash kebabCase of file, test name and call counter) for the test that actually runs
const getSnapshotIdentifier = (name: string) =>
  `${kebabCase(`regression.test.ts-${SUITE_NAME} ${name}-1`)}-snap`;

describe(SUITE_NAME, () => {
  let browser: playwright.Browser;
  let pool: ReturnType<typeof createPagePool>;

  beforeAll(async () => {
    browser = await playwright.chromium.launch();
    const pages = await Promise.all(
      Array.from({ length: PAGE_COUNT }, async () => {
        const page = await browser.newPage();
        await page.clock.setFixedTime(FIXED_TIME);
        await page.goto(
          `${STORYBOOK_URL}/iframe.html?id=${scenarios[0].storyId}&viewMode=story`,
        );
        await page.waitForFunction(
          // @ts-expect-error Storybook sets this global in the preview iframe and does not type it
          () => window.__STORYBOOK_PREVIEW__?.currentRender,
        );
        return page;
      }),
    );
    pool = createPagePool(pages);
  });

  afterAll(async () => {
    await browser.close();
  });

  let testIndex = 0;

  // A plain loop, because test.each wraps $name in quotes and that would rename snapshots
  tests.forEach(({ name, scenario, width, height, colorScheme }) => {
    // Concurrent tests must assert with their own expect to keep snapshot state apart
    test.concurrent(name, async ({ expect: testExpect }) => {
      const page = await pool.acquire();
      try {
        // eslint-disable-next-line no-console
        console.log(`Running test ${++testIndex} of ${tests.length}: ${name}`);

        // Pages are shared, so the pointer would stay where the previous click left it
        // and hover styles would leak into this screenshot
        await page.mouse.move(0, 0);
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark');
        });
        await page.setViewportSize({ width, height });
        await renderStory(page, scenario.storyId);

        if (colorScheme === ColorScheme.Dark) {
          await page.evaluate(() => {
            document.documentElement.classList.add('dark');
          });
        }

        await scenario.action?.(page);
        await waitForStablePage(page);
        // Transitions can start after the stability checks (e.g. transition-all on cards
        // reacting to the viewport change), so finish them instead of waiting
        const image = await page.screenshot({
          fullPage: true,
          animations: 'disabled',
        });

        testExpect(image).toMatchImageSnapshot({
          customSnapshotIdentifier: getSnapshotIdentifier(name),
          comparisonMethod: 'blazediff',
          // Vitest toMatchScreenshot's default
          customDiffConfig: {
            threshold: 0.1,
          },
          failureThreshold: 16 ** 2,
          failureThresholdType: 'pixel',
          storeReceivedOnFailure: true,
          customReceivedPostfix: '',
        });
      } finally {
        pool.release(page);
      }
    });
  });
});
