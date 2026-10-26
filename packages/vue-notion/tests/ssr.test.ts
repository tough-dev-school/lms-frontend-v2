// @vitest-environment node
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it, vi } from 'vitest';
import NotionRenderer from '../components/NotionRenderer.vue';
import type { BlockMap } from '../lib/types';
import {
  createBlock,
  createBlockMap,
  createText,
} from './fixtures/createBlockMap';

// The real glightbox touches `document` when it loads, which is what SSR has to survive
vi.unmock('glightbox');

const LinkStub = {
  props: ['href'],
  setup:
    (
      props: { href: string },
      { slots }: { slots: { default?: () => unknown } },
    ) =>
    () =>
      h('a', { href: props.href }, slots.default?.() as never),
};

const renderOnServer = (blockMap: BlockMap) =>
  renderToString(
    createSSRApp({
      render: () =>
        h(NotionRenderer, {
          blockMap,
          fullPage: true,
          mapPageUrl: (id: string) => `/materials/${id}`,
          pageLinkOptions: { component: LinkStub, href: 'href' },
        }),
    }),
  );

describe('server rendering', () => {
  it('renders blocks that use browser APIs on the client', async () => {
    const image = createBlock('image', {
      properties: { source: [['https://example.com/i.png']] },
    });
    const table = createBlock('table', {
      format: { table_block_column_order: ['a'] },
    });
    const row = createBlock('table_row', {
      parent_id: table.id,
      properties: { a: [['Cell']] },
    });
    table.content = [row.id];
    const code = createBlock('code', {
      properties: { title: [['const a = 1;']], language: [['JavaScript']] },
    });
    const { blockMap } = createBlockMap([
      createText('Intro'),
      image,
      table,
      row,
      code,
    ]);

    const html = await renderOnServer(blockMap);

    expect(html).toContain('Intro');
    expect(html).toContain('https://example.com/i.png');
    expect(html).toContain('Cell');
    expect(html).toContain('const a = 1;');
  });
});
