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
    newPassword1,
    newPassword2,
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
    newPassword1,
    newPassword2,
    uid: uid,
    token: token,
  });
};
