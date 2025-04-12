import axios from './index';
import type { Study } from '@/types/studies';

export const getStudies = async () => {
  const url = `/api/v2/studies/purchased/`;

  return (
    await axios.get(url, {
      params: {
        disable_pagination: true,
      },
    })
  ).data as Study[];
};
