import { defineStore } from 'pinia';
import { logInWithCredentials, sendLoginLink, logInWithLink } from '@/api/auth';
import useToasts from './toasts';

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
      } catch (error: any) {}
    },
    async loginWithEmail(email: string) {
      try {
        await sendLoginLink(email);
        const toasts = useToasts();
        toasts.addMessage(
          'Письмо с ссылкой для входа отправлено на почту!',
          'success',
        );
      } catch (error: any) {}
    },
    async exchangeTokens(passwordlessToken: string) {
      try {
        const response = await logInWithLink(passwordlessToken);
        this.token = response.data.token;
      } catch (error: any) {}
    },
    resetAuth() {
      this.token = undefined;
    },
  },
  persist: true,
});

export default useAuth;
