import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      restoreMocks: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, './src/visual-regression.test.js'],
    },
  }),
);
