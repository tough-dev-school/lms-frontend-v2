<script lang="ts" setup>
  import { faker } from '@faker-js/faker';
  import { computed, ref } from 'vue';

  import uniq from 'lodash/uniq';
  import { VReaction } from './components/VReaction';
  import {
    VReactionsPalette,
    ALLOWED_REACTIONS,
  } from './components/VReactionsPalette';

  const reactionsData = [
    ...Array(faker.datatype.number({ min: 1, max: 15 })),
  ].map(() => {
    return {
      emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
      author: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        uuid: faker.datatype.uuid(),
      },
    };
  });

  const reactions = computed(() => {
    const usedReactions = uniq(reactionsData.map((reaction) => reaction.emoji));

    return usedReactions.map((emoji) => {
      return {
        emoji,
        authors: reactionsData
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
