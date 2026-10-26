import '../src/style.css';
import { setup } from '@storybook/vue3-vite';
import type { Preview } from '@storybook/vue3-vite';
import { i18n, isLocale, DEFAULT_LOCALE } from '../src/i18n';
import { applyOverrides } from '../src/i18n/overrides';
import type { InertiaParameters } from '../src/mocks/inertia';
import { resetPage, setPage } from '../src/mocks/inertia';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      options: [
        {
          name: 'fluid',
          styles: { width: '100%', height: '100%' },
          type: 'desktop',
        },
        {
          name: 'desktop',
          styles: { width: '1440px', height: '100%' },
          type: 'desktop',
        },
        {
          name: 'tablet',
          styles: { width: '768px', height: '100%' },
          type: 'tablet',
        },
        {
          name: 'mobile',
          styles: { width: '320px', height: '100%' },
          type: 'mobile',
        },
      ],
    },
  },

  globalTypes: {
    locale: {
      description: 'Interface language',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ru', title: 'Русский' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    viewport: {
      value: 'fluid',
      isRotated: false,
    },
    // Regression screenshots are taken in Russian
    locale: DEFAULT_LOCALE,
  },

  // The page mock is shared, and switching stories without a reload
  // (Storybook UI, regression tests) would show props left from the previous one
  beforeEach: ({ parameters }) => {
    resetPage();
    setPage((parameters.inertia ?? {}) as InertiaParameters);
  },

  decorators: [
    (story, context) => {
      const globalLocale: unknown = context.globals.locale;
      const locale = isLocale(globalLocale) ? globalLocale : DEFAULT_LOCALE;
      i18n.global.locale.value = locale;
      document.documentElement.lang = locale;
      setPage({ props: { locale } });
      return story();
    },
  ],
};

// Translations uploaded on the Tools/Translations page
applyOverrides();

setup((app) => {
  app.use(i18n);
});

export default preview;
