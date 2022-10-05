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
    async loginWithEmail(email: string) {
      try {
        await axios.get(
          `/api/v2/auth/passwordless-token/request/${email.toLowerCase()}/`,
        );
      } catch (error: any) {
        handleError(error);
      }
    },
    async exchangeTokens(passwordlessToken: string) {
      try {
        const response = await axios.get(
          `/api/v2/auth/passwordless-token/${passwordlessToken}`,
        );
        this.token = response.data.token;
      } catch (error: any) {
        handleError(error);
      }
    },
    resetAuth() {
      this.token = undefined;
    },
  },
  persist: true,
});

export default useAuth;
