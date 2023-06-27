<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { ALLOWED_REACTIONS, type VReactionsPaletteProps } from '.';
  import type { ReactionEmoji } from '@/types/homework';

  const palette = ref(null);

  const props = withDefaults(defineProps<VReactionsPaletteProps>(), {
    usedReactions: () => [],
  });

  const options = computed(() =>
    ALLOWED_REACTIONS.filter(
      (reaction) => !props.usedReactions.includes(reaction),
    ),
  );

  const emit = defineEmits<{ click: [emoji: ReactionEmoji]; close: [] }>();

  const handleClose = () => {
    emit('close');
  };

  const handleClick = (emoji: ReactionEmoji) => {
    emit('click', emoji);
    handleClose();
  };

  onClickOutside(palette, handleClose);
</script>

<template>
  <div class="inline-flex rounded-8 bg-offwhite" data-testid="palette">
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
