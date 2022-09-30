import { defineStore } from 'pinia';
import axios from 'axios';
import handleError from '@/utils/handleError';

const useAuth = defineStore('auth', {
  state: () => {
    return {
      token: undefined,
    };
  },
  actions: {
    async loginWithCredentials(username: string, password: string) {
      try {
        const response = await axios.post('/api/v2/auth/token/', {
          username,
          password,
        });
        this.token = response.data.token;
      } catch (error: any) {
        handleError(error);
      }
    },
  },
});

export default useAuth;
