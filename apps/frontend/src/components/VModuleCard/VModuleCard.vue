<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import type { Lesson, ModuleDetail } from '@/api/generated';
  import VTag from '../VTag/VTag.vue';
  import { useDate } from '@/composables/useDate';
  import { Link } from '@inertiajs/vue3';
  import { computed } from 'vue';
  import { urls } from '@/urls';

  const props = defineProps<{
    module: ModuleDetail;
    courseId: number;
    index: number;
    // The server loads it for started modules with a single lesson
    onlyLesson?: Lesson | null;
  }>();

  const { formatDate } = useDate();

  const cardClass = (number: number) => {
    const colors = [
      '!bg-accent-yellow dark:!bg-accent-yellow',
      '!bg-accent-orange dark:!bg-accent-orange',
      '!bg-accent-green dark:!bg-accent-green',
      '!bg-accent-blue dark:!bg-accent-blue',
    ];

    return colors[number % colors.length];
  };

  const href = computed(() => {
    if (!props.module.has_started) return undefined;

    if (props.module.lesson_count === 1) {
      if (!props.onlyLesson) return undefined;

      if (props.onlyLesson.material) {
        return urls.material(props.onlyLesson.material.id);
      } else if (props.onlyLesson.question) {
        return urls.homework(props.onlyLesson.question.slug);
      } else if (props.onlyLesson.call) {
        // Do nothing, as users may want to see the call details
      }
    }

    return urls.module(props.courseId, props.module.id);
  });
</script>

<template>
  <component
    :is="href ? Link : 'div'"
    v-bind="href ? { href } : {}"
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
      <VTag>{{ formatDate(module.start_date, 'dayMonth') }}</VTag>
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
