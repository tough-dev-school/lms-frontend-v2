import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { authAsRetrieve } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';

export const loginById = async (to: RouteLocationNormalized) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const loginWithUserId = async (userId: number) => {
    try {
      const response = await authAsRetrieve(userId);
      queryClient.invalidateQueries();
      return response;
    } catch {
      throw new Error('Failed to login');
    }
  };

  const { token: newToken } = await loginWithUserId(Number(to.params.userId));

  token.value = newToken;

  return { name: 'courses' };
};
