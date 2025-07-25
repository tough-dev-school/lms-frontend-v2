<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import { computed } from 'vue';
  import { useChatra } from '@/composables/useChatra';
  import { getProviderByEmail } from '@brachkow/email-providers';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VButton from '@/components/VButton/VButton.vue';

  const props = defineProps<{
    email?: string;
  }>();

  const emailProvider = computed(() => getProviderByEmail(props.email ?? ''));

  const { chatra } = useChatra();
</script>

<template>
  <VPublicLayout>
    <VCard class="flex flex-col gap-16" title="Ссылка отправлена">
      <div data-testid="message">
        Мы отправили ссылку по адресу {{ email }}. Если письма долго нет —
        посмотрите пожалуйста в спаме. Если и там нет —
        <button class="link" @click="chatra('openChat', true)">
          напишите нам
        </button>.
      </div>
      <template #footer>
        <VButton
          v-if="emailProvider"
          class="flex-grow"
          data-testid="open"
          tag="a"
          :href="emailProvider.url"
        >
          Открыть {{ emailProvider.label }}
        </VButton>
      </template>
    </VCard>
  </VPublicLayout>
</template>
