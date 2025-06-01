import useAuth from '@/stores/auth';
import type { AxiosError } from 'axios';
import responseCaseMiddleware from './responseCaseMiddleware';

const onResponseRejected = (
  error: AxiosError,
  enableCaseMiddleware: boolean,
) => {
  const auth = useAuth();

  if (error.response) {
    if (error.response.status === 401 && auth.token) auth.removeToken();

    if (error.response.status !== 401) {
      if (error.response.data) {
        error.response.data = responseCaseMiddleware(
          error.response.data as any,
          enableCaseMiddleware,
        );
      }
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
