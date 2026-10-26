import { fileURLToPath, URL } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        // Components run without a server, tests set page props on the mock
        '@inertiajs/vue3': fileURLToPath(
          new URL('../src/mocks/inertia.ts', import.meta.url),
        ),
      },
    },
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
