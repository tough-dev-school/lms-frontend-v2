import { defineConfig, GLOB_VUE } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: true,
    vue: true,
    prettier: true,
    strict: false,
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
      // Disabled due to legacy code patterns
      'unicorn/filename-case': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      // Disabled because the config cannot detect the node version for some reason
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
);
