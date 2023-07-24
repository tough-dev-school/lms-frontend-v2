// @ts-ignore
import type { BlockMap } from 'vue3-notion/src/lib/types';

import { createCustomAxiosInstance } from '@/axios';

const axios = createCustomAxiosInstance({ useResponseCaseMiddleware: false });

export const getMaterial: (materialId: string) => Promise<BlockMap> = async (
  materialId,
) => {
  const url = `/api/v2/notion/materials/${materialId}/`;

  return (await axios.get(url)).data as BlockMap;
};
