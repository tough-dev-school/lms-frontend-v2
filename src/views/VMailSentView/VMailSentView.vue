<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VCard } from '@/components/VCard';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const email = computed(() => String(route.query.email));

  interface EmailProvider {
    label: string;
    url: string;
    keyword: string;
  }

  const KNOWN_EMAIL_PROVIDERS: EmailProvider[] = [
    { label: 'GMail', url: 'https://mail.google.com/', keyword: 'gmail.com' },
    { label: 'Mail.ru', url: 'https://e.mail.ru/inbox/', keyword: 'mail.ru' },
  ];

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
      <a class="flex-grow button" :href="emailProvider.url" v-if="emailProvider"
        >Открыть {{ emailProvider.label }}</a
      >
    </template>
  </VCard>
</template>
