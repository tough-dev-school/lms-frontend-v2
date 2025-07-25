import type { BlockMap } from '@/types';
import idToUuid from './idToUuid';

const getNotionTitle = (materialId: string, material: BlockMap) => {
  // as api is unofficial and poorly typed we just assume title value is a nested array and then flatten it with the magic number to convert it into string
  const getBlockTitle = (block: any): string | undefined =>
    // eslint-disable-next-line unicorn/no-magic-array-flat-depth
    block?.value?.properties?.title?.flat(100).join('');

  const blockId = idToUuid(materialId);
  const firstBlockId = Object.keys(material)[0];

  if (getBlockTitle(material[blockId])) {
    return getBlockTitle(material[blockId]);
  } else if (material[firstBlockId]?.value?.type === 'page') {
    return getBlockTitle(material[firstBlockId]); // using title of the first block as fallback title
  }
  return undefined;
};

export default getNotionTitle;
