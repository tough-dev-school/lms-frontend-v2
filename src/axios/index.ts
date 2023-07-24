import axios from 'axios';
import merge from 'lodash/merge';

import onRequestFulfilled from './onRequestFulfilled';
import onResponseFulfilled from './onResponseFulfilled';
import onResponseRejected from './onResponseRejected';

interface CustomAxiosInstanceConfig {
  useRequestCaseMiddleware: boolean;
  useResponseCaseMiddleware: boolean;
}

export const createCustomAxiosInstance = (
  userConfig: Partial<CustomAxiosInstanceConfig> = {},
) => {
  const defaultConfig = {
    useRequestCaseMiddleware: true,
    useResponseCaseMiddleware: true,
  };

  const config = merge(
    {},
    defaultConfig,
    userConfig,
  ) as CustomAxiosInstanceConfig;

  const instance = axios.create();

  const { useRequestCaseMiddleware, useResponseCaseMiddleware } = config;

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
