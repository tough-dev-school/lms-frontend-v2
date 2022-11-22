<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar.vue';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';
  import type { Answer } from '@/types/homework';
  import VCard from '@/components/VCard.vue';
  import VHtmlContent from '@/components/VHtmlContent.vue';

  export interface Props {
    answer: Answer;
  }

  defineProps<Props>();
</script>

<template>
  <VCard>
    <div class="mb-16 flex items-center gap-8">
      <VAvatar
        :first-name="answer.author.firstName"
        :last-name="answer.author.lastName" />
      <div class="">
        <div class="font-bold">
          {{ getName(answer.author.firstName, answer.author.lastName) }}
        </div>
        <div class="text-sub leading-tight text-gray">
          {{ relativeDate(answer.created) }}
        </div>
      </div>
      <div class="flex-grow"></div>
      <slot name="header"></slot>
    </div>
    <VHtmlContent :content="answer.text" />
    <div class="flex flex-row-reverse empty:appearance-none">
      <slot name="footer" />
    </div>
  </VCard>
</template>
