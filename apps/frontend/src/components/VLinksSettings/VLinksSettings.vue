<script lang="ts" setup>
  import { useForm, usePage } from '@inertiajs/vue3';
  import VTextInput from '@/components/VTextInput/VTextInput.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const page = usePage();

  const form = useForm({
    github_username: page.props.user?.github_username ?? '',
    linkedin_username: page.props.user?.linkedin_username ?? '',
    telegram_username: page.props.user?.telegram_username ?? '',
  });

  const saveProfile = () => {
    form.patch('/settings/profile', { preserveScroll: true });
  };
</script>

<template>
  <VCard :title="t('settings.links')">
    <div class="flex flex-col items-start gap-16 tablet:gap-24">
      <VTextInput
        v-model="form.github_username"
        :label="t('linksSettings.github')"
        data-testid="github"
        name="github_username"
        :error="form.errors"
      />
      <VTextInput
        v-model="form.linkedin_username"
        :label="t('linksSettings.linkedin')"
        data-testid="linkedin"
        name="linkedin_username"
        :error="form.errors"
      />
      <VTextInput
        v-model="form.telegram_username"
        :label="t('linksSettings.telegram')"
        data-testid="telegram"
        name="telegram_username"
        :error="form.errors"
      />
    </div>
    <VError
      :error="form.errors"
      :whitelist="['non_field_errors']"
    />
    <template #footer>
      <VButton
        data-testid="save"
        :loading="form.processing"
        @click="saveProfile"
      >
        {{ form.processing ? t('common.saving') : t('common.save') }}
      </VButton>
    </template>
  </VCard>
</template>
