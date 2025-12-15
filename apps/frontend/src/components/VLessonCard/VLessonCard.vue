<script lang="ts" setup>
  import type { Lesson } from '@/api';
  import VLessonCardCall from './VLessonCardCall.vue';
  import VLessonCardMaterial from './VLessonCardMaterial.vue';
  import VLessonCardHomework from './VLessonCardHomework.vue';

  defineProps<{
    lesson: Lesson;
  }>();
</script>

<template>
  <div
    :class="[
      'VLessonCard flex flex-col gap-10',
      'flex-shrink rounded-16 !bg-accent-yellow p-16 py-24 text-black dark:!bg-accent-yellow tablet:p-24',
    ]"
  >
    <VLessonCardCall
      v-if="'call' in lesson && lesson.call"
      :call="lesson.call"
    />
    <VLessonCardMaterial
      v-else-if="'material' in lesson && lesson.material"
      :material="lesson.material"
    />
    <VLessonCardHomework
      v-else-if="
        'homework' in lesson &&
        lesson.homework &&
        'question' in lesson &&
        lesson.question
      "
      :homework="lesson.homework"
      :question="lesson.question"
    />
  </div>
</template>

<style>
  .VLessonCard__Button {
    --module: 40px;
    @apply w-full rounded-8 bg-white;
  }
</style>
