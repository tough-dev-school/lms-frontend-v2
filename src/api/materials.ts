import { createHttpClient } from './index';
import type { BlockMap } from '@/types/materials';

const axios = createHttpClient({ useResponseCaseMiddleware: false }).instance;

export const getMaterial: (materialId: string) => Promise<BlockMap> = async (
  materialId,
) => {
  const url = `/api/v2/notion/materials/${materialId}/`;

  return (await axios.get(url)).data as BlockMap;
};
