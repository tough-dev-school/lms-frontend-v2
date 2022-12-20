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

  const username = ref('');
  const password = ref('');

  const loginWithCredentials = async () => {
    await auth.loginWithCredentials(username.value, password.value);
    if (auth.token) router.push({ name: 'home' });
  };

  const emit = defineEmits<{
    (e: 'change', value: 'link'): void;
  }>();

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    loginWithCredentials();

    e.preventDefault();
  });
</script>

<template>
  <VCard>
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
    <div class="flex flex-col gap-16">
      <VTextInput label="Логин" type="text" v-model="username" />
      <VTextInput type="password" v-model="password">
        <template #label
          >Пароль
          <span class="text-sub">
            (<button
              class="underline"
              @click="router.push({ name: 'login-reset' })">
              Не помню пароль</button
            >)
          </span></template
        >
      </VTextInput>
    </div>
    <template #footer>
      <VButton
        @click="loginWithCredentials"
        :disabled="!(username && password)"
        class="flex-grow"
        >Войти</VButton
      >
      <VButton tag="link" @click="emit('change', 'link')" class="flex-grow">
        Войти по ссылке
      </VButton>
    </template>
  </VCard>
</template>
