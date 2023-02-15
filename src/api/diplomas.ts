import axios from '@/axios';
import type { Diploma } from '@/types/diplomas';

export const getDiplomas = async () => {
  const url = `/api/v2/diplomas/`;

  return (await axios.get(url, { params: { disable_pagination: true } }))
    .data as Diploma[];
};
