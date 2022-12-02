<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import { ref } from 'vue';
  import { onKeyStroke } from '@vueuse/core';
  import useAuth from '@/stores/auth';
  import { useRouter, useRoute } from 'vue-router';

  const withPassword = ref(false);

  const auth = useAuth();
  const router = useRouter();
  const route = useRoute();

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
    if (auth.token) go();
  };

  const loginWithCredentials = async () => {
    await auth.loginWithCredentials(username.value, password.value);
    if (auth.token) go();
  };

  const go = () => {
    if (route.query.next) {
      router.push(String(route.query.next));
    } else {
      router.push({ name: 'home' });
    }
  };

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    withPassword.value ? loginWithCredentials() : loginWithEmail();

    e.preventDefault();
  });
</script>

<template>
  <vCard class="mt-[25vh] pb-32">
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
    <template v-if="withPassword === false">
      <VTextInput
        label="Электронная почта"
        tip="Мы отправим ссылку для входа по этому адресу"
        type="email"
        v-model="email" />
      <div class="mt-32 flex flex-wrap gap-8">
        <VButton @click="loginWithEmail" :disabled="!email" class="flex-grow"
          >Получить доступ</VButton
        >
        <VButton
          @click="changeLoginType(true)"
          tag="link"
          data-testid="to-password-mode"
          class="flex-grow">
          Войти через пароль
        </VButton>
      </div>
    </template>
    <template v-if="withPassword === true">
      <div class="flex flex-col gap-16">
        <VTextInput label="Логин" type="text" v-model="username" />
        <VTextInput label="Пароль" type="password" v-model="password" />
      </div>
      <div class="mt-32 flex flex-wrap gap-8">
        <VButton
          @click="loginWithCredentials"
          :disabled="!(username && password)"
          class="flex-grow"
          >Войти</VButton
        >
        <VButton tag="link" @click="changeLoginType(false)" class="flex-grow">
          Войти по ссылке
        </VButton>
      </div>
    </template>
  </vCard>
</template>
