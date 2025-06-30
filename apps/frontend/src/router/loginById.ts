import type { RouteLocationNormalized } from 'vue-router';
import useAuth from '@/stores/auth';

const loginByToken = async (to: RouteLocationNormalized) => {
  const { loginWithUserId } = useAuth();
  await loginWithUserId(String(to.params.userId));

  return { name: 'home' };
};

export default loginByToken;
