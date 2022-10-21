import useAuth from '@/stores/auth';
import axios from 'axios';
import handleError from '@/utils/handleError';
import applyCaseMiddleware from 'axios-case-converter';

const instance = applyCaseMiddleware(axios.create());

instance.interceptors.request.use((request) => {
  const auth = useAuth();
  request.headers = {
    ...request.headers,
  };

  if (auth.token) request.headers.Authorization = `Bearer ${auth.token}`;

  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  },
);

export default instance;
