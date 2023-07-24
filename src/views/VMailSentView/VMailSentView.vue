<script lang="ts" setup>
  import { VCard } from '@/components/VCard';
  import { VHeading } from '@/components/VHeading';
  import { useChatra } from '@/hooks/useChatra';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { KNOWN_EMAIL_PROVIDERS } from '.';

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
      Мы отправили ссылку по адресу {{ email }}. Если письма долго нет —
      посмотрите пожалуйста в спаме. Если и там нет —
      <button class="link" @click="chatra('openChat', true)">
        напишите нам</button
      >.
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
