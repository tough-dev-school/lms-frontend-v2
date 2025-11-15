<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import type { ModuleDetail, Lesson } from '@/api/generated/generated-api';
  import VTag from '../VTag/VTag.vue';
  import { formatDate } from '@/utils/date';
  import { RouterLink } from 'vue-router';
  import { computed, onBeforeMount, ref } from 'vue';
  import { fetchLesson } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  const props = defineProps<{
    module: ModuleDetail;
    courseId: number;
    index: number;
  }>();

  const onlyLesson = ref<Lesson>();

  const queryClient = useQueryClient();

  const cardClass = (number: number) => {
    const colors = [
      '!bg-accent-yellow dark:!bg-accent-yellow',
      '!bg-accent-orange dark:!bg-accent-orange',
      '!bg-accent-green dark:!bg-accent-green',
      '!bg-accent-blue dark:!bg-accent-blue',
    ];

    return colors[number % colors.length];
  };

  const to = computed(() => {
    if (props.module.has_started) {
      if (onlyLesson.value) {
        if (onlyLesson.value.material) {
          return {
            name: 'materials',
            params: {
              materialId: onlyLesson.value.material.id,
            },
          };
        } else if (onlyLesson.value.question) {
          return {
            name: 'homework',
            params: { questionId: onlyLesson.value.question.slug },
          };
        } else if (onlyLesson.value.call) {
          window.open(onlyLesson.value.call.url, '_blank');
        }
      }
      return {
        name: 'module',
        params: { courseId: props.courseId, moduleId: props.module.id },
      };
    }
    return undefined;
  });

  onBeforeMount(async () => {
    if (props.module.lesson_count === 1) {
      onlyLesson.value = await fetchLesson(queryClient, {
        lessonId: props.module.single_lesson_id,
      });
    }
  });
</script>

<template>
  <component
    :is="module.has_started ? RouterLink : 'div'"
    :to="to"
    :class="[
      cardClass(index),
      'VModuleCard flex min-h-120 flex-col gap-8 rounded-16 p-16 text-black tablet:p-24',
      module.has_started
        ? 'origin-center transition-all duration-100 ease-out hover:scale-[1.02] hover:shadow'
        : 'pointer-events-none cursor-not-allowed grayscale',
    ]"
  >
    <div
      v-if="module.start_date"
      class="flex justify-start"
    >
      <VTag>{{ formatDate(module.start_date, 'DD.MM') }}</VTag>
    </div>
    <VHeading tag="h3">{{ module.name }}</VHeading>
    <p v-if="module.description">
      {{ module.description }}
    </p>
  </component>
</template>
