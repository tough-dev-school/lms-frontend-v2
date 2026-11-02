<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { authPasswordlessTokenRequestRetrieve } from '@/api/generated';
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';
  import { useI18n } from 'vue-i18n';

  const emit = defineEmits<{ change: [] }>();

  const router = useRouter();
  const { t } = useI18n();
  const email = ref('');
  const isPending = ref(false);
  const error = ref<FormError | null>(null);

  const handleLogin = async () => {
    try {
      isPending.value = true;
      await authPasswordlessTokenRequestRetrieve(email.value);

      void router.push({ name: 'mail-sent', query: { email: email.value } });
    } catch (caughtError) {
      error.value = caughtError as FormError;
    }
    isPending.value = false;
  };
</script>

<template>
  <VCard
    tag="form"
    :title="t('login.title')"
    @submit.prevent="handleLogin"
  >
    <VTextInput
      v-model="email"
      :label="t('common.emailPurchased')"
      :tip="t('login.linkTip')"
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
        {{ isPending ? t('common.sendingEmail') : t('login.getAccess') }}
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
