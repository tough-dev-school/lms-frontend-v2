<script lang="ts" setup>
  import { computed } from 'vue';
  import { VReaction } from './components/VReaction';
  import {
    ReactionEmoji,
    VReactionsPalette,
  } from './components/VReactionsPalette';
  import type { Reaction } from '@/types/homework';
  import useHomework from '@/stores/homework';
  import { groupBy } from 'lodash';

  const homeworkStore = useHomework();

  interface Props {
    answerId: string;
    reactions: Reaction[];
  }

  const props = withDefaults(defineProps<Props>(), {
    reactions: () => [],
  });

  const groupedReactions = computed(() => {
    return groupBy(props.reactions, (reaction) => reaction.emoji);
  });

  const addReaction = (emoji: ReactionEmoji) => {
    homeworkStore.addReaction(props.answerId, emoji);
  };

  const removeReaction = (reactionId: string) => {
    homeworkStore.removeReaction(props.answerId, reactionId);
  };
</script>

<template>
  <div class="flex flex-wrap gap-16">
    <VReactionsPalette @click="addReaction" />
    <VReaction
      v-for="(reactions, emoji) in groupedReactions"
      :emoji="emoji"
      @remove="removeReaction"
      @add="addReaction"
      :reactions="reactions"
      :key="emoji" />
  </div>
</template>

<style>
  .emoji-button {
    @apply box-content cursor-pointer bg-offwhite transition-colors hover:bg-lightgray;
  }
</style>
