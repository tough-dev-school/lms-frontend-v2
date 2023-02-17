<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import { ref, computed } from 'vue';
  import { onKeyStroke } from '@vueuse/core';
  import useAuth from '@/stores/auth';
  import { useRouter, useRoute } from 'vue-router';

  const auth = useAuth();
  const router = useRouter();
  const route = useRoute();

  const username = ref('');
  const password = ref('');

  const isCredentialsInvalid = computed(
    () => !(username.value && password.value),
  );

  const loginWithCredentials = async () => {
    await auth.loginWithCredentials(username.value, password.value);
    if (auth.token) {
      route.query.next
        ? router.push({ path: decodeURIComponent(String(route.query.next)) })
        : router.push({ name: 'home' });
    }
  };

  const emit = defineEmits<{
    (e: 'change'): void;
  }>();

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    if (isCredentialsInvalid.value) return;
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
        :disabled="isCredentialsInvalid"
        class="flex-grow"
        >Войти</VButton
      >
      <VButton appearance="link" @click="emit('change')" class="flex-grow">
        Войти по ссылке
      </VButton>
    </template>
  </VCard>
</template>
