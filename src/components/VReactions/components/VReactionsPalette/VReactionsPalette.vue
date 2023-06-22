<script lang="ts" setup>
  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { ALLOWED_REACTIONS, ReactionEmoji } from '.';

  const isOpen = ref(false);
  const palette = ref(null);

  const options = ALLOWED_REACTIONS;

  const emit = defineEmits<{ click: [value: ReactionEmoji] }>();

  const handleOpen = () => (isOpen.value = true);
  const handleClose = () => (isOpen.value = false);

  const handleClick = (emoji: ReactionEmoji) => {
    emit('click', emoji);
    handleClose();
  };

  onClickOutside(palette, () => (isOpen.value = false));
</script>

<template>
  <div class="inline-flex rounded bg-offwhite text-[1.5em]" ref="palette">
    <button
      class="emoji-button box-content flex h-32 w-32 items-center justify-center rounded p-8 grayscale"
      v-if="!isOpen"
      @click="handleOpen">
      😀
    </button>
    <button
      class="emoji-button rounded-none h-32 w-32 p-8"
      :class="{
        'rounded-r': index === options.length - 1,
        'rounded-l': index === 0,
      }"
      v-for="(reaction, index) in options"
      :key="index"
      @click="handleClick(reaction)"
      v-else>
      {{ reaction }}
    </button>
  </div>
</template>
