import axios from './axios';

export const logInWithCredentials = async (
  username: string,
  password: string,
) => {
  const url = `/api/v2/auth/token/`;
  const data = {
    username,
    password,
  };

  return await axios.post(url, data);
};

export const sendLoginLink = async (email: string) => {
  const url = `/api/v2/auth/passwordless-token/request/${email.toLowerCase()}/`;

  return await axios.get(url);
};

export const logInWithLink = async (token: string) => {
  const url = `/api/v2/auth/passwordless-token/${token}`;

  return await axios.get(url);
};
