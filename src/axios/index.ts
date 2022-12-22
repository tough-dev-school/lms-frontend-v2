import axios from 'axios';
import onRequestFulfilled from './onRequestFulfilled';
import onResponseFulfilled from './onResponseFulfilled';
import onResponseRejected from './onResponseRejected';

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
