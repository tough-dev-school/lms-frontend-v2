import { useAuth } from '@/composables/useAuth';
import type { InternalAxiosRequestConfig } from 'axios';
import requestCaseMiddleware from './requestCaseMiddleware';
import { cloneDeep } from 'lodash-es';

const onRequestFulfilled = (
  config: InternalAxiosRequestConfig,
  enableCaseMiddleware = true,
) => {
  // Django admin may pass tokens as url param
  const { token: localStorageToken } = useAuth();
  const urlToken = new URLSearchParams(window.location.search).get('t');
  const token = urlToken || localStorageToken;

  config = cloneDeep(config);

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.frkn = '1';
  }

  // Convert data keys to target case
  if (!(config.data instanceof FormData)) {
    config.data = requestCaseMiddleware(config.data, enableCaseMiddleware);
  }

  if (config.params !== undefined) {
    Object.keys(config.params).forEach((paramName) => {
      if (
        Array.isArray(config.params[paramName]) &&
        config.params[paramName].length > 0
      ) {
        config.params[paramName] = config.params[paramName].join(',');
      }
    });
  }

  return config;
};

export default onRequestFulfilled;
