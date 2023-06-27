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
    class="answer-action box-content flex items-center justify-center text-[1.5rem]"
    v-if="!isOpen"
    @click="handleOpen"
    :disabled="isDisabled"
    data-testid="open">
    <MoodHappyIcon />
  </button>
  <div class="inline-flex rounded-8 bg-offwhite" data-testid="palette" v-else>
    <button
      class="answer-action rounded-none h-24 w-24 text-[20px]"
      data-testid="reaction"
      :class="{
        'rounded-8-r': index === options.length - 1,
        'rounded-8-l': index === 0,
      }"
      v-for="(reaction, index) in options"
      :key="index"
      @click="handleClick(reaction)">
      {{ reaction }}
    </button>
  </div>
</template>
