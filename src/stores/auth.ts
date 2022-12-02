import { defineStore } from 'pinia';
import type { AuthToken } from '@/types/auth';
import {
  loginWithCredentials,
  sendLoginLink,
  loginWithLink,
  loginWithUserId,
  changePassword,
  requestReset,
} from '@/api/auth';
import useToasts from './toasts';

type AuthStoreState = {
  token: AuthToken | undefined;
};

const useAuth = defineStore('auth', {
  state: (): AuthStoreState => {
    return {
      token: undefined,
    };
  },
  actions: {
    async loginWithCredentials(username: string, password: string) {
      try {
        const loginResult = await loginWithCredentials(username, password);
        this.token = loginResult.token;
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
        const loginResult = await loginWithLink(passwordlessToken);
        this.token = loginResult.token;
      } catch (error: any) {}
    },
    async loginWithUserId(userId: string) {
      try {
        const loginResult = await loginWithUserId(userId);
        this.token = loginResult.token;
      } catch (error: any) {}
    },
    async changePassword(newPassword1: string, newPassword2: string) {
      try {
        await changePassword(newPassword1, newPassword2);
        const toasts = useToasts();
        toasts.addMessage('Новый пароль сохранен', 'success');
      } catch (error: any) {}
    },
    async requestReset(email: string) {
      try {
        await requestReset(email);
        const toasts = useToasts();
        toasts.addMessage('Письмо отправлено!', 'success');
      } catch (error: any) {}
    },
    resetAuth() {
      this.token = undefined;
    },
  },
  persist: true,
});

export default useAuth;
