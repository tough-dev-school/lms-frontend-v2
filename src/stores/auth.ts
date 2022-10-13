import { defineStore } from 'pinia';
import { logInWithCredentials, sendLoginLink, logInWithLink } from '@/api/auth';

const useAuth = defineStore('auth', {
  state: () => {
    return {
      token: undefined,
    };
  },
  actions: {
    async loginWithCredentials(username: string, password: string) {
      const response = await logInWithCredentials(username, password);
      this.token = response.data.token;
    },
    async loginWithEmail(email: string) {
      await sendLoginLink(email);
    },
    async exchangeTokens(passwordlessToken: string) {
      const response = await logInWithLink(passwordlessToken);
      this.token = response.data.token;
    },
    resetAuth() {
      this.token = undefined;
    },
  },
  persist: true,
});

export default useAuth;
