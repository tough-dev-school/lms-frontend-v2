<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import { ref } from 'vue';
  import { onKeyStroke } from '@vueuse/core';
  import useAuth from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const auth = useAuth();
  const router = useRouter();

  const email = ref('');

  const loginWithEmail = async () => {
    await auth.loginWithEmail(email.value);
    if (auth.token) router.push({ name: 'home' });
  };

  const handleResetRequest = async () => {
    await auth.requestReset(email.value);
  };

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    loginWithEmail();

    e.preventDefault();
  });
</script>

<template>
  <VCard class="mt-[25vh] pb-32">
    <VHeading tag="h1" class="mb-32">Сброс пароля</VHeading>
    <VTextInput
      label="Электронная почта"
      tip="Мы отправим ссылку для сброса пароля по этому адресу"
      type="email"
      v-model="email" />
    <div class="mt-32 flex flex-wrap gap-8">
      <VButton @click="handleResetRequest" :disabled="!email" class="flex-grow"
        >Отправить письмо</VButton
      >
      <VButton
        tag="link"
        @click="router.push({ name: 'login' })"
        class="flex-grow">
        Войти по паролю
      </VButton>
    </div>
  </VCard>
</template>
