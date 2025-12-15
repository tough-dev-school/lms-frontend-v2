import type { MaterialSerilizer } from '@/api/generated';
import idToUuid from './idToUuid';

const getNotionTitle = (
  materialId: string,
  material: MaterialSerilizer['content'],
) => {
  // as api is unofficial and poorly typed we just assume title value is a nested array and then flatten it with the magic number to convert it into string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getBlockTitle = (block: any): string | undefined =>
    block?.value?.properties?.title
      ?.flat(Infinity)
      .filter((c: string) => c !== 'b') // notion workers tends to put random b's (maybe as a sign of linebreak)
      .join('');

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
