import type { AuthToken } from '@/types';
import * as authApi from '@/api/auth';
import useToasts from './toasts';
import { computed } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';

type AuthStoreState = {
  token: AuthToken | undefined;
};

export const useAuth = createGlobalState(() => {
  const storage = useStorage<AuthStoreState>('auth', {
    token: undefined,
  });

  const token = computed({
    get: () => storage.value.token,
    set: (value) => {
      storage.value.token = value;
    },
  });

  const loginWithCredentials = async (username: string, password: string) => {
    try {
      const loginResult = await authApi.loginWithCredentials(
        username,
        password,
      );
      addToken(loginResult.token);
    } catch (error: any) {}
  };

  const loginWithEmail = async (email: string) => {
    try {
      await authApi.sendLoginLink(email);
    } catch (error: any) {}
  };

  const exchangeTokens = async (passwordlessToken: string) => {
    try {
      const loginResult = await authApi.loginWithLink(passwordlessToken);
      addToken(loginResult.token);
    } catch (error: any) {}
  };

  const loginWithUserId = async (userId: string) => {
    try {
      const loginResult = await authApi.loginWithUserId(userId);
      addToken(loginResult.token);
    } catch (error: any) {}
  };

  const changePassword = async ({
    newPassword1,
    newPassword2,
    uid,
    token,
  }: {
    newPassword1: string;
    newPassword2: string;
    uid?: string;
    token?: string;
  }) => {
    const { addMessage } = useToasts();

    const savedToast = () => addMessage('Новый пароль сохранен', 'success');

    if (uid && token) {
      try {
        await authApi.resetPassword(newPassword1, newPassword2, uid, token);
        savedToast();
        return Promise.resolve();
      } catch (error: any) {
        return Promise.reject();
      }
    } else {
      try {
        await authApi.changePassword(newPassword1, newPassword2);
        savedToast();
        return Promise.resolve();
      } catch (error: any) {
        return Promise.reject();
      }
    }
  };

  const requestReset = async (email: string) => {
    try {
      await authApi.requestReset(email);
    } catch (error: any) {
      console.error(error);
    }
  };

  const addToken = (token: AuthToken) => {
    storage.value.token = token;
  };

  const removeToken = () => {
    token.value = undefined;
  };

  return {
    token,
    loginWithCredentials,
    loginWithEmail,
    exchangeTokens,
    loginWithUserId,
    changePassword,
    requestReset,
    addToken,
    removeToken,
  };
});
