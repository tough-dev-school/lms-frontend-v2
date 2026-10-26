<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { Link, useForm } from '@inertiajs/vue3';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';

  const { t } = useI18n();
  const form = useForm({ email: '' });

  const handleResetRequest = () => {
    form.post(urls.loginReset());
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
        v-model="form.email"
        :label="t('common.emailPurchased')"
        :tip="t('loginReset.tip')"
        type="email"
        autocomplete="username"
        data-testid="email"
        name="email"
        :error="form.errors"
      />
      <VError
        :error="form.errors"
        :whitelist="['non_field_errors']"
      />
      <template #footer>
        <VButton
          class="flex-grow"
          type="submit"
          data-testid="send"
          :loading="form.processing"
        >
          {{
            form.processing
              ? t('common.sendingEmail')
              : t('loginReset.sendEmail')
          }}
        </VButton>
        <VButton
          appearance="link"
          class="flex-grow"
          data-testid="password"
          :tag="Link"
          :href="urls.login()"
        >
          {{ t('loginReset.withPassword') }}
        </VButton>
      </template>
    </VCard>
  </VPublicLayout>
</template>
