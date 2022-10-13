import axios from './axios';

export const getUser = async () => {
  const url = '/api/v2/users/me/';

  return await axios.get(url);
};

export interface EditableUserData {
  first_name?: string;
  last_name?: string;
  first_name_en?: string;
  last_name_en?: string;
  gender?: string;
  linkedin_username?: string;
  github_username?: string;
}

export const setUser = async (data: EditableUserData) => {
  const url = '/api/v2/users/me/';

  return await axios.patch(url, data);
};
