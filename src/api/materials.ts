import { createCustomAxiosInstance } from '@/axios';
import type { MaterialContentBlocks } from '@/types/materials';

const axios = createCustomAxiosInstance({ useResponseCaseMiddleware: false });

export const getMaterial: (
  materialId: string,
) => Promise<MaterialContentBlocks> = async (materialId) => {
  const url = `/api/v2/notion/materials/${materialId}/`;

  return (await axios.get(url)).data as MaterialContentBlocks;
};
