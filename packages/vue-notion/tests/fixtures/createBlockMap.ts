import { faker } from '@faker-js/faker';
import type { BlockMap, BlockValue } from '../../lib/types';

type TestBlock = BlockValue;

export const createBlock = (
  type: string,
  overrides: Partial<TestBlock> = {},
): TestBlock => ({
  id: faker.string.uuid(),
  type,
  ...overrides,
});

export const createText = (text = faker.lorem.sentence()) =>
  createBlock('text', { properties: { title: [[text]] } });

// Wraps blocks into a page. A block without parent_id becomes a direct child
// of the page, so nested blocks must set parent_id and be listed in their
// parent's content.
export const createBlockMap = (
  blocks: TestBlock[],
  page: Partial<TestBlock> = {},
) => {
  const root = createBlock('page', {
    properties: { title: [[faker.lorem.words(3)]] },
    ...page,
  });
  const topLevel = blocks.filter((b) => !b.parent_id);
  root.content = topLevel.map((b) => b.id);

  const map: BlockMap = {
    [root.id]: { value: root },
  };
  for (const b of blocks) {
    map[b.id] = { value: { parent_id: root.id, ...b } };
  }
  return { root, blockMap: map };
};

export const dashless = (uuid: string) => uuid.replaceAll('-', '');
