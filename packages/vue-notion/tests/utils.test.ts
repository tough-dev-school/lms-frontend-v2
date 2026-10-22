import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import {
  defaultMapPageUrl,
  getListNumber,
  getTextContent,
  uuidToId,
} from '../lib/utils';
import type { RichText } from '../lib/types';
import { createBlock, createBlockMap } from './fixtures/createBlockMap';

describe('getTextContent', () => {
  it('joins text chunks and ignores decorations', () => {
    const text: RichText = [['Hello '], ['bold', [['b']]], ['!']];

    expect(getTextContent(text)).toBe('Hello bold!');
  });

  it('returns an empty string for empty text', () => {
    expect(getTextContent([])).toBe('');
  });
});

describe('getListNumber', () => {
  it('numbers consecutive blocks of the same type from 1', () => {
    const items = [
      createBlock('numbered_list'),
      createBlock('numbered_list'),
      createBlock('numbered_list'),
    ];
    const { blockMap } = createBlockMap(items);

    expect(getListNumber(items[2].id, blockMap)).toBe(3);
  });

  it('restarts numbering after a block of another type', () => {
    const items = [
      createBlock('numbered_list'),
      createBlock('text'),
      createBlock('numbered_list'),
    ];
    const { blockMap } = createBlockMap(items);

    expect(getListNumber(items[2].id, blockMap)).toBe(1);
  });

  it('returns undefined for a block without a parent', () => {
    const { blockMap, root } = createBlockMap([]);

    expect(getListNumber(root.id, blockMap)).toBeUndefined();
  });
});

describe('defaultMapPageUrl', () => {
  it('maps a uuid to a dashless root path', () => {
    expect(defaultMapPageUrl('aaaa-bbbb-cccc')).toBe('/aaaabbbbcccc');
  });

  it('maps a missing id to the root path', () => {
    expect(defaultMapPageUrl()).toBe('/');
  });
});

describe('uuidToId', () => {
  it('removes every dash', () => {
    const uuid = faker.string.uuid();

    expect(uuidToId(uuid)).toBe(uuid.split('-').join(''));
  });
});
