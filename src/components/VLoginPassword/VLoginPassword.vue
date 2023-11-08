<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
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
    change: [];
  }>();
</script>

<template>
  <VCard tag="form" @submit.prevent="loginWithCredentials">
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
    <div class="flex flex-col gap-16">
      <VTextInput
        v-model="username"
        autocomplete="username"
        label="Логин"
        :type="isEmail ? 'email' : 'text'" />
      <VTextInput
        v-model="password"
        autocomplete="current-password"
        type="password">
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
      <VButton appearance="link" class="flex-grow" @click="emit('change')">
        Войти по ссылке
      </VButton>
    </template>
  </VCard>
</template>
