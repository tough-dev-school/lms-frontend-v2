import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/stores/auth';

export const loginById = async (to: RouteLocationNormalized) => {
  const { loginWithUserId } = useAuth();
  await loginWithUserId(String(to.params.userId));

  return { name: 'home' };
};
