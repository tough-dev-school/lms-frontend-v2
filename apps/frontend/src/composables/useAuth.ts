import type { AuthToken } from '@/types';
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

  return {
    token,
  };
});
