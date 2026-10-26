import { faker } from '@faker-js/faker';
import { cleanup, render, screen } from '@testing-library/vue';
import { flushPromises } from '@vue/test-utils';
import GLightbox from 'glightbox';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NotionRenderer from '../components/NotionRenderer.vue';
import {
  createBlock,
  createBlockMap,
  createText,
  dashless,
} from './fixtures/createBlockMap';

const RouterLinkStub = {
  props: ['to'],
  template: '<a :data-to="to"><slot /></a>',
};

const renderNotion = async (props: Record<string, unknown>) => {
  const result = render(NotionRenderer, {
    props,
    global: { stubs: { RouterLink: RouterLinkStub } },
  });
  await flushPromises();
  await flushPromises();
  return result;
};

const getBlock = (container: Element, id: string) =>
  container.querySelector(`[id="${dashless(id)}"]`);

describe('NotionRenderer', () => {
  describe('page', () => {
    it('renders the page title inside .notion when fullPage is set', async () => {
      const title = faker.lorem.words(3);
      const { blockMap } = createBlockMap([], {
        properties: { title: [[title]] },
      });

      const { container } = await renderNotion({ blockMap, fullPage: true });

      expect(
        container.querySelector('div.notion main.notion-page'),
      ).not.toBeNull();
      expect(container.querySelector('.notion-title')).toHaveProperty(
        'textContent',
        title,
      );
    });

    it('renders only a main.notion wrapper without fullPage', async () => {
      const { blockMap } = createBlockMap([createText()]);

      const { container } = await renderNotion({ blockMap });

      expect(container.querySelector('main.notion')).not.toBeNull();
      expect(container.querySelector('.notion-title')).toBeNull();
    });

    it('renders a page cover with object position', async () => {
      const { blockMap } = createBlockMap([], {
        format: {
          page_cover: 'https://example.com/c.jpg',
          page_cover_position: 0.25,
        },
      });

      const { container } = await renderNotion({ blockMap, fullPage: true });

      const cover =
        container.querySelector<HTMLImageElement>('.notion-page-cover');
      expect(cover?.style.objectPosition).toBe('center 75%');
    });

    it('renders an emoji icon', async () => {
      const { blockMap } = createBlockMap([], { format: { page_icon: '🚁' } });

      await renderNotion({ blockMap, fullPage: true });

      expect(screen.getByRole('img', { name: '🚁' })).toHaveProperty(
        'className',
        'notion-emoji notion-page-icon-cover',
      );
    });
  });

  describe('block wrappers', () => {
    it('puts a dashless id and data-block-type on each child block', async () => {
      const text = createText();
      const { blockMap } = createBlockMap([text]);

      const { container } = await renderNotion({ blockMap });

      const block = getBlock(container, text.id);
      expect(block?.getAttribute('data-block-type')).toBe('text');
      expect(block?.classList.contains('notion-text')).toBe(true);
    });

    it('indents blocks deeper than level 1', async () => {
      const toggle = createBlock('toggle', { properties: { title: [['t']] } });
      const child = createText();
      child.parent_id = toggle.id;
      toggle.content = [child.id];
      const { blockMap } = createBlockMap([toggle, child]);

      const { container } = await renderNotion({ blockMap });

      expect(
        (getBlock(container, child.id) as HTMLElement).style.paddingLeft,
      ).toBe('20px');
      expect(
        (getBlock(container, toggle.id) as HTMLElement).style.paddingLeft,
      ).toBe('');
    });

    it('does not leak block props as HTML attributes', async () => {
      const text = createBlock('text', {
        properties: { title: [['c']] },
        format: { block_color: 'red' },
      });
      const { blockMap } = createBlockMap([text]);

      const { container } = await renderNotion({ blockMap });

      expect(getBlock(container, text.id)?.hasAttribute('format')).toBe(false);
    });

    it('renders a placeholder for unknown block types', async () => {
      const { blockMap } = createBlockMap([createBlock('mystery')]);

      await renderNotion({ blockMap });

      expect(
        screen.getByText('Block type not implemented: mystery'),
      ).toBeDefined();
    });

    it('renders a placeholder for types in hideList', async () => {
      const { blockMap } = createBlockMap([createBlock('divider')]);

      const { container } = await renderNotion({
        blockMap,
        hideList: ['divider'],
      });

      expect(container.querySelector('hr')).toBeNull();
      expect(
        screen.getByText('Block type not implemented: divider'),
      ).toBeDefined();
    });

    it('renders without Vue warnings', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const header = createBlock('header', { properties: { title: [['H']] } });
      const { blockMap } = createBlockMap([
        createBlock('table_of_contents'),
        header,
        createBlock('column_list'),
      ]);

      await renderNotion({ blockMap });

      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('text', () => {
    it('renders headers as h1, h2 and h3', async () => {
      const { blockMap } = createBlockMap([
        createBlock('header', { properties: { title: [['One']] } }),
        createBlock('sub_header', { properties: { title: [['Two']] } }),
        createBlock('sub_sub_header', { properties: { title: [['Three']] } }),
      ]);

      await renderNotion({ blockMap });

      expect(
        screen.getByRole('heading', { level: 1, name: 'One' }),
      ).toBeDefined();
      expect(
        screen.getByRole('heading', { level: 2, name: 'Two' }),
      ).toBeDefined();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Three' }),
      ).toBeDefined();
    });

    it('applies the block color class', async () => {
      const text = createBlock('text', {
        properties: { title: [['c']] },
        format: { block_color: 'red' },
      });
      const { blockMap } = createBlockMap([text]);

      const { container } = await renderNotion({ blockMap });

      expect(getBlock(container, text.id)?.className).toBe(
        'notion-text notion-red',
      );
    });

    it.each([
      ['b', 'b'],
      ['i', 'em'],
      ['s', 's'],
      ['c', 'code.notion-inline-code'],
    ])('renders the %s decoration as %s', async (key, selector) => {
      const word = faker.lorem.word();
      const { blockMap } = createBlockMap([
        createBlock('text', { properties: { title: [[word, [[key]]]] } }),
      ]);

      const { container } = await renderNotion({ blockMap });

      expect(container.querySelector(selector)?.textContent).toBe(word);
    });

    it('nests stacked decorations', async () => {
      const { blockMap } = createBlockMap([
        createBlock('text', { properties: { title: [['x', [['b'], ['i']]]] } }),
      ]);

      const { container } = await renderNotion({ blockMap });

      expect(container.querySelector('b > em')?.textContent).toBe('x');
    });

    it('renders highlight as a notion color class', async () => {
      const { blockMap } = createBlockMap([
        createBlock('text', {
          properties: { title: [['x', [['h', 'blue']]]] },
        }),
      ]);

      const { container } = await renderNotion({ blockMap });

      expect(container.querySelector('span.notion-blue')?.textContent).toBe(
        'x',
      );
    });

    it('renders an inline equation as code without katex', async () => {
      const { blockMap } = createBlockMap([
        createBlock('text', { properties: { title: [['⁍', [['e', 'x^2']]]] } }),
      ]);

      const { container } = await renderNotion({ blockMap });

      expect(
        container.querySelector('code.notion-inline-code')?.textContent?.trim(),
      ).toBe('x^2');
    });

    it('renders inline and block equations with katex-element when katex is set', async () => {
      const { blockMap } = createBlockMap([
        createBlock('text', { properties: { title: [['⁍', [['e', 'x^2']]]] } }),
        createBlock('equation', { properties: { title: [['E=mc^2']] } }),
      ]);

      const { container } = render(NotionRenderer, {
        props: { blockMap, katex: true },
        global: {
          components: {
            'katex-element': {
              props: ['expression'],
              template: '<span class="katex">{{ expression }}</span>',
            },
          },
        },
      });
      await flushPromises();

      expect(
        Array.from(
          container.querySelectorAll('.katex'),
          (el) => el.textContent,
        ),
      ).toEqual(['x^2', 'E=mc^2']);
    });

    it('renders children of a blank text block', async () => {
      const blank = createBlock('text');
      const child = createText('nested');
      child.parent_id = blank.id;
      blank.content = [child.id];
      const { blockMap } = createBlockMap([blank, child]);

      const { container } = await renderNotion({ blockMap });

      expect(
        getBlock(container, blank.id)?.classList.contains('notion-blank'),
      ).toBe(true);
      expect(screen.getByText('nested')).toBeDefined();
    });
  });

  describe('links', () => {
    it('opens external links in a new tab', async () => {
      const { blockMap } = createBlockMap([
        createBlock('text', {
          properties: { title: [['site', [['a', 'https://example.com']]]] },
        }),
      ]);

      await renderNotion({ blockMap });

      const link = screen.getByRole('link', { name: 'site' });
      expect(link.getAttribute('href')).toBe('https://example.com');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('maps inline page links through mapPageUrl', async () => {
      const { blockMap } = createBlockMap([
        createBlock('text', {
          properties: { title: [['doc', [['a', '/abc']]]] },
        }),
      ]);

      await renderNotion({ blockMap, mapPageUrl: (id: string) => `/m/${id}` });

      expect(
        screen.getByRole('link', { name: 'doc' }).getAttribute('href'),
      ).toBe('/m/abc');
    });

    it('renders a mention with the linked page title', async () => {
      const subpage = createBlock('page', {
        properties: { title: [['Linked']] },
      });
      const { blockMap } = createBlockMap([
        createBlock('text', {
          properties: { title: [['‣', [['p', subpage.id]]]] },
        }),
      ]);
      blockMap[subpage.id] = { value: subpage };

      await renderNotion({ blockMap });

      expect(
        screen.getByRole('link', { name: 'Linked' }).getAttribute('href'),
      ).toBe(`/${dashless(subpage.id)}`);
    });

    it('renders page links with pageLinkOptions component', async () => {
      const subpage = createBlock('page', { properties: { title: [['Sub']] } });
      const { blockMap } = createBlockMap([subpage]);

      const { container } = await renderNotion({
        blockMap,
        mapPageUrl: (id: string) => `/materials/${id}`,
        pageLinkOptions: { component: 'RouterLink', href: 'to' },
      });

      const link = container.querySelector('.notion-page-link');
      expect(link?.getAttribute('data-to')).toBe(`/materials/${subpage.id}`);
      expect(link?.textContent).toContain('Sub');
    });

    it('keeps the default target for nested page links', async () => {
      const subpage = createBlock('page', { properties: { title: [['Sub']] } });
      const { blockMap } = createBlockMap([subpage]);

      const { container } = await renderNotion({
        blockMap,
        pageLinkTarget: '_top',
      });

      expect(
        container.querySelector('a.notion-page-link')?.getAttribute('target'),
      ).toBe('_self');
    });
  });

  describe('lists', () => {
    it('numbers a numbered list by its position in the group', async () => {
      const items = [
        createBlock('numbered_list', { properties: { title: [['a']] } }),
        createBlock('numbered_list', { properties: { title: [['b']] } }),
      ];
      const { blockMap } = createBlockMap(items);

      const { container } = await renderNotion({ blockMap });

      expect(getBlock(container, items[1].id)?.getAttribute('start')).toBe('2');
    });

    it('nests a child item of the same type into the parent list', async () => {
      const parent = createBlock('bulleted_list', {
        properties: { title: [['p']] },
      });
      const child = createBlock('bulleted_list', {
        parent_id: parent.id,
        properties: { title: [['c']] },
      });
      parent.content = [child.id];
      const { blockMap } = createBlockMap([parent, child]);

      const { container } = await renderNotion({ blockMap });

      const nested = getBlock(container, parent.id)?.querySelector(
        'ul.notion-list-disc',
      );
      expect(nested?.textContent).toContain('c');
      expect(getBlock(container, child.id)?.tagName).toBe('SPAN');
    });
  });

  describe('table of contents', () => {
    it('nests sub headers under headers', async () => {
      const h1 = createBlock('header', { properties: { title: [['Top']] } });
      const h2 = createBlock('sub_header', {
        properties: { title: [['Inner']] },
      });
      const h1b = createBlock('header', { properties: { title: [['Next']] } });
      const { blockMap } = createBlockMap([
        createBlock('table_of_contents'),
        h1,
        h2,
        h1b,
      ]);

      const { container } = await renderNotion({ blockMap });

      const toc = container.querySelector('.notion-table-of-contents');
      const topItems = [...(toc?.children ?? [])].filter(
        (el) => el.tagName === 'LI',
      );
      expect(topItems).toHaveLength(2);
      expect(
        topItems[0]
          .querySelector('ul')
          ?.querySelector('a')
          ?.getAttribute('href'),
      ).toBe(`#${dashless(h2.id)}`);
    });
  });

  describe('todo', () => {
    it('renders a disabled checkbox that reflects the checked state', async () => {
      const done = createBlock('to_do', {
        properties: { title: [['Done']], checked: [['Yes']] },
      });
      const open = createBlock('to_do', { properties: { title: [['Open']] } });
      const { blockMap } = createBlockMap([done, open]);

      const { container } = await renderNotion({ blockMap });

      const [doneBox, openBox] = container.querySelectorAll<HTMLInputElement>(
        '.notion-checkbox-wrapper input',
      );
      expect(doneBox.disabled).toBe(true);
      expect(doneBox.checked).toBe(true);
      expect(openBox.checked).toBe(false);
      expect(
        screen.getByText('Done').closest('.notion-to-do-checked'),
      ).not.toBeNull();
    });

    it('renders the first image child once, as a figure', async () => {
      const todo = createBlock('to_do', { properties: { title: [['t']] } });
      const image = createBlock('image', {
        parent_id: todo.id,
        properties: { source: [['https://example.com/i.png']] },
      });
      const text = createText('after');
      text.parent_id = todo.id;
      todo.content = [image.id, text.id];
      const { blockMap } = createBlockMap([todo, image, text]);

      const { container } = await renderNotion({ blockMap });

      expect(container.querySelectorAll('img.notion-image-inset')).toHaveLength(
        1,
      );
      expect(screen.getByText('after')).toBeDefined();
    });
  });

  describe('table', () => {
    it('orders cells by column order and marks headers', async () => {
      const table = createBlock('table', {
        format: {
          table_block_column_order: ['b', 'a'],
          table_block_row_header: true,
        },
      });
      const row = createBlock('table_row', {
        parent_id: table.id,
        properties: { a: [['A']], b: [['B']] },
      });
      table.content = [row.id];
      const { blockMap } = createBlockMap([table, row]);

      const { container } = await renderNotion({ blockMap });

      const cells = container.querySelectorAll('td');
      expect(Array.from(cells, (c) => c.textContent)).toEqual(['B', 'A']);
      expect(
        cells[0].querySelector('.notion-simple-table-header'),
      ).not.toBeNull();
      expect(cells[1].querySelector('.notion-simple-table-header')).toBeNull();
    });

    describe('full table dialog', () => {
      const createTable = () => {
        const table = createBlock('table', {
          format: { table_block_column_order: ['a'] },
        });
        const row = createBlock('table_row', {
          parent_id: table.id,
          properties: { a: [['Cell']] },
        });
        table.content = [row.id];
        return createBlockMap([table, row]).blockMap;
      };

      // jsdom has no layout, so widths are 0 unless faked
      const fakeTableWidth = (scrollWidth: number) => {
        vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(
          scrollWidth,
        );
        vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(
          500,
        );
      };

      // jsdom doesn't implement modal dialogs
      beforeEach(() => {
        HTMLDialogElement.prototype.showModal = function () {
          this.setAttribute('open', '');
        };
        HTMLDialogElement.prototype.close = function () {
          this.removeAttribute('open');
          this.dispatchEvent(new Event('close'));
        };
      });

      afterEach(() => {
        // Vitest globals are off, so testing-library won't unmount on its own
        cleanup();
        vi.restoreAllMocks();
      });

      type Queries = Awaited<ReturnType<typeof renderNotion>>;
      const getOpenButton = (queries: Queries) =>
        queries.queryByRole('button', { name: 'Открыть таблицу целиком' });
      // Hidden from the a11y tree because jsdom's dialog stub has no top layer
      const getCloseButton = (queries: Queries) =>
        queries.getByRole('button', { name: 'Закрыть', hidden: true });

      it('hides the open button when the table fits', async () => {
        fakeTableWidth(500);

        const queries = await renderNotion({ blockMap: createTable() });

        expect(getOpenButton(queries)).toBeNull();
      });

      it('opens the table in a modal dialog', async () => {
        fakeTableWidth(1000);
        const queries = await renderNotion({ blockMap: createTable() });

        getOpenButton(queries)?.click();
        await flushPromises();

        const dialog = queries.container.querySelector('dialog');
        expect(dialog?.open).toBe(true);
        expect(dialog?.querySelector('td')?.textContent).toBe('Cell');
      });

      it('removes the dialog after closing', async () => {
        fakeTableWidth(1000);
        const queries = await renderNotion({ blockMap: createTable() });
        getOpenButton(queries)?.click();
        await flushPromises();

        getCloseButton(queries).click();
        await flushPromises();

        expect(queries.container.querySelector('dialog')).toBeNull();
      });
    });
  });

  describe('code', () => {
    it('highlights code after mount and maps plain text to text', async () => {
      const { blockMap } = createBlockMap([
        createBlock('code', {
          properties: { title: [['hello']], language: [['Plain Text']] },
        }),
      ]);

      const { container } = await renderNotion({ blockMap });

      const pre = container.querySelector('pre.NotionCode');
      expect(pre?.getAttribute('data-lang')).toBe('plain text');
      expect(pre?.querySelector('.shiki')?.getAttribute('data-test-lang')).toBe(
        'text',
      );
    });

    it('renders a block equation as latex code without katex', async () => {
      const { blockMap } = createBlockMap([
        createBlock('equation', { properties: { title: [['E=mc^2']] } }),
      ]);

      const { container } = await renderNotion({ blockMap });

      expect(
        container.querySelector('pre.NotionCode')?.getAttribute('data-lang'),
      ).toBe('latex');
    });
  });

  describe('media', () => {
    it('sets up a lightbox for each image and destroys it on unmount', async () => {
      const image = createBlock('image', {
        properties: {
          source: [['https://example.com/i.png']],
          caption: [['Moon']],
        },
      });
      const { blockMap } = createBlockMap([image]);

      const { unmount } = await renderNotion({ blockMap });
      const instance = vi.mocked(GLightbox).mock.results.at(-1)?.value;
      unmount();

      expect(GLightbox).toHaveBeenCalledWith(
        expect.objectContaining({ selector: `[data-lightbox="${image.id}"]` }),
      );
      expect(instance.destroy).toHaveBeenCalled();
    });

    it('renders an image caption and alt text', async () => {
      const image = createBlock('image', {
        properties: {
          source: [['https://example.com/i.png']],
          caption: [['Moon']],
        },
      });
      const { blockMap } = createBlockMap([image]);

      await renderNotion({ blockMap });

      expect(screen.getByRole('img', { name: 'Moon' })).toBeDefined();
      expect(screen.getByText('Moon').closest('figcaption')).not.toBeNull();
    });

    it('does not crash on an image without source', async () => {
      const { blockMap } = createBlockMap([
        createBlock('image', { properties: {} }),
      ]);

      const { container } = await renderNotion({ blockMap });

      expect(container.querySelector('img.notion-image-inset')).not.toBeNull();
    });

    it('renders embeds as an iframe with an aspect ratio', async () => {
      const { blockMap } = createBlockMap([
        createBlock('embed', {
          format: {
            display_source: 'https://example.com/e',
            block_aspect_ratio: 0.5,
          },
        }),
      ]);

      const { container } = await renderNotion({ blockMap });

      const iframe = container.querySelector('iframe');
      expect(iframe?.getAttribute('src')).toBe('https://example.com/e');
      expect(iframe?.getAttribute('allow')).toBe('fullscreen');
      expect((iframe?.parentElement as HTMLElement).style.paddingBottom).toBe(
        '50%',
      );
    });
  });

  describe('synced blocks', () => {
    it('renders the content a sync reference points to', async () => {
      const container = createBlock('transclusion_container');
      const child = createText('synced');
      child.parent_id = container.id;
      container.content = [child.id];
      const reference = createBlock('transclusion_reference', {
        format: { transclusion_reference_pointer: { id: container.id } },
      });
      const { blockMap } = createBlockMap([container, child, reference]);

      await renderNotion({ blockMap });

      expect(screen.getAllByText('synced')).toHaveLength(2);
    });
  });

  describe('columns', () => {
    // jsdom drops calc() widths, so the width itself is covered only by the
    // visual regression tests of the app
    it('renders a column followed by a spacer', async () => {
      const list = createBlock('column_list');
      const column = createBlock('column', {
        parent_id: list.id,
        format: { column_ratio: 0.5 },
      });
      list.content = [column.id];
      const { blockMap } = createBlockMap([list, column]);

      const { container } = await renderNotion({ blockMap });

      const spacer =
        container.querySelector('.notion-column')?.nextElementSibling;
      expect(spacer?.className).toBe('notion-spacer');
      expect((spacer as HTMLElement).style.width).toBe('20px');
    });
  });

  describe('events', () => {
    let observerCallback: IntersectionObserverCallback;
    const observe = vi.fn();

    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      vi.stubGlobal(
        'IntersectionObserver',
        class {
          constructor(callback: IntersectionObserverCallback) {
            observerCallback = callback;
          }
          observe = observe;
          disconnect = vi.fn();
        },
      );
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.unstubAllGlobals();
      observe.mockClear();
    });

    const intersect = (target: Element, top: number) =>
      observerCallback(
        [
          {
            target,
            isIntersecting: true,
            boundingClientRect: { top },
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );

    it('emits mounted', async () => {
      const { blockMap } = createBlockMap([createText()]);

      const { emitted } = await renderNotion({ blockMap, fullPage: true });

      expect(emitted('mounted')).toBeDefined();
    });

    it('observes every block with an id', async () => {
      const texts = [createText(), createText()];
      const { blockMap } = createBlockMap(texts);

      const { container } = await renderNotion({ blockMap, fullPage: true });

      const observed = observe.mock.calls.map(([el]) => el);
      expect(observed).toContain(getBlock(container, texts[0].id));
      expect(observed).toContain(getBlock(container, texts[1].id));
    });

    it('emits bookmark with the topmost visible block after 300ms', async () => {
      const texts = [createText(), createText()];
      const { blockMap } = createBlockMap(texts);
      const { container, emitted } = await renderNotion({
        blockMap,
        fullPage: true,
      });

      intersect(getBlock(container, texts[1].id)!, 200);
      intersect(getBlock(container, texts[0].id)!, 100);
      vi.advanceTimersByTime(299);
      expect(emitted('bookmark')).toBeUndefined();
      vi.advanceTimersByTime(1);

      expect(emitted('bookmark')).toEqual([[dashless(texts[0].id)]]);
    });
  });
});
