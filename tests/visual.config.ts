import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from '../vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ['./src/visual-regression.test.ts'],
      testTimeout: 180000,
    },
  }),
);
