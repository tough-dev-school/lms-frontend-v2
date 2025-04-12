import axios from './index';
import type { EditableUserData, User } from '@/types/users';

export const getUser: () => Promise<User> = async () => {
  const url = '/api/v2/users/me/';
  const response = await axios.get(url);

  return response.data as User;
};

export const setUser = async (data: EditableUserData): Promise<User> => {
  const url = '/api/v2/users/me/';
  return (await axios.patch(url, data)).data as User;
};

export const setAvatar = async (avatar: File | null): Promise<User> => {
  const url = '/api/v2/users/me/';

  if (!avatar) {
    return (await axios.patch(url, { avatar })).data as User;
  }

  const data = new FormData() as FormData;
  data.append('avatar', avatar);

  return (await axios.patch(url, data)).data as User;
};
