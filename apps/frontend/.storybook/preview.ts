import '../src/style.css';
import { setup } from '@storybook/vue3-vite';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { queryClient } from '../src/queryClient';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../src/router';
import type { Preview } from '@storybook/vue3-vite';
import { i18n, isLocale, DEFAULT_LOCALE } from '../src/i18n';
import { useLocale } from '../src/composables/useLocale';
import { applyOverrides } from '../src/i18n/overrides';

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

  // Stories seed the shared query client, and switching stories without a reload
  // (Storybook UI, regression tests) would show data left from the previous one
  beforeEach: () => {
    queryClient.clear();
  },

  decorators: [
    (story, context) => {
      const locale: unknown = context.globals.locale;
      // Goes through useLocale, otherwise the language switcher in stories would override the toolbar with the browser language
      useLocale().locale.value = isLocale(locale) ? locale : DEFAULT_LOCALE;
      return story();
    },
  ],
};

// Translations uploaded on the Tools/Translations page
applyOverrides();

setup((app) => {
  app.use(VueQueryPlugin, {
    queryClient,
  });

  // Create a router instance for Storybook without navigation guards
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);
  app.use(i18n);
});

export default preview;
