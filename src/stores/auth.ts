import { defineStore } from 'pinia';
import type { AuthToken } from '@/types/auth';
import {
  loginWithCredentials,
  sendLoginLink,
  loginWithLink,
  loginWithUserId,
  changePassword,
  requestReset,
  resetPassword,
} from '@/api/auth';
import useToasts from './toasts';
import throttle from 'lodash/throttle';

type AuthStoreState = {
  token: AuthToken | undefined;
};

const throttledSendLoginLink = throttle(sendLoginLink, 30000);

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
        // Prevent spamming emails
        await throttledSendLoginLink(email);

        useToasts().addMessage(
          'Ссылка для входа отправлена на почту!',
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
    async changePassword({
      newPassword1,
      newPassword2,
      uid,
      token,
    }: {
      newPassword1: string;
      newPassword2: string;
      uid?: string;
      token?: string;
    }) {
      const savedToast = () =>
        useToasts().addMessage('Новый пароль сохранен', 'success');
      if (uid && token) {
        try {
          await resetPassword(newPassword1, newPassword2, uid, token);
          savedToast();
          return Promise.resolve();
        } catch (error: any) {
          return Promise.reject();
        }
      } else {
        try {
          await changePassword(newPassword1, newPassword2);
          savedToast();
          return Promise.resolve();
        } catch (error: any) {
          return Promise.reject();
        }
      }
    },
    async requestReset(email: string) {
      try {
        await requestReset(email);
      } catch (error: any) {}
    },
    resetAuth() {
      this.token = undefined;
    },
  },
  persist: true,
});

export default useAuth;
