import { computed } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';

interface AuthStoreState {
  token: string | undefined;
}

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
