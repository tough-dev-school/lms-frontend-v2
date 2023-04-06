import { createCustomAxiosInstance } from '@/axios';
import type { BlockMap } from '@/types/materials';

const axios = createCustomAxiosInstance({ useResponseCaseMiddleware: false });

export const getMaterial: (materialId: string) => Promise<BlockMap> = async (
  materialId,
) => {
  const url = `/api/v2/notion/materials/${materialId}/`;

  return (await axios.get(url)).data as BlockMap;
};
