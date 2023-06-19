<script lang="ts" setup>
  import VHeading from '@/components/VHeading';
  import VCard from '@/components/VCard';
  import VCover from '@/components/VCover';
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
        <VCard class="relative p-0 px-0 phone:px-0 tablet:px-0">
          <VCover
            :name="study.name"
            :image="study.cover"
            class="hidden phone:flex" />
          <p class="p-16">{{ study.name }}</p>
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
