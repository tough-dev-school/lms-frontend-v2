import useAuth from '@/stores/auth';
import axios from 'axios';
import handleError from '@/utils/handleError';
import { convertKeysToCamelCase } from '@/utils/convertKeys';

export const createCustomAxiosInstance = ({ useCaseMiddleware = true }) => {
  const instance = axios.create();

  const modifyData = useCaseMiddleware
    ? convertKeysToCamelCase
    : (data: Object) => data;

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
      response.data = modifyData(response.data);
      return response;
    },
    (error) => {
      const auth = useAuth();

      if (error.response.status === 401) {
        auth.resetAuth();
        window.location.href = window.origin;
      }

      error.response.data = modifyData(error.response.data);

      if (
        error.response.headers['content-type'] ===
        'application/json; charset=utf-8'
      ) {
        handleError(error);
      } else {
        handleError('Ошибка!');
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default createCustomAxiosInstance({ useCaseMiddleware: true });
