import type { RouteLocationNormalized } from 'vue-router';

import useAuth from '@/stores/auth';

const loginByToken = async (to: RouteLocationNormalized) => {
  const auth = useAuth();
  await auth.exchangeTokens(String(to.params.passwordlessToken));
  return { name: 'home' };
};

export default loginByToken;
