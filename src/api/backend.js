import store from '../store';
import axios from 'axios';

const instance = axios.create({
  baseUrl: '/',
});

instance.interceptors.request.use(
  function (config) {
    const { url, headers } = config;
    const { token } = store.state.auth;
    if (url.startsWith('/api/v2') && (!url.startsWith('/api/v2/auth') || url.startsWith('/api/v2/auth/as/'))) {
      headers['Authorization'] = `Bearer ${token} `;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default instance;
