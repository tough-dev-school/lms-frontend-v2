import { defineConfig } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: true,
    vue: true,
    prettier: true,
    strict: false,
  },
  {
    rules: {
      // Component files are PascalCase, like in the app
      'unicorn/filename-case': 'off',
      // Disabled because the config cannot detect the node version
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
);
