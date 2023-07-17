<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VCard } from '@/components/VCard';
  import { VButton } from '@/components/VButton';
  import { useRouter, useRoute } from 'vue-router';
  import { computed } from 'vue';

  const router = useRouter();
  const route = useRoute();

  const email = computed(() => String(route.query.email));

  const back = () => {
    router.push({ name: 'login' });
  };
</script>

<template>
  <VCard class="mt-[25vh] flex flex-col gap-16">
    <VHeading tag="h1">Ссылка отправлена</VHeading>
    <p data-testid="message">Мы отправили ссылку по адресу {{ email }}</p>
    <template #footer>
      <VButton
        class="flex-grow"
        appearance="link"
        @click="back"
        data-testid="restart"
        >На другую почту</VButton
      >
    </template>
  </VCard>
</template>
