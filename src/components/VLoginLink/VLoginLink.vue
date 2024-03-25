<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref } from 'vue';
  import useAuth from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const auth = useAuth();
  const router = useRouter();

  const email = ref('');
  const disabled = ref(false);

  const loginWithEmail = async () => {
    try {
      disabled.value = true;
      await auth.loginWithEmail(email.value);
      router.push({ name: 'mail-sent', query: { email: email.value } });
    } catch (e) {
      disabled.value = false;
    }
  };

  const emit = defineEmits<{ change: [] }>();
</script>

<template>
  <VCard tag="form" @submit.prevent="loginWithEmail">
    <VHeading tag="h1" class="mb-32">Вход и регистрация</VHeading>
    <VTextInput
      v-model="email"
      label="Электронная почта"
      tip="Мы отправим ссылку для входа по этому адресу"
      type="email"
      autocomplete="username" />
    <template #footer>
      <VButton type="submit" :disabled="disabled || !email" class="flex-grow"
        >Получить доступ</VButton
      >
      <VButton
        appearance="link"
        data-testid="to-password-mode"
        class="flex-grow"
        @click="emit('change')">
        Войти через пароль
      </VButton>
    </template>
  </VCard>
</template>
