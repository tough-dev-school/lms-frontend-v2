import useAuth from '@/stores/auth';
import useToasts from '@/stores/toasts';
import axios from 'axios';

const handleError = (error: any) => {
  const toasts = useToasts();

  Object.keys(error.response.data).forEach((key) => {
    const field = error.response.data[key];
    if (Array.isArray(field)) {
      field.forEach((error: string) => {
        toasts.addMessage(error, 'error');
      });
    } else {
      toasts.addMessage(field, 'error');
    }
  });
};

const instance = axios.create();

instance.interceptors.request.use((request) => {
  const auth = useAuth();
  request.headers = {
    ...request.headers,
    Authorization: `Bearer ${auth.token} `,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  },
);

export default instance;
