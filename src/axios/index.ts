import axios from 'axios';
import onRequestFulfilled from './onRequestFulfilled';
import onResponseFulfilled from './onResponseFulfilled';
import onResponseRejected from './onResponseRejected';
import { merge } from 'lodash-es';

interface CustomAxiosInstanceConfig {
  useResponseCaseMiddleware: boolean;
  useRequestCaseMiddleware: boolean;
}

export const createCustomAxiosInstance = (
  userConfig: Partial<CustomAxiosInstanceConfig> = {},
) => {
  const defaultConfig = {
    useResponseCaseMiddleware: true,
    useRequestCaseMiddleware: true,
  };

  const config = merge(
    {},
    defaultConfig,
    userConfig,
  ) as CustomAxiosInstanceConfig;

  const instance = axios.create({
    baseURL:
      import.meta.env.VITE_API_BASE_URL ?? 'https://app.tough-dev.school',
  });

  const { useResponseCaseMiddleware, useRequestCaseMiddleware } = config;

  instance.interceptors.request.use((value) =>
    onRequestFulfilled(value, useRequestCaseMiddleware),
  );

  instance.interceptors.response.use(
    (value) => onResponseFulfilled(value, useResponseCaseMiddleware),
    (value) => onResponseRejected(value, useResponseCaseMiddleware),
  );

  return instance;
};

export default createCustomAxiosInstance();
