<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VButton from '@/components/VButton.vue';
  import VCard from '@/components/VCard.vue';
  import VTextInput from '@/components/VTextInput.vue';
  import { ref } from 'vue';
  import useAuth from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const auth = useAuth();
  const router = useRouter();

  const email = ref('');

  const loginWithEmail = async () => {
    await auth.loginWithEmail(email.value);
    router.push({ name: 'mail-sent', query: { email: email.value } });
  };

  const emit = defineEmits<{ change: [] }>();
</script>

<template>
  <VCard tag="form" @submit.prevent="loginWithEmail">
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
    <VTextInput
      label="Электронная почта"
      tip="Мы отправим ссылку для входа по этому адресу"
      type="email"
      autocomplete="username"
      v-model="email" />
    <template #footer>
      <VButton type="submit" :disabled="!email" class="flex-grow"
        >Получить доступ</VButton
      >
      <VButton
        @click="emit('change')"
        appearance="link"
        data-testid="to-password-mode"
        class="flex-grow">
        Войти через пароль
      </VButton>
    </template>
  </VCard>
</template>
