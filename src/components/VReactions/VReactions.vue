<script lang="ts" setup>
  import { computed } from 'vue';
  import uniq from 'lodash/uniq';
  import { VReaction } from './components/VReaction';
  import {
    ReactionEmoji,
    VReactionsPalette,
  } from './components/VReactionsPalette';
  import type { Reaction } from '@/types/homework';
  import useHomework from '@/stores/homework';

  const homeworkStore = useHomework();

  interface Props {
    answerId: string;
    reactions: Reaction[];
  }

  const props = withDefaults(defineProps<Props>(), {
    reactions: () => [],
  });

  const reactions = computed(() => {
    const usedReactions = uniq(
      props.reactions.map((reaction) => reaction.emoji),
    );

    return usedReactions.map((emoji) => {
      return {
        emoji,
        authors: props.reactions
          .filter((reaction) => reaction.emoji === emoji)
          .map((reaction) => reaction.author),
      };
    });
  });

  const addReaction = (emoji: ReactionEmoji) => {
    homeworkStore.addReaction(props.answerId, emoji);
  };
</script>

<template>
  <div class="flex flex-wrap gap-16">
    <VReactionsPalette @click="addReaction" />
    <VReaction
      v-for="(reaction, index) in reactions"
      :reaction="reaction"
      :key="index" />
  </div>
</template>

<style>
  .emoji-button {
    @apply box-content cursor-pointer bg-offwhite transition-colors hover:bg-lightgray;
  }
</style>
