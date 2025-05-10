import axios from './index';
import type { AuthToken } from '@/types/auth';

type LoginResponse = {
  token: AuthToken;
};

/**
 * @deprecated use api/index.ts instead
 */
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

/**
 * @deprecated use api/index.ts instead
 */
export const sendLoginLink = async (email: string): Promise<void> => {
  const url = `/api/v2/auth/passwordless-token/request/${email.toLowerCase()}/`;

  await axios.get(url);
};

/**
 * @deprecated use api/index.ts instead
 */
export const loginWithLink = async (token: string): Promise<LoginResponse> => {
  const url = `/api/v2/auth/passwordless-token/${token}`;

  return (await axios.get(url)).data as LoginResponse;
};

/**
 * @deprecated use api/index.ts instead
 */
export const loginWithUserId = async (userId: string) => {
  const url = `/api/v2/auth/as/${userId}/`;

  return (await axios.get(url)).data as LoginResponse;
};

/**
 * @deprecated use api/index.ts instead
 */
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

/**
 * @deprecated use api/index.ts instead
 */
export const requestReset = async (email: string) => {
  const url = `/api/v2/auth/password/reset/`;

  return await axios.post(url, { email });
};

/**
 * @deprecated use api/index.ts instead
 */
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
    uid: uid,
    token: token,
  });
};
