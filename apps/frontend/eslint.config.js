import { defineConfig, GLOB_SRC_EXT } from 'eslint-config-fans';

export default defineConfig(
  {
    typescript: true,
    vue: true,
    prettier: true,
  },
  {
    files: [GLOB_SRC_EXT],
    rules: {
      'prettier/prettier': ['warn', { usePrettierrc: true }],
    },
  },
);
