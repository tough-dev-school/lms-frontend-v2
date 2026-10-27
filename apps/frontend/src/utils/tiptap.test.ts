import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vitest';
import { getExtensions, normalizeContent } from './tiptap';

const extensions = getExtensions({ placeholder: '' });

const src = faker.image.url();
const textBefore = faker.lorem.words(3);
const textAfter = faker.lorem.words(3);

const image = { type: 'image', attrs: { src } };
const paragraph = (text: string) => ({
  type: 'paragraph',
  content: [{ type: 'text', text }],
});

const countImages = (content: Record<string, unknown>) =>
  (content.content as { type: string }[]).filter(({ type }) => type === 'image')
    .length;

describe('normalizeContent', () => {
  test('keeps valid content untouched', () => {
    const content = {
      type: 'doc',
      content: [paragraph(textBefore), image, paragraph(textAfter)],
    };

    expect(normalizeContent(content, extensions)).toBe(content);
  });

  test('keeps empty content of a new answer untouched', () => {
    const content = {};

    expect(normalizeContent(content, extensions)).toBe(content);
  });

  test('moves an inline image out of a paragraph into its own block', () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: textBefore },
            image,
            { type: 'text', text: textAfter },
          ],
        },
      ],
    };

    const normalized = normalizeContent(content, extensions);

    expect(
      (normalized.content as { type: string }[]).map(({ type }) => type),
    ).toEqual(['paragraph', 'image', 'paragraph']);
  });

  test('keeps text around a lifted image', () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: textBefore },
            image,
            { type: 'text', text: textAfter },
          ],
        },
      ],
    };

    const normalized = JSON.stringify(normalizeContent(content, extensions));

    expect(normalized).toContain(textBefore);
    expect(normalized).toContain(textAfter);
  });

  test('keeps every image when a paragraph holds several', () => {
    const content = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [image, image] }],
    };

    expect(countImages(normalizeContent(content, extensions))).toBe(2);
  });
});
