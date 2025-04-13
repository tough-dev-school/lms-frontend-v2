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
  const defaultConfig = {
    useResponseCaseMiddleware: true,
    useRequestCaseMiddleware: true,
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

const defaultHttpClient = createHttpClient();
export const axios = defaultHttpClient.instance;
export const { api } = new Api(defaultHttpClient);
export default axios;
