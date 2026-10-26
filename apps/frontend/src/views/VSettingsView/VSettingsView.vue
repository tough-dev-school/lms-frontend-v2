<script lang="ts" setup>
  import { Link, useForm } from '@inertiajs/vue3';
  import VCard from '@/components/VCard/VCard.vue';
  import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
  import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
  import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';
  import VPreferencesSettings from '@/components/VPreferencesSettings/VPreferencesSettings.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';

  const { t } = useI18n();

  const passwordForm = useForm({ new_password1: '', new_password2: '' });

  const handleSave = (password: string) => {
    passwordForm.new_password1 = password;
    passwordForm.new_password2 = password;
    passwordForm.post('/settings/password', {
      preserveScroll: true,
      onFinish: () => passwordForm.reset(),
    });
  };

  // Plain anchors, the sections are on this page and jumping to them needs no visit
  const sections = [
    { id: 'links', label: 'settings.links' },
    { id: 'password', label: 'settings.password' },
    { id: 'certificate', label: 'settings.certificate' },
    { id: 'avatar', label: 'settings.avatar' },
    { id: 'preferences', label: 'settings.preferences' },
  ] as const;
</script>

<template>
  <VLoggedLayout :title="t('settings.title')">
    <VCard>
      <ul>
        <li
          v-for="section in sections"
          :key="section.id"
        >
          <!-- preserve-state keeps what the student typed in the forms below -->
          <Link
            class="link"
            :href="urls.settings(section.id)"
            :data-testid="`${section.id}-link`"
            preserve-state
          >
            {{ t(section.label) }}
          </Link>
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
      :is-pending="passwordForm.processing"
      :error="passwordForm.errors"
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
