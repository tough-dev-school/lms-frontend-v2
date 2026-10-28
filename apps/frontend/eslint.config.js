// @ts-check
import { defineConfig, GLOB_VUE } from 'eslint-config-fans';
import vueI18n from '@intlify/eslint-plugin-vue-i18n';
import jsoncParser from 'jsonc-eslint-parser';

const LOCALE_FILES = ['src/locales/*.json'];

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
        'i18n-t',
      ],
    },
    formatter: 'prettier',
    opinionated: false,
    // TODO: Enable e18e when we have a way to fix the issues
    e18e: false,
  },
  {
    plugins: { '@intlify/vue-i18n': vueI18n },
    settings: {
      'vue-i18n': {
        localeDir: LOCALE_FILES[0],
        messageSyntaxVersion: '^11.0.0',
      },
    },
  },
  {
    files: [GLOB_VUE, 'src/**/*.ts'],
    ignores: ['**/*.stories.ts', '**/*.test.ts', '**/mocks/**'],
    rules: {
      '@intlify/vue-i18n/no-raw-text': [
        'error',
        {
          // Punctuation around interpolations and brand names stay the same in every language
          ignorePattern: String.raw`^[-–—:;,.!?/()|←→×+…\s]+$`,
          ignoreText: ['Google', 'iOS', 'tough-dev.school'],
        },
      ],
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-deprecated-tc': 'error',
    },
  },
  {
    files: LOCALE_FILES,
    languageOptions: { parser: jsoncParser },
    rules: {
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        { src: './src', extensions: ['.ts', '.vue'] },
      ],
      '@intlify/vue-i18n/no-html-messages': 'error',
      '@intlify/vue-i18n/valid-message-syntax': 'error',
    },
  },
  {
    name: 'overrides',
    rules: {
      // TODO: Careful review is required
      // TODO: Enable after updating to latest TypeScript version
      // Disabled because the config cannot detect the node version
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },
);
