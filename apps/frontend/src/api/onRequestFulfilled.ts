import { useAuth } from '@/composables/useAuth';
import type { InternalAxiosRequestConfig } from 'axios';
import { cloneDeep } from 'es-toolkit/compat';
import { i18n } from '@/i18n';

const onRequestFulfilled = (requestConfig: InternalAxiosRequestConfig) => {
  // Django admin may pass tokens as url param
  const { token: localStorageToken } = useAuth();
  const urlToken = new URLSearchParams(window.location.search).get('t');
  const token = urlToken || localStorageToken.value;

  const config = cloneDeep(requestConfig);

  config.headers = config.headers || {};

  // Lets backend error messages follow the interface language
  config.headers['Accept-Language'] = i18n.global.locale.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.frkn = '1';
  }

  if (config.params !== undefined) {
    const params: Record<string, unknown> = config.params;

    Object.keys(params).forEach((paramName) => {
      const value = params[paramName];

      if (Array.isArray(value) && value.length > 0) {
        params[paramName] = value.join(',');
      }
    });
  }

  return config;
};

export default onRequestFulfilled;
