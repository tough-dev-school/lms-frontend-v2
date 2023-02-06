// @ts-ignore
import type { BlockMap } from 'vue3-notion/src/lib/types';
import idToUuid from './idToUuid';

const getNotionTitle = (materialId: string, material: BlockMap) => {
  const blockId = idToUuid(materialId);

  // as api is unofficial and poorly typed we just assume title value is a nested array and then flatten it with the magic number to convert it into string
  return material[blockId]?.value?.properties?.title?.flat(100).join('');
};

export default getNotionTitle;
