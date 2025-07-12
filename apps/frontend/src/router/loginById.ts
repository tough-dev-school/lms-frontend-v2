import type { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/stores/auth';
import { useLoginWithUserIdMutation } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export const loginById = async (to: RouteLocationNormalized) => {
  const { handleLogin } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync: loginWithUserId } =
    useLoginWithUserIdMutation(queryClient);
  const { token } = await loginWithUserId(Number(to.params.userId));

  handleLogin(token);

  return { name: 'home' };
};
