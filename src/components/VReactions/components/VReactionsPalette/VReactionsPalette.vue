<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { ALLOWED_REACTIONS } from '.';
  import type { ReactionEmoji } from '@/types/homework';

  const isOpen = ref(false);
  const palette = ref(null);

  const props = withDefaults(
    defineProps<{
      usedReactions?: ReactionEmoji[];
    }>(),
    {
      usedReactions: () => [],
    },
  );

  const MAX_REACTIONS = 3;

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
    class="emoji-button box-content flex h-32 w-32 items-center justify-center rounded p-8"
    v-if="!isOpen"
    @click="handleOpen"
    :disabled="isDisabled"
    data-testid="open">
    😀
  </button>
  <div class="inline-flex rounded bg-offwhite" v-else>
    <button
      class="emoji-button rounded-none h-32 w-32 p-8"
      data-testid="item"
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
