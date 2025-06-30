import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/stores/auth';

export const loginByToken = async (to: RouteLocationNormalized) => {
  const { exchangeTokens } = useAuth();
  await exchangeTokens(String(to.params.passwordlessToken));
  return { name: 'home' };
};
