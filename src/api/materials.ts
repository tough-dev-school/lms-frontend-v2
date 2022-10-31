import { createCustomAxiosInstance } from './axios';
import type { MaterialContentBlocks } from '@/types/materials';

const axios = createCustomAxiosInstance({ useCaseMiddleware: false });

export const getMaterialById: (
  id: string,
) => Promise<MaterialContentBlocks> = async (id) => {
  const url = `/api/v2/notion/materials/${id}/`;

  return (await axios.get(url)).data as MaterialContentBlocks;
};
