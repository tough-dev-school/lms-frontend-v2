<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VCover from '@/components/VCover/VCover.vue';
  import { RouterLink } from 'vue-router';
  import { useStudiesQuery } from '@/query';

  const { data: studies } = useStudiesQuery();
</script>

<template>
  <VHeading tag="h1" class="mb-32">Мои курсы</VHeading>
  <ul v-if="studies && studies.length > 0" class="mb-32 flex flex-col gap-16">
    <li v-for="(study, index) in studies" :key="index">
      <RouterLink
        class="link"
        data-testid="study"
        :to="{
          name: 'modules',
          params: { courseId: study.id },
        }">
        <VCard class="relative !p-0 !px-0">
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
