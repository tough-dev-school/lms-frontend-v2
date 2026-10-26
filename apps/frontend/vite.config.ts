/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import inertia from '@inertiajs/vite';
import devServer, { defaultOptions } from '@hono/vite-dev-server';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    vue({
      // The SSR compiler drops template comments, keeping them on the client breaks hydration
      template: { compilerOptions: { comments: false } },
    }),
    vueI18n({
      include: [fileURLToPath(new URL('src/locales/**', import.meta.url))],
      // The app ships the runtime-only build, Storybook needs the message compiler
      // to render translations uploaded on the Tools/Translations page
      runtimeOnly: process.env.VUE_I18N_FULL_BUILD !== 'true',
      ssr: true,
    }),
    // ssr: false, the Hono server renders pages itself in the same process
    inertia({ ssr: false }),
    // Bundles dependencies into the server, so the Docker image needs dist/ and Node, without node_modules.
    // Only for builds, inlining every package breaks CommonJS ones in Vitest and the dev server.
    {
      name: 'bundle-server-dependencies',
      apply: 'build',
      config: () => ({ ssr: { noExternal: true } }),
    },
    ...(process.env.VITEST || process.env.STORYBOOK
      ? []
      : [
          devServer({
            entry: 'src/server/index.ts',
            // The page template already loads /@vite/client
            injectClientScript: false,
            exclude: [
              ...defaultOptions.exclude,
              /^\/src\/.+/,
              // Files from public/ and fonts are served by Vite
              /^\/[^/]+\.(svg|png|jpg|ico|webmanifest|txt)$/,
              /\.woff2?$/,
            ],
          }),
        ]),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  // `vite build` builds the client into dist/client, then the server into dist/server
  builder: {},
  build: {
    outDir: 'dist/client',
    manifest: true,
    rollupOptions: { input: 'src/main.ts' },
  },
  environments: {
    ssr: {
      build: {
        outDir: 'dist/server',
        rollupOptions: { input: 'src/server/main.ts' },
      },
    },
  },
  // test: {
  //  go to ./tests/*.config.ts
  // },
});
