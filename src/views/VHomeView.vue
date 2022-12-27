<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import useStudies from '@/stores/studies';

  const studies = useStudies();
</script>

<template>
  <VHeading tag="h1" class="mb-32">Ваши курсы</VHeading>
  <ul class="flex flex-col gap-16">
    <li v-for="(study, index) in studies.items" :key="index">
      <RouterLink
        class="link"
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
  <div class="mt-32 block text-center">
    <p v-if="studies.items.length === 0">Нет доступных курсов.</p>
    <p>
      Доступ к курсам можно купить на
      <a href="https://education.borshev.com/" class="link"
        >education.borshev.com</a
      >.
    </p>
  </div>
</template>
