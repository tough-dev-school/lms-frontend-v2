import type { RouteLocationNormalized } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { useAuth } from '@/composables/useAuth';
import { authPasswordlessTokenRetrieve } from '@/api/generated';

export const loginByToken = async (to: RouteLocationNormalized) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const exchangeTokens = async (passwordlessToken: string) => {
    try {
      const response = await authPasswordlessTokenRetrieve(passwordlessToken);
      queryClient.invalidateQueries();
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login');
    }
  };

  const { token: newToken } = await exchangeTokens(
    String(to.params.passwordlessToken),
  );

  token.value = newToken;

  return { name: 'courses' };
};
