import { fileURLToPath, URL } from 'node:url';
import type { StorybookConfig } from '@storybook/vue3-vite';

// Read by vite.config.ts, which Storybook loads after this file
process.env.VUE_I18N_FULL_BUILD = 'true';
// Stories render components alone, without the Hono server around them
process.env.STORYBOOK = 'true';

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
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        // There is no server to answer Inertia requests, stories set page props through parameters.inertia
        '@inertiajs/vue3': fileURLToPath(
          new URL('../src/mocks/inertia.ts', import.meta.url),
        ),
      },
    },
  }),
};
export default config;
