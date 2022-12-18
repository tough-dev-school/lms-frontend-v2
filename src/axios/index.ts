import axios from 'axios';
import onRequestFullfilled from './onRequestFullfilled';
import onResponseFullfilled from './onResponseFullfilled';
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
    onRequestFullfilled(value, useRequestCaseMiddleware),
  );

  instance.interceptors.response.use(
    (value) => onResponseFullfilled(value, useResponseCaseMiddleware),
    (value) => onResponseRejected(value, useResponseCaseMiddleware),
  );

  return instance;
};

export default createCustomAxiosInstance();
