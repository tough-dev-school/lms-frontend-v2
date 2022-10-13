import axios from './axios';

export const getMaterials = async (id: string) => {
  const url = `/api/v2/notion/materials/${id}/`;

  return await axios.get(url);
};
