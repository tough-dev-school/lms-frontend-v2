/// <reference types="vite/client" />

declare module 'marked';

// Type-aware ESLint runs on plain TypeScript, which cannot resolve .vue files
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent;
  export default component;
}
