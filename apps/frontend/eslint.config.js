// @ts-check
import { defineConfig, GLOB_VUE } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: {
      // TODO: Enable typeAware when we have a way to fix the issues
      typeAware: false,
    },
    vue: true,
    formatter: 'prettier',
    opinionated: false,
    // TODO: Enable e18e when we have a way to fix the issues
    e18e: false,
  },
  {
    ignores: ['**/generated/**'],
  },
  {
    files: [GLOB_VUE],
    rules: {
      'vue/no-undef-components': [
        'error',
        {
          ignorePatterns: [
            'RouterView',
            'RouterLink',
            'avatar-cropper',
            'VDropdown',
          ],
        },
      ],
    },
  },
  {
    rules: {
      // TODO: Careful review is required
      'unicorn/prefer-string-replace-all': 'off',
      // TODO: Enable after updating to latest TypeScript version
      'preserve-caught-error': 'off',
      'unicorn/no-array-sort': 'off',
    },
  },
);
