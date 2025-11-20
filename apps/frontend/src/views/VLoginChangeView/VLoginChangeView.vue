<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import { useAuthPasswordResetConfirmCreate } from '@/api/generated/hooks';
  import { useQueryClient } from '@tanstack/vue-query';
  import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';

  const props = defineProps<{
    uid: string;
    token: string;
  }>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: changePassword, isPending } =
    useAuthPasswordResetConfirmCreate({
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
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <VPublicLayout>
    <VPasswordResetForm
      title="Сброс пароля"
      :is-pending="isPending"
      @save="handleSave"
    />
  </VPublicLayout>
</template>
