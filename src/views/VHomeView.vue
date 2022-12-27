<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import useStudies from '@/stores/studies';

  const studies = useStudies();
</script>

<template>
  <VHeading tag="h1" class="mb-32">Ваши курсы</VHeading>
  <ul class="mb-32 flex flex-col gap-16" v-if="studies.items.length > 0">
    <li v-for="(study, index) in studies.items" :key="index">
      <RouterLink
        class="link"
        data-testid="study"
        :to="{
          name: 'materials',
          params: { id: study.homePageSlug },
        }">
        <VCard>
          <p>{{ study.name }}</p>
        </VCard>
      </RouterLink>
    </li>
  </ul>
  <p v-else data-testid="empty" class="mb-16 text-center">
    Нет доступных курсов.
  </p>
  <p class="text-center">
    Доступ к курсам можно купить на
    <a href="https://education.borshev.com/" class="link"
      >education.borshev.com</a
    >.
  </p>
</template>
