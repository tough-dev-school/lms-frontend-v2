<script lang="ts" setup>
  import Button from '@/components/Button.vue';
  import TextInput from '@/components/TextInput.vue';
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
  <div class="mx-auto max-w-prose pt-128">
    <h1 class="mb-32 font-display text-h1 font-bold">Вход и регистрация</h1>
    <template v-if="withPassword === false">
      <TextInput
        label="Электронная почта"
        tip="Мы отправим ссылку для входа по этому адресу"
        type="email"
        v-model="email" />
      <div class="mt-32 grid grid-cols-2 gap-8">
        <Button @click="loginWithEmail" :disabled="!email"
          >Получить доступ</Button
        >
        <Button @click="changeLoginType(true)" type="link">
          Войти через пароль
        </Button>
      </div>
    </template>
    <div v-if="withPassword === true">
      <div class="flex flex-col gap-16">
        <TextInput label="Логин" type="text" v-model="username" />
        <TextInput label="Пароль" type="password" v-model="password" />
      </div>
      <div class="mt-32 grid grid-cols-2 gap-8">
        <Button
          @click="loginWithCredentials"
          :disabled="!(username && password)"
          >Войти</Button
        >
        <Button type="link" @click="changeLoginType(false)">
          Войти по ссылке
        </Button>
      </div>
    </div>
  </div>
</template>
