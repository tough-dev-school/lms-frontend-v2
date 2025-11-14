import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useLoginWithUserIdMutation } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export const loginById = async (to: RouteLocationNormalized) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: loginWithUserId } =
    useLoginWithUserIdMutation(queryClient);
  const { token: newToken } = await loginWithUserId(Number(to.params.userId));

  token.value = newToken;

  return { name: 'courses' };
};
