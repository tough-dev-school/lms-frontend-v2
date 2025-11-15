import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useAuthAsRetrieve } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';

export const loginById = async (to: RouteLocationNormalized) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: loginWithUserId } = useAuthAsRetrieve({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });
  const { token: newToken } = await loginWithUserId(Number(to.params.userId));

  token.value = newToken;

  return { name: 'courses' };
};
