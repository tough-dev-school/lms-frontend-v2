<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import { useAuthPasswordResetConfirmCreate } from '@/api/generated';
  import { useQueryClient } from '@tanstack/vue-query';
  import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';

  const props = defineProps<{
    uid: string;
    token: string;
  }>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutateAsync: changePassword,
    error,
    isPending,
  } = useAuthPasswordResetConfirmCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  const handleSave = async (password: string) => {
    try {
      await changePassword({
        data: {
          new_password1: password,
          new_password2: password,
          uid: props.uid,
          token: props.token,
        },
      });
      router.push({ name: 'login' });
    } catch (error_) {
      console.error('Failed to change password', error_);
      // handled in the mutation
    }
  };
</script>

<template>
  <VPublicLayout>
    <VPasswordResetForm
      title="Сброс пароля"
      :is-pending="isPending"
      :error="error"
      @save="handleSave"
    />
  </VPublicLayout>
</template>
