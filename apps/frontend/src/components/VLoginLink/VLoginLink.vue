<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { useForm } from '@inertiajs/vue3';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';

  const emit = defineEmits<{ change: [] }>();
  const { t } = useI18n();
  const form = useForm({ email: '' });

  const handleLogin = () => {
    form.post('/login/link');
  };
</script>

<template>
  <VCard
    tag="form"
    :title="t('login.title')"
    @submit.prevent="handleLogin"
  >
    <VTextInput
      v-model="form.email"
      :label="t('common.emailPurchased')"
      :tip="t('login.linkTip')"
      type="email"
      autocomplete="username"
      name="email"
      :error="form.errors"
    />
    <VError
      :error="form.errors"
      :whitelist="['non_field_errors']"
    />
    <template #footer>
      <VButton
        type="submit"
        class="flex-grow"
        :loading="form.processing"
      >
        {{ form.processing ? t('common.sendingEmail') : t('login.getAccess') }}
      </VButton>
      <VButton
        appearance="link"
        data-testid="to-password-mode"
        class="flex-grow"
        @click="emit('change')"
      >
        {{ t('login.withPassword') }}
      </VButton>
    </template>
  </VCard>
</template>
