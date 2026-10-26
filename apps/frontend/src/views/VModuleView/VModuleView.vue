<script lang="ts" setup>
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import type { Lesson, ModuleDetail } from '@/api/generated';
  import { computed } from 'vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VLessonCard from '@/components/VLessonCard/VLessonCard.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';

  const props = defineProps<{
    courseId: number;
    courseName: string | null;
    module: ModuleDetail;
    lessons: Lesson[];
  }>();

  const { t } = useI18n();

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    if (!props.courseName) return [];

    return [
      { name: t('common.myCourses'), href: urls.courses() },
      {
        name: props.courseName,
        href: urls.course(props.courseId),
      },
      {
        name: props.module.name,
        href: urls.module(props.courseId, props.module.id),
      },
    ];
  });
</script>

<template>
  <VLoggedLayout
    :title="module.name"
    :breadcrumbs="breadcrumbs"
  >
    <VHtmlContent
      v-if="module.text"
      :html="module.text"
      :enable-lightbox="false"
    />
    <div class="VLessonsView flex flex-col gap-32">
      <div
        v-if="lessons.length > 0"
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
        {{ t('module.empty') }}
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
