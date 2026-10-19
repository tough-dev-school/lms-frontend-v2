/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueI18n({
      include: [fileURLToPath(new URL('src/locales/**', import.meta.url))],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  // test: {
  //  go to ./tests/*.config.ts
  // },
});
