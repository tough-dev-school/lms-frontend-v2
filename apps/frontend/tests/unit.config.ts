import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      mockReset: true,
      environment: 'jsdom',
      setupFiles: ['./tests/unit.setup.ts'],
      exclude: [...configDefaults.exclude, './tests/regression.test.ts'],
      coverage: {
        provider: 'istanbul',
        include: ['**/*.ts', '**/*.vue'],
        exclude: ['**/*.stories.ts'],
        reporter: 'lcov',
      },
    },
  }),
);
