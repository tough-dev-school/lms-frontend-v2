<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VCard } from '@/components/VCard';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { KNOWN_EMAIL_PROVIDERS } from '.';
  import { useChatra } from '@/hooks/useChatra';

  const route = useRoute();

  const email = computed(() => String(route.query.email));

  const emailProvider = computed(() => {
    return KNOWN_EMAIL_PROVIDERS.find((provider) => {
      return email.value.includes(provider.keyword);
    });
  });

  const { chatra } = useChatra();
</script>

<template>
  <VCard class="flex flex-col gap-16">
    <VHeading tag="h1">Ссылка отправлена</VHeading>
    <div data-testid="message">
      <p>Мы отправили ссылку по адресу {{ email }}</p>
      <p>Если письма долго нет — посмотрите пожалуйста в спаме</p>
      <p>
        Если и там нет —
        <button class="link" @click="chatra('openChat', true)">
          напишите нам
        </button>
      </p>
    </div>
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
