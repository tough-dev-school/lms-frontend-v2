<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref, computed } from 'vue';
  import { useAuth } from '@/composables/useAuth';
  import { useRouter } from 'vue-router';
  import { useLoginWithCredentialsMutation } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  const queryClient = useQueryClient();

  const { token } = useAuth();

  const { mutateAsync: loginWithCredentials, isPending } =
    useLoginWithCredentialsMutation(queryClient);

  const router = useRouter();

  const username = ref('');
  const password = ref('');

  const isCredentialsInvalid = computed(
    () => !username.value || !password.value,
  );

  const handleSubmit = async () => {
    try {
      // @ts-expect-error #TODO JSONWebToken in, and out — must be fixed on backend
      const { token: newToken } = await loginWithCredentials({
        username: username.value,
        password: password.value,
      });

      token.value = newToken;

      if (router.currentRoute.value.query.redirectTo) {
        router.push(
          decodeURIComponent(
            router.currentRoute.value.query.redirectTo as string,
          ),
        );
      } else {
        router.push({ name: 'courses' });
      }
    } catch {
      console.error('Failed to login');
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
  <VCard tag="form" title="Вход" @submit.prevent="handleSubmit">
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
          </span>
        </template>
      </VTextInput>
    </div>
    <template #footer>
      <VButton
        :disabled="isCredentialsInvalid"
        :loading="isPending"
        class="flex-grow"
        type="submit">
        Войти
      </VButton>
      <VButton appearance="link" class="flex-grow" @click="emit('change')">
        Войти по ссылке
      </VButton>
    </template>
  </VCard>
</template>
