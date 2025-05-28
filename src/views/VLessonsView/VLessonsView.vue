<script lang="ts" setup>
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useLessonsQuery } from '@/query';
  import { computed } from 'vue';
  import { useRouteParams } from '@vueuse/router';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useStudiesQuery } from '@/query';
  import VLessonCard from '@/components/VLessonCard/VLessonCard.vue';
  import { useModulesQuery } from '@/query';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';

  const courseId = useRouteParams('courseId', '0', {
    transform: (value) => parseInt(value),
  });
  const moduleId = useRouteParams('moduleId', '0', {
    transform: (value) => parseInt(value),
  });

  const { data: studies } = useStudiesQuery();

  const courseName = computed(
    () =>
      (studies.value ?? []).find((study) => study.id === courseId.value)?.name,
  );

  const { data: lessons } = useLessonsQuery(moduleId);

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    if (!courseName.value || !moduleName.value) return [];

    return [
      { name: 'Мои курсы', to: { name: 'home' } },
      {
        name: courseName.value ? courseName.value : 'Материалы курса',
        to: { name: 'modules', params: { courseId: courseId.value } },
      },
      {
        name: moduleName.value,
        to: {
          name: 'lessons',
          params: { courseId: courseId.value, moduleId: moduleId.value },
        },
      },
    ];
  });

  const { data: modules } = useModulesQuery(courseId);

  const module = computed(
    () => modules.value?.find((module) => module.id === moduleId.value),
  );

  const moduleName = computed(() => module.value?.name);
  const moduleText = computed(() => module.value?.text);
</script>

<template>
  <VLoggedLayout :title="moduleName" :breadcrumbs="breadcrumbs">
    <VHtmlContent v-if="moduleText" :content="moduleText" />
    <div class="VLessonsView gap-32 flex flex-col">
      <div v-if="lessons && lessons.length > 0" class="VLessonsView__Layout">
        <VLessonCard
          v-for="lesson in lessons"
          :key="lesson.id"
          class="VLessonsView__Item"
          :lesson="lesson" />
      </div>
      <p v-else data-testid="empty" class="mb-16 text-center">
        Нет доступных уроков.
      </p>
    </div>
  </VLoggedLayout>
</template>

<style>
  .VLessonsView {
    --gap: 32px;
    &__Layout {
      display: flex;
      flex-wrap: wrap;
      gap: var(--gap);
    }
    &__Item {
      flex-grow: 1;
      flex-basis: calc(50% - var(--gap) / 2);
    }
  }
</style>
