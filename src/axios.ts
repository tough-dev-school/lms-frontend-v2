import useAuth from '@/stores/auth';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use((request) => {
  const auth = useAuth();
  request.headers = {
    ...request.headers,
    Authorization: `Bearer ${auth.token} `,
  };
  return request;
});

export default instance;
