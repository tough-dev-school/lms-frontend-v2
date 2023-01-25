import axios from '@/axios';
import type { Diploma } from '@/types/diplomas';
import type { PaginantedCollection } from '@/types/api-utility';

export const getDiplomas = async () => {
  const url = `/api/v2/diplomas/`;

  return (await axios.get(url)).data as PaginantedCollection<Diploma>;
};
