<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useLoginWithLinkMutation } from '@/query';
  import VError from '@/components/VError/VError.vue';

  const router = useRouter();
  const queryClient = useQueryClient();
  const email = ref('');
  const isPending = ref(false);

  const { mutateAsync: loginWithLink, error } =
    useLoginWithLinkMutation(queryClient);

  const handleLogin = async () => {
    try {
      isPending.value = true;
      await loginWithLink({ email: email.value });

      router.push({ name: 'mail-sent', query: { email: email.value } });
    } catch {
      console.error('Failed to login with email');
    }
    isPending.value = false;
  };

  const emit = defineEmits<{ change: [] }>();
</script>

<template>
  <VCard
    tag="form"
    title="Вход"
    @submit.prevent="handleLogin"
  >
    <VTextInput
      v-model="email"
      label="Почта, на которую купили курс"
      tip="Мы отправим ссылку для входа по этому адресу"
      type="email"
      autocomplete="username"
      name="email"
      :error="error"
    />
    <VError
      :error="error"
      :whitelist="['non_field_errors']"
    />
    <template #footer>
      <VButton
        type="submit"
        class="flex-grow"
        :loading="isPending"
      >
        {{ isPending ? 'Отправляем письмо...' : 'Получить доступ' }}
      </VButton>
      <VButton
        appearance="link"
        data-testid="to-password-mode"
        class="flex-grow"
        @click="emit('change')"
      >
        Войти через пароль
      </VButton>
    </template>
  </VCard>
</template>
