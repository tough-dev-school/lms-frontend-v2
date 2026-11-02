<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
  import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
  import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';
  import VPreferencesSettings from '@/components/VPreferencesSettings/VPreferencesSettings.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useAuthPasswordChangeCreate } from '@/api/generated';
  import { useI18n } from 'vue-i18n';

  const queryClient = useQueryClient();
  const { t } = useI18n();

  const {
    mutateAsync: changePassword,
    error,
    isPending: isPasswordChangePending,
  } = useAuthPasswordChangeCreate({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries();
      },
    },
  });

  const handleSave = async (password: string) => {
    await changePassword({
      data: {
        new_password1: password,
        new_password2: password,
      },
    });
  };
</script>

<template>
  <VLoggedLayout :title="t('settings.title')">
    <VCard>
      <ul>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#links' }"
            data-testid="links-link"
          >
            {{ t('settings.links') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            data-testid="password-link"
            :to="{ name: 'settings', hash: '#password' }"
          >
            {{ t('settings.password') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#certificate' }"
            data-testid="certificate-link"
          >
            {{ t('settings.certificate') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#avatar' }"
            data-testid="avatar-link"
          >
            {{ t('settings.avatar') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#preferences' }"
            data-testid="preferences-link"
          >
            {{ t('settings.preferences') }}
          </RouterLink>
        </li>
      </ul>
    </VCard>
    <VLinksSettings
      id="links"
      data-testid="links-settings"
    />
    <VPasswordResetForm
      id="password"
      :title="t('settings.password')"
      data-testid="password-settings"
      :is-pending="isPasswordChangePending"
      :error="error"
      @save="handleSave"
    />
    <VCertificateSettings
      id="certificate"
      data-testid="certificate-settings"
    />
    <VAvatarSettings
      id="avatar"
      data-testid="avatar-settings"
    />
    <VPreferencesSettings
      id="preferences"
      data-testid="preferences-settings"
    />
  </VLoggedLayout>
</template>
