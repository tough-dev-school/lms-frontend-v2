<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VCard } from '@/components/VCard';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { KNOWN_EMAIL_PROVIDERS } from '.';

  const route = useRoute();

  const email = computed(() => String(route.query.email));

  const emailProvider = computed(() => {
    return KNOWN_EMAIL_PROVIDERS.find((provider) => {
      return email.value.includes(provider.keyword);
    });
  });
</script>

<template>
  <VCard class="flex flex-col gap-16">
    <VHeading tag="h1">Ссылка отправлена</VHeading>
    <p data-testid="message">Мы отправили ссылку по адресу {{ email }}</p>
    <template #footer>
      <a
        class="flex-grow button"
        data-testid="open"
        :href="emailProvider.url"
        v-if="emailProvider"
        >Открыть {{ emailProvider.label }}</a
      >
    </template>
  </VCard>
</template>
