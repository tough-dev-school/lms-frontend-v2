<script lang="ts" setup>
  import { faker } from '@faker-js/faker';
  import { computed, ref } from 'vue';
  import { VAvatar } from '@/components/VAvatar';
  import uniq from 'lodash/uniq';
  import { onClickOutside } from '@vueuse/core';

  const ALLOWED_REACTIONS = ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀'];

  const options = ALLOWED_REACTIONS;

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

  const isOpen = ref(false);
  const palette = ref(null);

  const handleOpen = () => (isOpen.value = true);
  const handleClose = () => (isOpen.value = false);

  onClickOutside(palette, () => (isOpen.value = false));
</script>

<template>
  <div class="flex flex-wrap gap-16 text-h2">
    <div class="inline-flex rounded bg-offwhite" ref="palette">
      <button
        class="emoji-button box-content flex h-40 w-40 items-center justify-center rounded p-8 grayscale"
        v-if="!isOpen"
        @click="handleOpen">
        😀
      </button>
      <button
        class="emoji-button rounded-none h-40 w-40 p-8"
        :class="{
          'rounded-r': index === options.length - 1,
          'rounded-l': index === 0,
        }"
        v-for="(reaction, index) in options"
        :key="index"
        @click="handleClose"
        v-else>
        {{ reaction }}
      </button>
    </div>
    <div
      class="emoji-button flex gap-16 rounded"
      v-for="(reaction, index) in reactions"
      :key="index">
      <div class="flex h-40 w-40 items-center justify-center">
        {{ reaction.emoji }}
      </div>
      <div class="flex items-center pr-16">
        <abbr
          class="relative -mr-[16px] transition-all hover:z-50 hover:scale-125"
          v-for="author in reaction.authors"
          :key="author.uuid"
          :title="`${author.firstName} ${author.lastName}`">
          <VAvatar :userId="author.uuid" />
        </abbr>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .emoji-button {
    @apply box-content cursor-pointer bg-offwhite p-8 transition-colors hover:bg-lightgray;
  }
</style>
