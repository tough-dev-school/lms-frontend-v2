<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref, computed } from 'vue';
  import { useAuth } from '@/composables/useAuth';
  import { useRouter } from 'vue-router';
  import { useAuthTokenCreate } from '@/api/generated';
  import { useQueryClient } from '@tanstack/vue-query';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';

  const emit = defineEmits<{
    change: [];
  }>();

  const queryClient = useQueryClient();
  const { t } = useI18n();

  const { token } = useAuth();

  const {
    mutateAsync: loginWithCredentials,
    error,
    isPending,
  } = useAuthTokenCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  const router = useRouter();

  const username = ref('');
  const password = ref('');

  const handleSubmit = async () => {
    try {
      const { token: newToken } = await loginWithCredentials({
        data: {
          username: username.value,
          password: password.value,
        },
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
</script>

<template>
  <VCard
    tag="form"
    :title="t('login.title')"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col gap-16">
      <VTextInput
        v-model="username"
        autocomplete="username"
        :label="t('login.username')"
        :type="isEmail ? 'email' : 'text'"
        name="username"
        :error="error"
      />
      <VTextInput
        v-model="password"
        autocomplete="current-password"
        type="password"
        name="password"
        :error="error"
      >
        <template #label>
          {{ t('login.password') }}
          <span class="text-sub">
            (<button
              class="underline"
              type="button"
              tabindex="-1"
              @click="router.push({ name: 'login-reset' })"
            >
              {{ t('login.forgotPassword') }}</button
            >)
          </span>
        </template>
      </VTextInput>
      <VError
        :error="error"
        :whitelist="['non_field_errors']"
      />
    </div>
    <template #footer>
      <VButton
        :loading="isPending"
        class="flex-grow"
        type="submit"
      >
        {{ t('login.submit') }}
      </VButton>
      <VButton
        appearance="link"
        class="flex-grow"
        @click="emit('change')"
      >
        {{ t('login.withLink') }}
      </VButton>
    </template>
  </VCard>
</template>
