import axios from './axios';

export const getStudies = async () => {
  const url = `/api/v2/studies/purchased/`;

  return await axios.get(url);
};
