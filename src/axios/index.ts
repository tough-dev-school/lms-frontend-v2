import axios from 'axios';
import onRequestFulfilled from './onRequestFulfilled';
import onResponseFulfilled from './onResponseFulfilled';
import onResponseRejected from './onResponseRejected';
import { merge } from 'lodash-es';

export interface CustomAxiosInstanceConfig {
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

  const instance = axios.create();

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
