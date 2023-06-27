<script lang="ts" setup>
  import { computed } from 'vue';
  import { VReaction } from './components/VReaction';
  import type { Reaction, ReactionEmoji } from '@/types/homework';
  import { groupBy } from 'lodash';
  import useUser from '@/stores/user';
  import type { VReactionsProps } from '.';

  const props = withDefaults(defineProps<VReactionsProps>(), {
    hidePalette: false,
  });

  const emit = defineEmits<{
    add: [emoji: ReactionEmoji];
    remove: [reactionId: string];
  }>();

  const groupedReactions = computed(() => {
    return groupBy(props.reactions, (reaction) => reaction.emoji) as Record<
      ReactionEmoji,
      Reaction[]
    >;
  });

  const userStore = useUser();
</script>

<template>
  <TransitionGroup name="reaction">
    <VReaction
      :class="reactionsClasses"
      v-for="(reactions, emoji) in groupedReactions"
      :emoji="emoji"
      :userId="userStore.uuid"
      @add="(emoji) => emit('add', emoji)"
      @remove="(reactionId) => emit('remove', reactionId)"
      :reactions="reactions"
      :key="emoji"
      data-testid="reaction" />
  </TransitionGroup>
</template>

<style>
  .reaction-enter-active {
    transform-origin: left;
  }

  .reaction-leave-active {
    transform-origin: center;
  }

  .reaction-enter-active,
  .reaction-leave-active {
    transition: all 300ms ease;
  }
  .reaction-enter-from,
  .reaction-leave-to {
    opacity: 0;
    transform: scale(0);
  }
</style>
