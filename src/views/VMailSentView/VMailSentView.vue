<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VCard } from '@/components/VCard';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const email = computed(() => String(route.query.email));
</script>

<template>
  <VCard class="mt-[25vh] flex flex-col gap-16">
    <VHeading tag="h1">Ссылка отправлена</VHeading>
    <p data-testid="message">Мы отправили ссылку для входа на {{ email }}.</p>
  </VCard>
</template>
