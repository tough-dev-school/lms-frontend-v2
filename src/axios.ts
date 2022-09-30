import useAuth from '@/stores/auth';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(function (config) {
  const auth = useAuth();
  config.headers['Authorization'] = `Bearer ${auth.token} `;
  return config;
});

export default instance;
