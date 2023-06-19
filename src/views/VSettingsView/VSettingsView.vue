<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VCard } from '@/components/VCard';
  import { VPasswordSettings } from '@/components/VPasswordSettings';
  import { VLinksSettings } from '@/components/VLinksSettings';
  import { VCertificateSettings } from '@/components/VCertificateSettings';
</script>

<template>
  <div class="flex flex-col gap-32">
    <VHeading tag="h1">Настройки</VHeading>
    <VCard>
      <ul>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#links' }"
            data-testid="links-link"
            >Ссылки</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="link"
            data-testid="password-link"
            :to="{ name: 'settings', hash: '#password' }"
            >Пароль</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#certificate' }"
            data-testid="certificate-link"
            >Данные для диплома</RouterLink
          >
        </li>
      </ul>
    </VCard>
    <VLinksSettings id="links" data-testid="links-settings" />
    <VPasswordSettings id="password" data-testid="password-settings" />
    <VCertificateSettings id="certificate" data-testid="certificate-settings" />
  </div>
</template>
