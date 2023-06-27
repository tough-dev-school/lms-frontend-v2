<script lang="ts" setup>
  import { VAvatar } from '@/components/VAvatar';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';
  import type { Answer } from '@/types/homework';
  import { VCard } from '@/components/VCard';
  import { VHtmlContent } from '@/components/VHtmlContent';
  import { computed, ref } from 'vue';
  import useUser from '@/stores/user';
  import { VReactions } from '@/components/VReactions';
  import type { ReactionEmoji } from '@/types/homework';
  import useHomework from '@/stores/homework';
  import { MoodHappyIcon } from 'vue-tabler-icons';
  import { MAX_REACTIONS } from '@/components/VReactions/components/VReactionsPalette';

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

  const isPaletteOpen = ref(false);

  const addReaction = (emoji: ReactionEmoji) => {
    homeworkStore.addReaction(props.answer.slug, emoji);
    emit('update');
  };

  const removeReaction = (reactionId: string) => {
    homeworkStore.removeReaction(props.answer.slug, reactionId);
    emit('update');
  };

  const usedReactions = computed(() => {
    return props.answer.reactions
      .filter((reaction) => reaction.author.uuid === userStore.uuid)
      .map((reaction) => reaction.emoji as ReactionEmoji);
  });

  const isDisabled = computed(
    () => usedReactions.value.length >= MAX_REACTIONS,
  );

  const togglePalette = () => (isPaletteOpen.value = !isPaletteOpen.value);
  const closePalette = () => (isPaletteOpen.value = false);
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
      <button
        class="answer-action box-content flex items-center justify-center text-[1.5rem]"
        @click="togglePalette"
        :disabled="isDisabled"
        data-testid="open">
        <MoodHappyIcon />
      </button>
      <div class="flex-grow -ml-16"></div>
      <slot name="footer" />
    </div>
    <div class="gap-16 mt-16 flex items-start flex-wrap">
      <VReactions
        v-if="showReactions"
        :usedReactions="usedReactions"
        :answer-id="answer.slug"
        :reactions="answer.reactions"
        :palette="isPaletteOpen"
        @close="closePalette"
        @add="addReaction"
        @remove="removeReaction" />
    </div>
  </VCard>
</template>
