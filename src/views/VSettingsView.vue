<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import VPasswordSettings from '@/components/VPasswordSettings.vue';
  import VLinksSettigns from '@/components/VLinksSettings.vue';
  import VCertificateSettings from '@/components/VCertificateSettings.vue';
</script>

<template>
  <div class="flex flex-col gap-32">
    <VHeading tag="h1">Настройки</VHeading>
    <VCard>
      <ul>
        <li>
          <RouterLink class="link" :to="{ name: 'settings', hash: '#links' }"
            >Ссылки</RouterLink
          >
        </li>
        <li>
          <RouterLink class="link" :to="{ name: 'settings', hash: '#password' }"
            >Пароль</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="link"
            :to="{ name: 'settings', hash: '#certificate' }"
            >Данные для диплома</RouterLink
          >
        </li>
      </ul>
    </VCard>
    <VLinksSettigns id="links" />
    <VPasswordSettings id="password" />
    <VCertificateSettings id="certificate" />
  </div>
</template>
