import axios from './axios';
import type { User, EditableUserProperties } from '@/types/users';

export const getUser: () => Promise<User> = async () => {
  const url = '/api/v2/users/me/';
  const response = await axios.get(url);

  return response.data as User;
};

export const setUser = async (data: EditableUserProperties): Promise<User> => {
  const url = '/api/v2/users/me/';

  return (await axios.patch(url, data)).data as User;
};
