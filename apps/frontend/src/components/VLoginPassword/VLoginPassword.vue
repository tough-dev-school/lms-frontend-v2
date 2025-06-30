<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref, computed } from 'vue';
  import useAuth from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    next?: string;
  }>();

  const { loginWithCredentials, token } = useAuth();
  const router = useRouter();

  const username = ref('');
  const password = ref('');

  const isCredentialsInvalid = computed(
    () => !(username.value && password.value),
  );

  const isPending = ref(false);

  const handleLogin = async () => {
    isPending.value = true;
    try {
      await loginWithCredentials(username.value, password.value);
      if (token.value) {
        props.next
          ? router.push({ path: decodeURIComponent(String(props.next)) })
          : router.push({ name: 'home' });
      }
    } catch {
      console.error('Failed to login');
    }
    isPending.value = false;
  };

  const isEmail = computed(() => {
    return username.value.includes('@');
  });

  const emit = defineEmits<{
    change: [];
  }>();
</script>

<template>
  <VCard tag="form" title="Вход и регистрация" @submit.prevent="handleLogin">
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
        <template #label>
          Пароль
          <span class="text-sub">
            (<button
              class="underline"
              type="button"
              tabindex="-1"
              @click="router.push({ name: 'login-reset' })">
              Не помню пароль</button
            >)
          </span></template
        >
      </VTextInput>
    </div>
    <template #footer>
      <VButton :disabled="isCredentialsInvalid" class="flex-grow" type="submit">
        Войти
      </VButton>
      <VButton appearance="link" class="flex-grow" @click="emit('change')">
        Войти по ссылке
      </VButton>
    </template>
  </VCard>
</template>
