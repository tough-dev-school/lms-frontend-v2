<script lang="ts" setup>
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import { computed } from 'vue';
  import { Link, useForm } from '@inertiajs/vue3';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';

  const props = defineProps<{
    redirectTo?: string | null;
  }>();

  const emit = defineEmits<{
    change: [];
  }>();

  const { t } = useI18n();

  const form = useForm({ username: '', password: '' });

  const handleSubmit = () => {
    // The server only follows local paths, so this can't send anyone off-site
    form
      .transform((data) => ({ ...data, redirectTo: props.redirectTo }))
      .post('/login/password', { onFinish: () => form.reset('password') });
  };

  const isEmail = computed(() => {
    return form.username.includes('@');
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
        v-model="form.username"
        autocomplete="username"
        :label="t('login.username')"
        :type="isEmail ? 'email' : 'text'"
        name="username"
        :error="form.errors"
      />
      <VTextInput
        v-model="form.password"
        autocomplete="current-password"
        type="password"
        name="password"
        :error="form.errors"
      >
        <template #label>
          {{ t('login.password') }}
          <span class="text-sub">
            (<Link
              class="underline"
              tabindex="-1"
              :href="urls.loginReset()"
            >
              {{ t('login.forgotPassword') }}</Link
            >)
          </span>
        </template>
      </VTextInput>
      <VError
        :error="form.errors"
        :whitelist="['non_field_errors']"
      />
    </div>
    <template #footer>
      <VButton
        :loading="form.processing"
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
