<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import { useAuthPasswordResetCreate } from '@/api/generated';
  import { useQueryClient } from '@tanstack/vue-query';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';

  const router = useRouter();
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const email = ref('');

  const {
    mutateAsync: requestReset,
    error,
    isPending,
  } = useAuthPasswordResetCreate({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries();
      },
    },
  });

  const handleResetRequest = async () => {
    try {
      await requestReset({ data: { email: email.value } });
      void router.push({ name: 'mail-sent', query: { email: email.value } });
    } catch {
      console.error('Failed to request reset');
    }
  };
</script>

<template>
  <VPublicLayout>
    <VCard
      tag="form"
      :title="t('loginReset.title')"
      @submit.prevent="handleResetRequest"
    >
      <VTextInput
        v-model="email"
        :label="t('common.emailPurchased')"
        :tip="t('loginReset.tip')"
        type="email"
        autocomplete="username"
        data-testid="email"
        name="email"
        :error="error"
      />
      <VError
        :error="error"
        :whitelist="['non_field_errors']"
      />
      <template #footer>
        <VButton
          class="flex-grow"
          type="submit"
          data-testid="send"
          :loading="isPending"
        >
          {{ isPending ? t('common.sendingEmail') : t('loginReset.sendEmail') }}
        </VButton>
        <VButton
          appearance="link"
          class="flex-grow"
          data-testid="password"
          @click="router.push({ name: 'login' })"
        >
          {{ t('loginReset.withPassword') }}
        </VButton>
      </template>
    </VCard>
  </VPublicLayout>
</template>
