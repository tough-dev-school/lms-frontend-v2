import axios from '@/axios';
import type { Study } from '@/types/studies';
import type { PaginantedCollection } from '@/types/api-utility';

export const getStudies = async () => {
  const url = `/api/v2/studies/purchased/`;

  return (await axios.get(url)).data as PaginantedCollection<Study>;
};
