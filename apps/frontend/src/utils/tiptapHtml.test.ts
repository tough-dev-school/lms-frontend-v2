import { describe, expect, test } from 'vitest';
import { tiptapToHtml } from './tiptapHtml';

const tiptapDocument = (...content: unknown[]) => ({ type: 'doc', content });
const paragraph = (...content: unknown[]) => ({ type: 'paragraph', content });
const text = (value: string, marks: unknown[] = []) => ({
  type: 'text',
  text: value,
  marks,
});

describe('tiptapToHtml', () => {
  test('renders paragraphs and headings', () => {
    expect(
      tiptapToHtml(
        tiptapDocument(
          { type: 'heading', attrs: { level: 2 }, content: [text('Title')] },
          paragraph(text('Body')),
        ),
      ),
    ).toBe('<h2>Title</h2><p>Body</p>');
  });

  test('escapes markup typed by students', () => {
    expect(
      tiptapToHtml(
        tiptapDocument(paragraph(text('<script>alert(1)</script>'))),
      ),
    ).toBe('<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>');
  });

  test('escapes quotes in attribute values', () => {
    const html = tiptapToHtml(
      tiptapDocument(
        paragraph(
          text('link', [
            {
              type: 'link',
              attrs: { href: 'https://example.com/"onmouseover="alert(1)' },
            },
          ]),
        ),
      ),
    );

    expect(html).toContain(
      'href="https://example.com/&quot;onmouseover=&quot;alert(1)"',
    );
  });

  test('nests marks around text', () => {
    expect(
      tiptapToHtml(tiptapDocument(paragraph(text('bold', [{ type: 'bold' }])))),
    ).toBe('<p><strong>bold</strong></p>');
  });

  test('renders void elements without closing tags', () => {
    expect(
      tiptapToHtml(
        tiptapDocument(
          paragraph(
            text('a'),
            { type: 'hardBreak' },
            { type: 'image', attrs: { src: '/image.png' } },
          ),
        ),
      ),
    ).toBe('<p>a<br><img src="/image.png"></p>');
  });

  test('skips attributes without a value', () => {
    expect(
      tiptapToHtml(
        tiptapDocument(
          paragraph({ type: 'image', attrs: { src: '/a.png', alt: null } }),
        ),
      ),
    ).not.toContain('alt');
  });

  test('wraps tables so wide ones scroll', () => {
    const html = tiptapToHtml(
      tiptapDocument({
        type: 'table',
        content: [
          {
            type: 'tableRow',
            content: [
              { type: 'tableCell', content: [paragraph(text('cell'))] },
            ],
          },
        ],
      }),
    );

    expect(html.startsWith('<div class="tableWrapper"><table')).toBe(true);
  });
});
