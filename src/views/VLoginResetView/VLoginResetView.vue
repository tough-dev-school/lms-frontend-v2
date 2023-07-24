<script lang="ts" setup>
  import { VButton } from '@/components/VButton';
  import { VCard } from '@/components/VCard';
  import { VHeading } from '@/components/VHeading';
  import { VTextInput } from '@/components/VTextInput';
  import useAuth from '@/stores/auth';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const auth = useAuth();
  const router = useRouter();

  const email = ref('');

  const handleResetRequest = async () => {
    await auth.requestReset(email.value);
    router.push({ name: 'mail-sent', query: { email: email.value } });
  };
</script>

<template>
  <VCard tag="form" @submit.prevent="handleResetRequest">
    <VHeading tag="h1" class="mb-32">Сброс пароля</VHeading>
    <VTextInput
      label="Электронная почта"
      tip="Мы отправим ссылку для сброса пароля по этому адресу"
      type="email"
      v-model="email"
      autocomplete="username"
      data-testid="email" />
    <template #footer>
      <VButton
        :disabled="!email"
        class="flex-grow"
        type="submit"
        data-testid="send"
        >Отправить письмо</VButton
      >
      <VButton
        appearance="link"
        @click="router.push({ name: 'login' })"
        class="flex-grow"
        data-testid="password">
        Войти по паролю
      </VButton>
    </template>
  </VCard>
</template>
