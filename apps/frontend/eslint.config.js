import { defineConfig, GLOB_VUE } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: true,
    vue: true,
    prettier: true,
    strict: false,
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
            'VLoadingView',
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

      // Disabled because they require more time to fix
      '@typescript-eslint/no-explicit-any': 'off',

      // Changes for eslint-config-fans
      // Disabled for prettier: true
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-closing-bracket-newline': 'off',
      // Disabled because it's a too opinionated stylistic rule
      'vue/define-macros-order': 'off',
      // Disabled because the config cannot detect the node version for some reason
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
);
