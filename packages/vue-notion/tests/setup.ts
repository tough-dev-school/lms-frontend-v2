import { vi } from 'vitest';

// shiki loads WASM and grammars, which jsdom can't do. The stub keeps the
// async contract so tests still have to wait for highlighting.
vi.mock('shiki', () => ({
  codeToHtml: async (code: string, options: { lang: string }) =>
    `<pre class="shiki" data-test-lang="${options.lang}"><code>${code}</code></pre>`,
}));

vi.mock('glightbox', () => ({
  default: vi.fn(() => ({ destroy: vi.fn() })),
}));
