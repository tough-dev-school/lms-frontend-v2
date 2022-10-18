import axios from './axios';
import type { EditableUserProperties } from '@/types/users';

export const getUser = async () => {
  const url = '/api/v2/users/me/';

  return await axios.get(url);
};

export const setUser = async (data: EditableUserProperties) => {
  const url = '/api/v2/users/me/';

  return await axios.patch(url, data);
};
