<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import {
    ALLOWED_REACTIONS,
    MAX_REACTIONS,
    type VReactionsPaletteProps,
  } from '.';
  import type { ReactionEmoji } from '@/types/homework';
  import { MoodHappyIcon } from 'vue-tabler-icons';

  const isOpen = ref(false);
  const palette = ref(null);

  const props = withDefaults(defineProps<VReactionsPaletteProps>(), {
    usedReactions: () => [],
  });

  const options = computed(() =>
    ALLOWED_REACTIONS.filter(
      (reaction) => !props.usedReactions.includes(reaction),
    ),
  );

  const isDisabled = computed(
    () => props.usedReactions.length >= MAX_REACTIONS,
  );

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
  <button
    class="answer-action box-content flex h-32 w-32 items-center justify-center rounded p-8 text-[1.5rem]"
    v-if="!isOpen"
    @click="handleOpen"
    :disabled="isDisabled"
    data-testid="open">
    <MoodHappyIcon />
  </button>
  <div class="inline-flex rounded bg-offwhite" data-testid="palette" v-else>
    <button
      class="answer-action rounded-none h-32 w-32 p-8 text-[1.5rem]"
      data-testid="reaction"
      :class="{
        'rounded-r': index === options.length - 1,
        'rounded-l': index === 0,
      }"
      v-for="(reaction, index) in options"
      :key="index"
      @click="handleClick(reaction)">
      {{ reaction }}
    </button>
  </div>
</template>
