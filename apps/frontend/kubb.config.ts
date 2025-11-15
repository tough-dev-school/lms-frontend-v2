import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginMsw } from '@kubb/plugin-msw';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginClient } from '@kubb/plugin-client';
import { pluginVueQuery } from '@kubb/plugin-vue-query';

const banner = '/* eslint-disable */\n// @ts-nocheck';

export default defineConfig(() => {
  return {
    root: '.',
    input: {
      path: 'http://localhost:8000/api/v2/docs/schema/',
    },
    output: {
      path: './src/api/generated',
      clean: true,
    },
    plugins: [
      pluginOas({
        generators: [],
      }),
      pluginTs({
        output: {
          path: './types',
          banner,
        },
      }),
      pluginClient({
        importPath: '../../client.ts',
        output: {
          path: './clients',
          banner,
        },
      }),
      pluginMsw({
        output: {
          path: './handlers',
          banner,
        },
      }),
      pluginVueQuery({
        client: {
          importPath: '../../client.ts',
        },
        output: {
          path: './hooks',
          banner,
        },
      }),
    ],
  };
});
