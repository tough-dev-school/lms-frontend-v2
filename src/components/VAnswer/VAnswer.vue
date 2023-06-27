<script lang="ts" setup>
  import { VAvatar } from '@/components/VAvatar';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';
  import type { Answer } from '@/types/homework';
  import { VCard } from '@/components/VCard';
  import { VHtmlContent } from '@/components/VHtmlContent';
  import { computed } from 'vue';
  import useUser from '@/stores/user';
  import { VReactions } from '@/components/VReactions';
  import type { ReactionEmoji } from '@/types/homework';
  import useHomework from '@/stores/homework';

  export interface Props {
    answer: Answer;
    showReactions?: boolean;
  }

  const emit = defineEmits<{
    update: [];
  }>();

  const homeworkStore = useHomework();
  const userStore = useUser();
  const props = withDefaults(defineProps<Props>(), { showReactions: true });

  const isOwn = computed(() => {
    return props.answer.author.uuid === userStore.uuid;
  });

  const addReaction = (emoji: ReactionEmoji) => {
    homeworkStore.addReaction(props.answer.slug, emoji);
    emit('update');
  };

  const removeReaction = (reactionId: string) => {
    homeworkStore.removeReaction(props.answer.slug, reactionId);
    emit('update');
  };
</script>

<template>
  <VCard class="pb-32">
    <div class="mb-16 flex items-center gap-8">
      <VAvatar data-testid="avatar" :userId="answer.author.uuid" />
      <div>
        <div class="font-bold" data-testid="name">
          {{ getName(answer.author.firstName, answer.author.lastName) }}
          <span
            v-if="isOwn"
            class="h-16 rounded-8 bg-yellow px-4 text-sub font-normal text-white"
            data-testid="own-badge"
            >вы</span
          >
        </div>
        <div class="text-sub leading-tight text-gray" data-testid="date">
          {{ relativeDate(answer.created) }}
        </div>
      </div>
      <div class="flex-grow"></div>
      <slot name="header"></slot>
    </div>
    <VHtmlContent :content="answer.text" data-testid="content" />
    <div class="flex justify-between items-start gap-16 pt-16">
      <VReactions
        v-if="showReactions"
        @add="addReaction"
        @remove="removeReaction"
        reactionsClasses="tablet:flex hidden"
        :answer-id="answer.slug"
        :reactions="answer.reactions" />
      <div class="flex-grow -ml-16"></div>
      <slot name="footer" />
    </div>
    <div class="gap-16 mt-16 tablet:hidden flex">
      <VReactions
        palette-classes="hidden"
        v-if="showReactions"
        @add="addReaction"
        @remove="removeReaction"
        :answer-id="answer.slug"
        :reactions="answer.reactions" />
    </div>
  </VCard>
</template>
