import onResponseRejected from './onResponseRejected';
import { Api, HttpClient } from './generated-api';
import onResponseFulfilled from './onResponseFulfilled';
import onRequestFulfilled from './onRequestFulfilled';
import { merge } from 'lodash-es';

export interface CustomAxiosInstanceConfig {
  useResponseCaseMiddleware: boolean;
  useRequestCaseMiddleware: boolean;
}

export const createHttpClient = (
  customConfig: Partial<CustomAxiosInstanceConfig> = {},
) => {
  // #FIXME Case middleware must be removed after migration to autofg
  const defaultConfig = {
    useResponseCaseMiddleware: false,
    useRequestCaseMiddleware: false,
  };

  const config = merge(
    {},
    defaultConfig,
    customConfig,
  ) as CustomAxiosInstanceConfig;

  const { useResponseCaseMiddleware, useRequestCaseMiddleware } = config;

  const httpClient = new HttpClient({
    baseURL: import.meta.env.VITE_API_URL,
  });

  httpClient.instance.interceptors.request.use((value) =>
    onRequestFulfilled(value, useRequestCaseMiddleware),
  );

  httpClient.instance.interceptors.response.use(
    (value) => onResponseFulfilled(value, useResponseCaseMiddleware),
    (value) => onResponseRejected(value, useResponseCaseMiddleware),
  );

  return httpClient;
};

/**
 * @deprecated This is a temporary solution to support handwritten API client.
 */
const backwardCompatibleHttpClient = createHttpClient({
  useResponseCaseMiddleware: true,
  useRequestCaseMiddleware: true,
});

/**
 * @deprecated Direct usage of axios is deprecated. Use api instead.
 */
export const axios = backwardCompatibleHttpClient.instance;

const modernHttpClient = createHttpClient();
export const { api } = new Api(modernHttpClient);
export default axios;
