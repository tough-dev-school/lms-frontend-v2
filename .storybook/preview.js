import '../src/fonts.css';
import '../src/tailwind.css';

import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { routes } from '@/router';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import { createRouter, createWebHistory } from 'vue-router';

const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: [
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
    defaultViewport: 'fluid',
  },
};

setup((app) => {
  app.use(
    createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
    }),
  );
  app.use(FloatingVue);
  app.use(createPinia());
});

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters,
};

export default preview;
