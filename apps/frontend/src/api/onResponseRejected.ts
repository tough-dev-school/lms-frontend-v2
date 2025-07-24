import { useAuth } from '@/composables/useAuth';
import type { AxiosError } from 'axios';
import handleError from '@/utils/handleError';
import router from '@/router';

const onResponseRejected = (error: AxiosError) => {
  const { token } = useAuth();

  if (error.response) {
    if (error.response.status === 401) {
      token.value = undefined;
      router.push({ name: 'login' });
    }

    if (error.response.status !== 401) {
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
