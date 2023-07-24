import type { AuthToken } from '@/types/auth';

import axios from '@/axios';

type LoginResponse = {
  token: AuthToken;
};

export const loginWithCredentials = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const url = `/api/v2/auth/token/`;
  const data = {
    password,
    username,
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

export const requestReset = async (email: string) => {
  const url = `/api/v2/auth/password/reset/`;

  return await axios.post(url, { email });
};

export const resetPassword = async (
  newPassword1: string,
  newPassword2: string,
  uid: string,
  token: string,
) => {
  const url = `/api/v2/auth/password/reset/confirm/`;

  return await axios.post(url, {
    new_password1: newPassword1,
    new_password2: newPassword2,
    token: token,
    uid: uid,
  });
};
