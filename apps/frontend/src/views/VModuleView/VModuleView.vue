<script lang="ts" setup>
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import {
    useLmsLessonsList,
    usePurchasedCoursesList,
    useLmsModulesRetrieve,
  } from '@/api';
  import { computed } from 'vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VLessonCard from '@/components/VLessonCard/VLessonCard.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const props = defineProps<{
    courseId: number;
    moduleId: number;
  }>();

  const { data: studiesData, isLoading: isStudiesLoading } =
    usePurchasedCoursesList({ page_size: 100 });
  const studies = computed(() => studiesData.value?.results);

  const { data: lessonsData, isLoading: isLessonsLoading } = useLmsLessonsList(
    computed(() => ({ module: props.moduleId, page_size: 1000 })),
  );
  const lessons = computed(() => lessonsData.value?.results);

  const courseName = computed(
    () =>
      (studies.value ?? []).find((study) => study.id === props.courseId)?.name,
  );

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    if (!courseName.value || !moduleName.value) return [];

    return [
      { name: 'Мои курсы', to: { name: 'courses' } },
      {
        name: courseName.value ?? 'Материалы курса',
        to: { name: 'course', params: { courseId: props.courseId } },
      },
      {
        name: moduleName.value,
        to: {
          name: 'module',
          params: { courseId: props.courseId, moduleId: props.moduleId },
        },
      },
    ];
  });

  const { data: module, isLoading: isModuleLoading } = useLmsModulesRetrieve(
    computed(() => props.moduleId),
  );

  const moduleName = computed(() => module.value?.name);
  const moduleText = computed(() => module.value?.text);
</script>

<template>
  <VLoggedLayout
    v-if="!(isStudiesLoading || isModuleLoading || isLessonsLoading)"
    :title="moduleName"
    :breadcrumbs="breadcrumbs"
  >
    <VHtmlContent
      v-if="moduleText"
      :html="moduleText"
      :enable-lightbox="false"
    />
    <div class="VLessonsView flex flex-col gap-32">
      <div
        v-if="lessons && lessons.length > 0"
        class="VLessonsView__Layout"
      >
        <VLessonCard
          v-for="lesson in lessons"
          :key="lesson.id"
          class="VLessonsView__Item"
          :lesson="lesson"
        />
      </div>
      <p
        v-else
        data-testid="empty"
        class="mb-16 text-center"
      >
        Нет доступных уроков.
      </p>
    </div>
  </VLoggedLayout>
  <VLoadingView v-else />
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
