import { useAuth } from '@/composables/useAuth';
import type { AxiosError } from 'axios';

const onResponseRejected = (error: AxiosError) => {
  const { token } = useAuth();

  if (error.response?.status === 401) {
    token.value = undefined;
  }

  return Promise.reject(error);
};

export default onResponseRejected;
