<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useChatra } from '@/hooks/useChatra';
  import { getProviderByEmail } from '@brachkow/email-providers';

  const route = useRoute();

  const email = computed(() => String(route.query.email));

  const emailProvider = computed(() => getProviderByEmail(email.value));

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
