import '../src/fonts.css';
import '../src/style.css';
import { setup } from '@storybook/vue3-vite';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { vueQueryConfig } from '../src/main';
import type { Preview } from '@storybook/vue3-vite';

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
}
};

setup((app) => {
  app.use(FloatingVue);
  app.use(createPinia());
  app.use(VueQueryPlugin, vueQueryConfig);
});


export default preview;