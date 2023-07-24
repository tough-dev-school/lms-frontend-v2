// @ts-ignore
import type { Block, BlockMap } from 'vue3-notion/src/lib/types';

import idToUuid from './idToUuid';

const getNotionTitle = (materialId: string, material: BlockMap) => {
  // as api is unofficial and poorly typed we just assume title value is a nested array and then flatten it with the magic number to convert it into string
  const getBlockTitle = (block: Block): string | undefined =>
    block?.value?.properties?.title?.flat(100).join('');

  const blockId = idToUuid(materialId);
  const firstBlockId = Object.keys(material)[0];

  if (getBlockTitle(material[blockId])) return getBlockTitle(material[blockId]);
  // using title of the first block as fallback title
  else if (material[firstBlockId]?.value?.type === 'page')
    return getBlockTitle(material[firstBlockId]);
  return undefined;
};

export default getNotionTitle;
