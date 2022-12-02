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

  onKeyStroke('Enter', (e: KeyboardEvent) => {
    loginWithEmail();

    e.preventDefault();
  });
</script>

<template>
  <VCard>
    <VHeading level="1" class="mb-32">Сброс пароля</VHeading>
    <VTextInput
      label="Электронная почта"
      tip="Мы отправим ссылку для сброса пароля по этому адресу"
      type="email"
      v-model="email" />
    <div class="mt-32 flex flex-wrap gap-8">
      <VButton @click="loginWithEmail" :disabled="!email" class="flex-grow"
        >Отправить письмо</VButton
      >
    </div>
  </VCard>
</template>
