import type { AuthToken } from '@/types';
import { computed, watch } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

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

  const router = useRouter();

  watch(token, (value) => {
    if (!router) return; // We need this because useAuth may be called before router is initialized
    if (value === undefined && router.currentRoute.value.meta.requiresAuth) {
      router.push({ name: 'login' });
    }
  });

  return {
    token,
  };
});
