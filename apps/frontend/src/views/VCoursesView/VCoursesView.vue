<script lang="ts" setup>
  import VCover from '@/components/VCover/VCover.vue';
  import { RouterLink } from 'vue-router';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { usePurchasedCoursesList } from '@/api';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import { computed } from 'vue';

  const { data, isLoading } = usePurchasedCoursesList({ page_size: 100 });
  const studies = computed(() => data.value?.results);
</script>

<template>
  <VLoggedLayout
    v-if="!isLoading"
    title="Мои курсы"
  >
    <ul
      v-if="studies && studies.length > 0"
      class="grid gap-16 phone:gap-24 tablet:gap-32"
    >
      <li
        v-for="(study, index) in studies"
        :key="index"
      >
        <RouterLink
          class="link"
          data-testid="study"
          :to="{
            name: 'course',
            params: { courseId: study.id },
          }"
        >
          <VCover
            :name="study.name"
            :image="study.cover ?? undefined"
            class="overflow-hidden rounded-16"
          />
        </RouterLink>
      </li>
    </ul>
    <p
      v-else
      data-testid="empty"
      class="text-center"
    >
      Нет доступных курсов.
    </p>
    <p class="text-center">
      Доступ к курсам можно купить на
      <a
        href="https://tough-dev.school/?utm_source=lms&utm_campaign=footer"
        class="link"
        >tough-dev.school</a
      >.
    </p>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
