/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:storybook/recommended',
    'plugin:perfectionist/recommended-natural',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  root: true,
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
};
