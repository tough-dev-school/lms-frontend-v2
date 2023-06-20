<script lang="ts" setup>
  import { computed } from 'vue';

  import uniq from 'lodash/uniq';
  import { VReaction } from './components/VReaction';
  import { VReactionsPalette } from './components/VReactionsPalette';

  const props = withDefaults(defineProps<{ reactionsData: any[] }>(), {
    reactionsData: () => [],
  });

  const reactions = computed(() => {
    const usedReactions = uniq(
      props.reactionsData.map((reaction) => reaction.emoji),
    );

    return usedReactions.map((emoji) => {
      return {
        emoji,
        authors: props.reactionsData
          .filter((reaction) => reaction.emoji === emoji)
          .map((reaction) => reaction.author),
      };
    });
  });
</script>

<template>
  <div class="flex flex-wrap gap-16 text-h2">
    <VReactionsPalette />
    <VReaction
      v-for="(reaction, index) in reactions"
      :reaction="reaction"
      :key="index" />
  </div>
</template>

<style>
  .emoji-button {
    @apply box-content cursor-pointer bg-offwhite p-8 transition-colors hover:bg-lightgray;
  }
</style>
