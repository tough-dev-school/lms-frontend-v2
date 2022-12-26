import useAuth from '@/stores/auth';
import type { AxiosRequestConfig } from 'axios';
import requestCaseMiddleware from './requestCaseMiddleware';

const onRequestFulfilled = (
  request: AxiosRequestConfig,
  enableCaseMiddleware: boolean = true,
) => {
  const auth = useAuth();
  request.headers = {
    ...request.headers,
  };

  // Manage authorization via pinia
  if (auth.token) {
    request.headers.Authorization = `Bearer ${auth.token}`;
  }

  // Convert data keys to target case
  if (request.data) {
    request.data = requestCaseMiddleware(request.data, enableCaseMiddleware);
  }

  return request;
};

export default onRequestFulfilled;
