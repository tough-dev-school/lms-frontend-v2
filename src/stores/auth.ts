import { defineStore } from 'pinia';
import axios from 'axios';
import handleError from '@/utils/handleError';
import { logInWithCredentials, sendLoginLink, logInWithLink } from '@/api/auth';

const useAuth = defineStore('auth', {
  state: () => {
    return {
      token: undefined,
    };
  },
  actions: {
    async loginWithCredentials(username: string, password: string) {
      try {
        const response = await logInWithCredentials(username, password);
        this.token = response.data.token;
      } catch (error: any) {
        handleError(error);
      }
    },
    async loginWithEmail(email: string) {
      try {
        await sendLoginLink(email);
      } catch (error: any) {
        handleError(error);
      }
    },
    async exchangeTokens(passwordlessToken: string) {
      try {
        const response = await logInWithLink(passwordlessToken);
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
