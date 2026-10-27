import type { StorybookConfig } from '@storybook/vue3-vite';

// Read by vite.config.ts, which Storybook loads after this file
process.env.VUE_I18N_FULL_BUILD = 'true';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};
export default config;
