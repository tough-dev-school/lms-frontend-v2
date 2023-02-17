const { mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ['../public'],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: { '@': `${path.resolve(__dirname, '/src')}` },
      },
    });
  },
};
