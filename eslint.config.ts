import pluginVue from 'eslint-plugin-vue';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import pluginStorybook from 'eslint-plugin-storybook';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfigWithVueTs(
  includeIgnoreFile(gitignorePath),
  vueTsConfigs.recommended,
  pluginVue.configs['flat/recommended'],
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'no-console': 'error',
      'vue/no-required-prop-with-default': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ...pluginVitest.configs.recommended,
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  {
    ...pluginStorybook.configs['flat/recommended'],
    files: ['**/*.stories.ts', '**/*.stories.tsx'],
  },
  skipFormatting,
);
