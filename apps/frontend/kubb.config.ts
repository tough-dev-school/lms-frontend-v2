import { defineConfig } from '@kubb/core';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginMsw } from '@kubb/plugin-msw';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginClient } from '@kubb/plugin-client';
import { pluginVueQuery } from '@kubb/plugin-vue-query';
import { pluginFaker } from '@kubb/plugin-faker';

const banner = '/* eslint-disable */\n// @ts-nocheck';

export default defineConfig({
  root: '.',
  input: {
    path: 'http://localhost:8000/api/v2/docs/schema/',
  },
  output: {
    path: './src/api/generated',
    clean: true,
    extension: {
      '.ts': '',
    },
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
      enumType: 'enum',
      enumSuffix: '',
    }),
    pluginClient({
      importPath: '../../client',
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
    pluginFaker({
      output: {
        path: './mocks',
        banner,
      },
      seed: 1337,
    }),
    pluginVueQuery({
      client: {
        importPath: '../../client',
      },
      output: {
        path: './hooks',
        banner,
      },
    }),
  ],
}) as ReturnType<typeof defineConfig>;
