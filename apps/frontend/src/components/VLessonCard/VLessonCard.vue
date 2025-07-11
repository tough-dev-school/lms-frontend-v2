<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VTag from '@/components/VTag/VTag.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type {
    Lesson,
    RecommendedVideoProviderEnum,
    VideoProvider,
  } from '@/api/generated-api';
  import { computed } from 'vue';
  import { formatDateTime } from '@/utils/date';

  const props = defineProps<{
    lesson: Lesson;
  }>();

  const name = computed(() => {
    if (props.lesson.call) return props.lesson.call.name;
    if (props.lesson.homework) return props.lesson.homework.question.name;
    if (props.lesson.material) return props.lesson.material.title;
    return undefined;
  });

  const description = computed(() => {
    if (props.lesson.call) return props.lesson.call.description;
    return undefined;
  });

  const getRecommendedVideo = (
    videos: VideoProvider[],
    recommendedVideoProvider: RecommendedVideoProviderEnum | null,
  ) => {
    const fallback = videos[0];
    if (!recommendedVideoProvider) return fallback;
    return (
      videos.find((v) => v.provider === recommendedVideoProvider) || fallback
    );
  };
</script>

<template>
  <div
    :class="[
      'VLessonCard flex flex-col gap-10',
      'dark:!bg-accent-yellow !bg-accent-yellow text-black flex-shrink py-24 rounded-16 p-16 tablet:p-24',
    ]">
    <div class="flex flex-col gap-16">
      <div class="empty:hidden gap-8 flex flex-wrap">
        <VTag v-if="lesson.call?.datetime">
          {{ formatDateTime(lesson.call.datetime) }}
        </VTag>
        <VTag v-else-if="lesson.homework?.question.deadline">
          Дедлайн {{ formatDateTime(lesson.homework.question.deadline) }}
        </VTag>
      </div>
      <VHeading v-if="name" tag="h3" class="mb-8">{{ name }}</VHeading>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="lesson.homework">
      <table class="w-full">
        <tr v-if="lesson.homework.crosschecks">
          <td class="font-bold">Проверенные домашки коллег</td>
          <td class="text-right">
            {{ lesson.homework.crosschecks.checked }} из
            {{ lesson.homework.crosschecks.total }}
          </td>
        </tr>
      </table>
    </div>
    <div class="flex-grow"></div>
    <template v-if="lesson.call">
      <template v-if="lesson.call.video.length">
        <a
          v-if="
            getRecommendedVideo(
              lesson.call.video,
              lesson.call.recommended_video_provider,
            ).src
          "
          :href="
            getRecommendedVideo(
              lesson.call.video,
              lesson.call.recommended_video_provider,
            ).src
          "
          target="_blank">
          <VButton class="VLessonCard__Button"> Смотреть запись </VButton>
        </a>
      </template>
      <template v-else>
        <a :href="lesson.call.url" target="_blank">
          <VButton class="VLessonCard__Button" appearance="secondary">
            Подключиться
          </VButton>
        </a>
      </template>
    </template>
    <RouterLink
      v-if="lesson.material"
      :to="{
        name: 'materials',
        params: { materialId: lesson.material.id },
      }">
      <VButton class="VLessonCard__Button"> Читать </VButton>
    </RouterLink>
    <RouterLink
      v-if="lesson.homework"
      :to="{
        name: 'homework',
        params: { questionId: lesson.homework.question.slug },
      }">
      <VButton class="VLessonCard__Button"> Открыть </VButton>
    </RouterLink>
  </div>
</template>

<style scoped>
  .VLessonCard__Button {
    --module: 40px;
    @apply bg-white rounded-8 w-full;
  }
</style>
