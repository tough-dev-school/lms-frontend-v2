<script lang="ts" setup>
  import type { Lesson } from '@/api/generated/generated-api';
  import { computed } from 'vue';
  import VLessonCardCall from './VLessonCardCall.vue';
  import VLessonCardMaterial from './VLessonCardMaterial.vue';
  import VLessonCardHomework from './VLessonCardHomework.vue';

  const props = defineProps<{
    lesson: Lesson;
  }>();

  type LessonType = 'call' | 'material' | 'homework';

  const lessonType = computed<LessonType>(() => {
    if (props.lesson.call) return 'call';
    if (props.lesson.material) return 'material';
    return 'homework';
  });
</script>

<template>
  <div
    :class="[
      'VLessonCard flex flex-col gap-10',
      'flex-shrink rounded-16 !bg-accent-yellow p-16 py-24 text-black dark:!bg-accent-yellow tablet:p-24',
    ]"
  >
    <VLessonCardCall
      v-if="lessonType === 'call'"
      :call="lesson.call"
    />
    <VLessonCardMaterial
      v-else-if="lessonType === 'material'"
      :material="lesson.material"
    />
    <VLessonCardHomework
      v-else-if="lessonType === 'homework'"
      :homework="lesson.homework"
      :question="lesson.homework.question"
    />
  </div>
</template>

<style>
  .VLessonCard__Button {
    --module: 40px;
    @apply w-full rounded-8 bg-white;
  }
</style>
