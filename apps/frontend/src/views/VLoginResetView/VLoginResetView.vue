<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref } from 'vue';
  import { useAuth } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';

  const { requestReset } = useAuth();
  const router = useRouter();

  const email = ref('');

  const isPending = ref(false);

  const handleResetRequest = async () => {
    isPending.value = true;
    try {
      await requestReset(email.value);
      router.push({ name: 'mail-sent', query: { email: email.value } });
    } catch {
      console.error('Failed to request reset');
    }
    isPending.value = false;
  };
</script>

<template>
  <VPublicLayout>
    <VCard tag="form" title="Сброс пароля" @submit.prevent="handleResetRequest">
      <VTextInput
        v-model="email"
        label="Электронная почта"
        tip="Мы отправим ссылку для сброса пароля по этому адресу"
        type="email"
        autocomplete="username"
        data-testid="email" />
      <template #footer>
        <VButton
          :disabled="!email"
          class="flex-grow"
          type="submit"
          data-testid="send"
          :loading="isPending">
          {{ isPending ? 'Отправляем письмо...' : 'Отправить письмо' }}
        </VButton>
        <VButton
          appearance="link"
          class="flex-grow"
          data-testid="password"
          @click="router.push({ name: 'login' })">
          Войти по паролю
        </VButton>
      </template>
    </VCard>
  </VPublicLayout>
</template>
