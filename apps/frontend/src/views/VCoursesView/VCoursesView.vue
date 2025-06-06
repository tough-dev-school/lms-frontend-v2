<script lang="ts" setup>
  import VCover from '@/components/VCover/VCover.vue';
  import { RouterLink } from 'vue-router';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useStudiesQuery } from '@/query';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const { data: studies, isLoading } = useStudiesQuery();
</script>

<template>
  <VLoggedLayout v-if="!isLoading" title="Мои курсы">
    <ul
      v-if="studies && studies.length > 0"
      class="grid gap-16 tablet:gap-32 phone:gap-24">
      <li v-for="(study, index) in studies" :key="index">
        <RouterLink
          class="link"
          data-testid="study"
          :to="{
            name: 'modules',
            params: { courseId: study.id },
          }">
          <VCover
            :name="study.name"
            :image="study.cover"
            class="rounded-16 overflow-hidden" />
        </RouterLink>
      </li>
    </ul>
    <p v-else data-testid="empty" class="text-center">Нет доступных курсов.</p>
    <p class="text-center">
      Доступ к курсам можно купить на
      <a href="https://education.borshev.com/" class="link"
        >education.borshev.com</a
      >.
    </p>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
