<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VTag from '@/components/VTag/VTag.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type {
    Lesson,
    RecommendedVideoProviderEnum,
    VideoProvider,
  } from '@/api/generated';
  import { DATE_TIME_FORMAT, formatDate } from '@/utils/date';
  import { useI18n } from 'vue-i18n';

  defineProps<{
    call: NonNullable<Lesson['call']>;
  }>();

  const { t } = useI18n();

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
  <div class="flex flex-col gap-16">
    <div class="flex flex-wrap gap-8 empty:hidden">
      <VTag v-if="call.datetime">
        {{ formatDate(call.datetime, DATE_TIME_FORMAT) }}
      </VTag>
    </div>
    <VHeading
      tag="h3"
      class="mb-8"
    >
      {{ call.name }}
    </VHeading>
    <p v-if="call.description">{{ call.description }}</p>
  </div>

  <div class="flex-grow"></div>

  <template v-if="call.video.length">
    <a
      v-if="
        getRecommendedVideo(call.video, call.recommended_video_provider).src
      "
      :href="
        getRecommendedVideo(call.video, call.recommended_video_provider).src
      "
      target="_blank"
    >
      <VButton class="VLessonCard__Button">
        {{ t('lesson.watchRecording') }}
      </VButton>
    </a>
  </template>
  <template v-else-if="call.url">
    <a
      :href="call.url"
      target="_blank"
    >
      <VButton
        class="VLessonCard__Button"
        appearance="secondary"
      >
        {{ t('lesson.join') }}
      </VButton>
    </a>
  </template>
</template>
