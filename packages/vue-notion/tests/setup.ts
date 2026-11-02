import { cleanup } from '@testing-library/vue';
import { afterEach, vi } from 'vitest';

// Testing Library registers cleanup on its own only when vitest globals are enabled
afterEach(cleanup);

// shiki loads WASM and grammars, which jsdom can't do. The stub keeps the
// async contract so tests still have to wait for highlighting.
vi.mock('shiki', () => ({
  codeToHtml: (code: string, options: { lang: string }) =>
    Promise.resolve(
      `<pre class="shiki" data-test-lang="${options.lang}"><code>${code}</code></pre>`,
    ),
}));

vi.mock('glightbox', () => ({
  default: vi.fn(() => ({ destroy: vi.fn() })),
}));
