import type { RouteLocationNormalized } from 'vue-router';
import { useExchangeTokensMutation } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { useAuth } from '@/stores/auth';

export const loginByToken = async (to: RouteLocationNormalized) => {
  const queryClient = useQueryClient();
  const { handleLogin } = useAuth();

  const { mutateAsync: exchangeTokens } =
    useExchangeTokensMutation(queryClient);

  const { token } = await exchangeTokens({
    token: String(to.params.passwordlessToken),
  });

  handleLogin(token);

  return { name: 'home' };
};
