import useAuth from '@/stores/auth';
import axios from 'axios';
import handleError from '@/utils/handleError';
import applyCaseMiddleware from 'axios-case-converter';

export const createCustomAxiosInstance = ({ useCaseMiddleware = true }) => {
  const instance = useCaseMiddleware
    ? applyCaseMiddleware(axios.create())
    : axios.create();

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
      const auth = useAuth();

      if (error.response.status === 401) {
        auth.resetAuth();
        window.location.href = window.origin;
      }

      handleError(error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createCustomAxiosInstance({ useCaseMiddleware: true });
