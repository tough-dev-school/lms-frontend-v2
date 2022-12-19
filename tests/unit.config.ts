import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      restoreMocks: true,
      environment: 'jsdom',
      exclude: [
        ...configDefaults.exclude,
        './tests/visual-regression/visual-regression.test.ts',
      ],
      coverage: {
        provider: 'istanbul',
        extension: ['.ts', '.js', '.vue'],
        include: ['**/*.ts', '**/*.vue'],
        exclude: ['**/*.stories.ts'],
        all: true,
        reporter: 'lcov',
      },
    },
  }),
);
