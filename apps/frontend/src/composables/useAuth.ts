import { computed, watch } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { AllowMeta } from '@/types';

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

  const router = useRouter();

  watch(token, (value) => {
    if (!router) return; // We need this because useAuth may be called before router is initialized
    if (
      value === undefined &&
      router.currentRoute.value.meta.allow === AllowMeta.Authorized
    ) {
      router.push({ name: 'login' });
    }
  });

  return {
    token,
  };
});
