import type { RouteLocationNormalized } from 'vue-router';
import { useExchangeTokensMutation } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { useAuth } from '@/composables/useAuth';

export const loginByToken = async (to: RouteLocationNormalized) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { mutateAsync: exchangeTokens } =
    useExchangeTokensMutation(queryClient);

  const { token: newToken } = await exchangeTokens({
    token: String(to.params.passwordlessToken),
  });

  token.value = newToken;

  return { name: 'courses' };
};
