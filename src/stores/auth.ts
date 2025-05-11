import { defineStore } from 'pinia';
import type { AuthToken } from '@/types';
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
import { useQueryClient } from '@tanstack/vue-query';
import { baseQueryKey } from '@/query';

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
        this.addToken(loginResult.token);
      } catch (error: any) {}
    },
    async loginWithEmail(email: string) {
      try {
        await sendLoginLink(email);
      } catch (error: any) {}
    },
    async exchangeTokens(passwordlessToken: string) {
      try {
        const loginResult = await loginWithLink(passwordlessToken);
        this.addToken(loginResult.token);
      } catch (error: any) {}
    },
    async loginWithUserId(userId: string) {
      try {
        const loginResult = await loginWithUserId(userId);
        this.addToken(loginResult.token);
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
    addToken(token: AuthToken) {
      this.token = token;
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: baseQueryKey() });
    },
    removeToken() {
      this.token = undefined;
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: baseQueryKey() });
    },
  },
  persist: true,
});

export default useAuth;
