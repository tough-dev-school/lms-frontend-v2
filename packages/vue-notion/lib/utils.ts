import type { BlockMap, RichText } from './types';

// utils from react-notion
export const getTextContent = (text: RichText) =>
  text.reduce((previous, current) => previous + current[0], '');

const groupBlockContent = (blockMap: BlockMap) => {
  const output: string[][] = [];

  let lastType: string | undefined = undefined;
  let index = -1;

  Object.keys(blockMap).forEach((id) => {
    blockMap[id].value?.content?.forEach((blockId) => {
      const blockType = blockMap[blockId]?.value?.type;

      if (blockType && blockType !== lastType) {
        index++;
        lastType = blockType;
        output[index] = [];
      }

      output[index].push(blockId);
    });

    lastType = undefined;
  });

  return output;
};

export const getListNumber = (blockId: string, blockMap: BlockMap) => {
  const groups = groupBlockContent(blockMap);
  const group = groups.find((g) => g.includes(blockId));

  if (!group) {
    return;
  }

  return group.indexOf(blockId) + 1;
};

export const defaultMapPageUrl = (pageId = '') => `/${uuidToId(pageId)}`;

// Not replaceAll: the app type-checks this file with an ES2020 lib
export const uuidToId = (uuid: string) => uuid.split('-').join('');

// Registered globally by the host app (e.g. @janniks/vue3-katex). Resolved
// through a dynamic `:is` so Vue only looks it up when katex is enabled,
// instead of warning on every render.
export const KATEX_ELEMENT = 'katex-element';
