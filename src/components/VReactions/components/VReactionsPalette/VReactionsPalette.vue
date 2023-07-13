<script lang="ts" setup>
  import { computed } from 'vue';
  import { ALLOWED_REACTIONS, type VReactionsPaletteProps } from '.';
  import type { ReactionEmoji } from '@/types/homework';

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
</script>

<template>
  <button
    class="answer-action rounded-none h-24 w-24 text-[20px]"
    data-testid="reaction"
    v-for="(reaction, index) in options"
    :key="index"
    @click="handleClick(reaction)">
    {{ reaction }}
  </button>
</template>
