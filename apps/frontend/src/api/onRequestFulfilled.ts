import { useAuth } from '@/composables/useAuth';
import type { InternalAxiosRequestConfig } from 'axios';
import { cloneDeep } from 'lodash-es';

const onRequestFulfilled = (requestConfig: InternalAxiosRequestConfig) => {
  // Django admin may pass tokens as url param
  const { token: localStorageToken } = useAuth();
  const urlToken = new URLSearchParams(window.location.search).get('t');
  const token = urlToken || localStorageToken.value;

  const config = cloneDeep(requestConfig);

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.frkn = '1';
  }

  if (config.params !== undefined) {
    for (const paramName of Object.keys(config.params)) {
      if (
        Array.isArray(config.params[paramName]) &&
        config.params[paramName].length > 0
      ) {
        config.params[paramName] = config.params[paramName].join(',');
      }
    }
  }

  return config;
};

export default onRequestFulfilled;
