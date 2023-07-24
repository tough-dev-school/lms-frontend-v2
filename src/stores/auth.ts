import type { AuthToken } from '@/types/auth';

import {
  changePassword,
  loginWithCredentials,
  loginWithLink,
  loginWithUserId,
  requestReset,
  resetPassword,
  sendLoginLink,
} from '@/api/auth';
import { defineStore } from 'pinia';

import useToasts from './toasts';

type AuthStoreState = {
  token: AuthToken | undefined;
};

const useAuth = defineStore('auth', {
  actions: {
    async changePassword({
      newPassword1,
      newPassword2,
      token,
      uid,
    }: {
      newPassword1: string;
      newPassword2: string;
      token?: string;
      uid?: string;
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
    async exchangeTokens(passwordlessToken: string) {
      try {
        const loginResult = await loginWithLink(passwordlessToken);
        this.token = loginResult.token;
      } catch (error: any) {}
    },
    async loginWithCredentials(username: string, password: string) {
      try {
        const loginResult = await loginWithCredentials(username, password);
        this.token = loginResult.token;
      } catch (error: any) {}
    },
    async loginWithEmail(email: string) {
      try {
        await sendLoginLink(email);
      } catch (error: any) {}
    },
    async loginWithUserId(userId: string) {
      try {
        const loginResult = await loginWithUserId(userId);
        this.token = loginResult.token;
      } catch (error: any) {}
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
  state: (): AuthStoreState => {
    return {
      token: undefined,
    };
  },
});

export default useAuth;
