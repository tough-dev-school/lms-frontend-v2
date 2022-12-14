import useAuth from '@/stores/auth';
import axios from 'axios';
import handleError from '@/utils/handleError';
import {
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
} from '@/utils/convertKeys';

interface CustomAxiosInstanceConfig {
  useResponseCaseMiddleware?: boolean;
  useRequestCaseMiddleware?: boolean;
}

export const createCustomAxiosInstance = (
  config: CustomAxiosInstanceConfig = {},
) => {
  const defaultConfig = {
    useResponseCaseMiddleware: true,
    useRequestCaseMiddleware: true,
  };

  config = Object.assign({}, defaultConfig, config);

  const instance = axios.create();

  const { useResponseCaseMiddleware, useRequestCaseMiddleware } = config;

  // Request

  const requestCaseMiddleware = useRequestCaseMiddleware
    ? convertKeysToSnakeCase
    : (data: Object) => data;

  instance.interceptors.request.use((request) => {
    const auth = useAuth();
    request.headers = {
      ...request.headers,
    };

    if (auth.token) request.headers.Authorization = `Bearer ${auth.token}`;
    if (request.data) request.data = requestCaseMiddleware(request.data);

    return request;
  });

  // ---

  // Response

  const responseCaseMiddleware = useResponseCaseMiddleware
    ? convertKeysToCamelCase
    : (data: Object) => data;

  instance.interceptors.response.use(
    (response) => {
      response.data = responseCaseMiddleware(response.data);
      return response;
    },
    (error) => {
      const auth = useAuth();

      if (error.response.status === 401) {
        auth.resetAuth();
        window.location.href = window.origin;
      }

      error.response.data = responseCaseMiddleware(error.response.data);

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

  // ---

  return instance;
};

export default createCustomAxiosInstance();
