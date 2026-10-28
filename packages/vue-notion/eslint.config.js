// @ts-check
import { defineConfig } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: {
      typeAware: true,
    },
    vue: true,
    formatter: 'prettier',
    opinionated: false,
    e18e: false,
  },
  {
    name: 'overrides',
    rules: {
      // Component files are PascalCase, like in the app
      'unicorn/filename-case': 'off',
      // Disabled because the config cannot detect the node version
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
);
