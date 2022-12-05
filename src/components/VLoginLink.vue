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

  const emit = defineEmits<{ (e: 'change', value: 'password'): void }>();

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    loginWithEmail();

    e.preventDefault();
  });
</script>

<template>
  <VCard>
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
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
        @click="emit('change', 'password')"
        tag="link"
        data-testid="to-password-mode"
        class="flex-grow">
        Войти через пароль
      </VButton>
    </div>
  </VCard>
</template>
