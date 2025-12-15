<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import { useAuthPasswordResetCreate } from '@/api';
  import { useQueryClient } from '@tanstack/vue-query';
  import VError from '@/components/VError/VError.vue';

  const router = useRouter();
  const queryClient = useQueryClient();
  const email = ref('');

  const {
    mutateAsync: requestReset,
    error,
    isPending,
  } = useAuthPasswordResetCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  const handleResetRequest = async () => {
    try {
      await requestReset({ data: { email: email.value } });
      router.push({ name: 'mail-sent', query: { email: email.value } });
    } catch {
      console.error('Failed to request reset');
    }
  };
</script>

<template>
  <VPublicLayout>
    <VCard
      tag="form"
      title="Сброс пароля"
      @submit.prevent="handleResetRequest"
    >
      <VTextInput
        v-model="email"
        label="Почта, на которую купили курс"
        tip="Мы отправим ссылку для сброса пароля по этому адресу"
        type="email"
        autocomplete="username"
        data-testid="email"
        name="email"
        :error="error"
      />
      <VError
        :error="error"
        :whitelist="['non_field_errors']"
      />
      <template #footer>
        <VButton
          class="flex-grow"
          type="submit"
          data-testid="send"
          :loading="isPending"
        >
          {{ isPending ? 'Отправляем письмо...' : 'Отправить письмо' }}
        </VButton>
        <VButton
          appearance="link"
          class="flex-grow"
          data-testid="password"
          @click="router.push({ name: 'login' })"
        >
          Войти по паролю
        </VButton>
      </template>
    </VCard>
  </VPublicLayout>
</template>
