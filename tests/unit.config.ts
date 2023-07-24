import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';

import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        all: true,
        exclude: ['**/*.stories.ts'],
        extension: ['.ts', '.js', '.vue'],
        include: ['**/*.ts', '**/*.vue'],
        provider: 'istanbul',
        reporter: 'lcov',
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, './src/visual-regression.test.ts'],
      globals: true,
      mockReset: true,
    },
  }),
);
