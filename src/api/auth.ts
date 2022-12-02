import axios from './axios';
import type { AuthToken } from '@/types/auth';

type LoginResponse = {
  token: AuthToken;
};

export const loginWithCredentials = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const url = `/api/v2/auth/token/`;
  const data = {
    username,
    password,
  };

  return (await axios.post(url, data)).data as LoginResponse;
};

export const sendLoginLink = async (email: string): Promise<void> => {
  const url = `/api/v2/auth/passwordless-token/request/${email.toLowerCase()}/`;

  await axios.get(url);
};

export const loginWithLink = async (token: string): Promise<LoginResponse> => {
  const url = `/api/v2/auth/passwordless-token/${token}`;

  return (await axios.get(url)).data as LoginResponse;
};

export const loginWithUserId = async (userId: string) => {
  const url = `/api/v2/auth/as/${userId}/`;

  return (await axios.get(url)).data as LoginResponse;
};

export const changePassword = async (
  newPassword1: string,
  newPassword2: string,
) => {
  const url = `/api/v2/auth/password/change/`;

  return await axios.post(url, {
    new_password1: newPassword1,
    new_password2: newPassword2,
  });
};
