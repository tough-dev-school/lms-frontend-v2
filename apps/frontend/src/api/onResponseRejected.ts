import useAuth from '@/stores/auth';
import type { AxiosError } from 'axios';
import handleError from '@/utils/handleError';
import responseCaseMiddleware from './responseCaseMiddleware';

const onResponseRejected = (
  error: AxiosError,
  enableCaseMiddleware: boolean,
) => {
  const { removeToken, token } = useAuth();

  if (error.response) {
    if (error.response.status === 401 && token.value) removeToken();

    if (error.response.status !== 401) {
      // Convert data keys to target case
      if (error.response.data) {
        error.response.data = responseCaseMiddleware(
          error.response.data as any,
          enableCaseMiddleware,
        );
      }

      // Handle error with default or custom message
      const isJson =
        error.response.headers['content-type'] ===
        'application/json; charset=utf-8';

      isJson ? handleError(error) : handleError();
    }
  }

  return Promise.reject(error);
};

export default onResponseRejected;
