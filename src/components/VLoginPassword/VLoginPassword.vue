<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VButton } from '@/components/VButton';
  import { VCard } from '@/components/VCard';
  import { VTextInput } from '@/components/VTextInput';
  import { ref, computed } from 'vue';
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

  const isEmail = computed(() => {
    return username.value.includes('@');
  });

  const emit = defineEmits<{
    change: [undefined];
  }>();
</script>

<template>
  <VCard tag="form" @submit.prevent="loginWithCredentials">
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
    <div class="flex flex-col gap-16">
      <VTextInput
        autocomplete="username"
        label="Логин"
        :type="isEmail ? 'email' : 'text'"
        v-model="username" />
      <VTextInput
        autocomplete="current-password"
        type="password"
        v-model="password">
        <template #label
          >Пароль
          <span class="text-sub">
            (<button
              class="underline"
              type="button"
              @click="router.push({ name: 'login-reset' })">
              Не помню пароль</button
            >)
          </span></template
        >
      </VTextInput>
    </div>
    <template #footer>
      <VButton :disabled="isCredentialsInvalid" class="flex-grow" type="submit"
        >Войти</VButton
      >
      <VButton appearance="link" @click="emit('change')" class="flex-grow">
        Войти по ссылке
      </VButton>
    </template>
  </VCard>
</template>
