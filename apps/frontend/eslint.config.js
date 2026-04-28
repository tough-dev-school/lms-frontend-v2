// @ts-check
import { defineConfig } from 'eslint-config-fans';

export default defineConfig(
  {
    ignores: ['**/generated/**'],
    typescript: {
      // TODO: Enable typeAware when we have a way to fix the issues
      typeAware: false,
    },
    vue: {
      extendUndefComponents: [
        'RouterView',
        'RouterLink',
        'avatar-cropper',
        'VDropdown',
      ],
    },
    formatter: 'prettier',
    opinionated: false,
    // TODO: Enable e18e when we have a way to fix the issues
    e18e: false,
  },
  {
    name: 'overrides',
    rules: {
      // TODO: Careful review is required
      'unicorn/prefer-string-replace-all': 'off',
      // TODO: Enable after updating to latest TypeScript version
      'preserve-caught-error': 'off',
      'unicorn/no-array-sort': 'off',
    },
  },
);
