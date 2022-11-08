<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import { ref } from 'vue';
  import { onKeyStroke } from '@vueuse/core';
  import useAuth from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const withPassword = ref(false);

  const auth = useAuth();
  const router = useRouter();

  const email = ref('');

  const username = ref('');
  const password = ref('');

  const clearInputs = () => {
    email.value = '';
    username.value = '';
    password.value = '';
  };

  const changeLoginType = (value: boolean) => {
    clearInputs();

    withPassword.value = value;
  };

  const loginWithEmail = async () => {
    await auth.loginWithEmail(email.value);
    if (auth.token) router.push({ name: 'profile' });
  };

  const loginWithCredentials = async () => {
    await auth.loginWithCredentials(username.value, password.value);
    if (auth.token) router.push({ name: 'profile' });
  };

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    withPassword.value ? loginWithCredentials() : loginWithEmail();

    e.preventDefault();
  });
</script>

<template>
  <div class="max-w-prose pt-[25vh]">
    <VHeading level="1" class="mb-32">Вход и регистрация</VHeading>
    <template v-if="withPassword === false">
      <VTextInput
        label="Электронная почта"
        tip="Мы отправим ссылку для входа по этому адресу"
        type="email"
        data-testid="email"
        v-model="email" />
      <div class="mt-32 flex flex-wrap gap-8">
        <VButton
          @click="loginWithEmail"
          :disabled="!email"
          class="flex-grow"
          data-testid="send"
          >Получить доступ</VButton
        >
        <VButton
          @click="changeLoginType(true)"
          type="link"
          data-testid="to-password-mode"
          class="flex-grow">
          Войти через пароль
        </VButton>
      </div>
    </template>
    <div v-if="withPassword === true">
      <div class="flex flex-col gap-16">
        <VTextInput
          label="Логин"
          type="text"
          v-model="username"
          data-testid="username" />
        <VTextInput
          label="Пароль"
          type="password"
          v-model="password"
          data-testid="password" />
      </div>
      <div class="mt-32 flex flex-wrap gap-8">
        <VButton
          @click="loginWithCredentials"
          :disabled="!(username && password)"
          class="flex-grow"
          data-testid="login"
          >Войти</VButton
        >
        <VButton type="link" @click="changeLoginType(false)" class="flex-grow">
          Войти по ссылке
        </VButton>
      </div>
    </div>
  </div>
</template>
