<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
  import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
  import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';
  import VPreferencesSettings from '@/components/VPreferencesSettings/VPreferencesSettings.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPasswordResetForm from '@/components/VPasswordResetForm/VPasswordResetForm.vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useAuthPasswordChangeCreate } from '@/api';

  const queryClient = useQueryClient();

  const {
    mutateAsync: changePassword,
    error,
    isPending: isPasswordChangePending,
  } = useAuthPasswordChangeCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries();
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
  <VLoggedLayout title="Настройки">
    <VCard>
      <ul>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#links' }"
            data-testid="links-link"
          >
            Ссылки
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            data-testid="password-link"
            :to="{ name: 'settings', hash: '#password' }"
          >
            Пароль
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#certificate' }"
            data-testid="certificate-link"
          >
            Данные для диплома
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#avatar' }"
            data-testid="avatar-link"
          >
            Аватар
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#preferences' }"
            data-testid="preferences-link"
          >
            Настройки темы
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
      title="Пароль"
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
