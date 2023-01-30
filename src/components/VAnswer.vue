<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar.vue';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';
  import type { Answer } from '@/types/homework';
  import VCard from '@/components/VCard.vue';
  import VHtmlContent from '@/components/VHtmlContent.vue';

  export interface Props {
    answer: Answer;
    showGoToAnswer?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showGoToAnswer: false,
  });
</script>

<template>
  <VCard>
    <div class="mb-16 flex items-center gap-8">
      <VAvatar
        data-testid="avatar"
        :first-name="answer.author.firstName"
        :last-name="answer.author.lastName" />
      <div>
        <div class="font-bold" data-testid="name">
          {{ getName(answer.author.firstName, answer.author.lastName) }}
        </div>
        <div class="text-sub leading-tight text-gray" data-testid="date">
          {{ relativeDate(answer.created) }}
        </div>
      </div>
      <div class="flex-grow"></div>
      <slot name="header"></slot>
      <RouterLink
        v-if="showGoToAnswer"
        class="link"
        :to="{
          name: 'homework-answer',
          params: { answerId: answer.slug },
        }"
        >К ответу</RouterLink
      >
    </div>
    <VHtmlContent :content="answer.text" data-testid="content" />
    <div
      class="flex flex-row-reverse gap-16 text-sub text-gray empty:appearance-none">
      <slot name="footer" />
    </div>
  </VCard>
</template>
