import { defineConfig, GLOB_VUE } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: true,
    vue: true,
  },
  {
    files: [GLOB_VUE],
    rules: {
      'import-x/first': 'off',
    },
  },
  {
    files: ['**/*'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
);
