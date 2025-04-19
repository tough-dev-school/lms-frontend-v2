<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useChatra } from '@/hooks/useChatra';
  import { getProviderByEmail } from '@brachkow/email-providers';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';

  const route = useRoute();

  const email = computed(() => String(route.query.email));

  const emailProvider = computed(() => getProviderByEmail(email.value));

  const { chatra } = useChatra();
</script>

<template>
  <VPublicLayout>
    <VCard class="flex flex-col gap-16" title="Ссылка отправлена">
      <div data-testid="message">
        Мы отправили ссылку по адресу {{ email }}. Если письма долго нет —
        посмотрите пожалуйста в спаме. Если и там нет —
        <button class="link" @click="chatra('openChat', true)">
          напишите нам</button
        >.
      </div>
      <template #footer>
        <a
          v-if="emailProvider"
          class="flex-grow button"
          data-testid="open"
          :href="emailProvider.url"
          >Открыть {{ emailProvider.label }}</a
        >
      </template>
    </VCard>
  </VPublicLayout>
</template>
