import type { AxiosRequestConfig } from 'axios';

import useAuth from '@/stores/auth';
import cloneDeep from 'lodash/cloneDeep';

import requestCaseMiddleware from './requestCaseMiddleware';

const onRequestFulfilled = (
  request: AxiosRequestConfig,
  enableCaseMiddleware = true,
) => {
  const auth = useAuth();

  request = cloneDeep(request);

  request.headers = request.headers || {};

  // Manage authorization via pinia
  if (auth.token) {
    request.headers.Authorization = `Bearer ${auth.token}`;
  }

  // Convert data keys to target case
  if (!(request.data instanceof FormData)) {
    request.data = requestCaseMiddleware(request.data, enableCaseMiddleware);
  }

  return request;
};

export default onRequestFulfilled;
