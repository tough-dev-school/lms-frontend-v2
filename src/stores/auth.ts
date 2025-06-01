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
import { useQueryClient } from '@tanstack/vue-query';
import { baseQueryKey } from '@/query';
import { watch } from 'vue';

type AuthStoreState = {
  token: AuthToken | undefined;
};

export const useAuth = defineStore('auth', {
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
      if (uid && token) {
        try {
          await resetPassword(newPassword1, newPassword2, uid, token);
          return Promise.resolve();
        } catch (error: any) {
          return Promise.reject();
        }
      } else {
        try {
          await changePassword(newPassword1, newPassword2);
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
    },
    removeToken() {
      this.token = undefined;
    },
  },
  persist: true,
});

export const useInvalidateOnTokenChange = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  watch(
    () => auth.token,
    () => {
      queryClient.invalidateQueries({ queryKey: baseQueryKey() });
    },
  );
};

export default useAuth;
