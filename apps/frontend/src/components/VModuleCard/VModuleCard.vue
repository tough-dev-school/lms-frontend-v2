<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import type { Module } from '@/api/generated/types';
  import VTag from '../VTag/VTag.vue';
  import { formatDate } from '@/utils/date';
  import { RouterLink } from 'vue-router';
  import { computed, onBeforeMount, ref } from 'vue';
  import { fetchLesson } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  const props = defineProps<{
    module: Module;
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
    if (!props.module.has_started) return undefined;

    if (props.module.lesson_count === 1) {
      if (!onlyLesson.value) return undefined;

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
        // Do nothing, as users may want to see the call details
      }
    }

    return {
      name: 'module',
      params: { courseId: props.courseId, moduleId: props.module.id },
    };
  });

  onBeforeMount(async () => {
    if (props.module.lesson_count === 1 && props.module.has_started) {
      onlyLesson.value = await fetchLesson(queryClient, {
        lessonId: props.module.single_lesson_id,
      });
    }
  });

  const componentVariant = computed(() => {
    if (typeof to.value === 'string') return 'a';
    if (to.value && props.module.has_started) return RouterLink;
    return 'div';
  });
</script>

<template>
  <component
    :is="componentVariant"
    v-bind="componentVariant === 'a' ? { href: to } : { to }"
    class="VModuleCard flex min-h-120 flex-col gap-8 rounded-16 p-16 text-black tablet:p-24"
    :class="[
      cardClass(index),
      module.has_started
        ? 'origin-center transition-all duration-100 ease-out hover:scale-[1.02] hover:shadow'
        : 'pointer-events-none cursor-not-allowed grayscale',
    ]"
    data-testid="module-card"
  >
    <div
      v-if="module.start_date"
      class="flex justify-start"
      data-testid="module-start-date"
    >
      <VTag>{{ formatDate(module.start_date, 'DD.MM') }}</VTag>
    </div>
    <VHeading
      tag="h3"
      data-testid="module-name"
    >
      {{ module.name }}
    </VHeading>
    <p
      v-if="module.description"
      data-testid="module-description"
    >
      {{ module.description }}
    </p>
  </component>
</template>
