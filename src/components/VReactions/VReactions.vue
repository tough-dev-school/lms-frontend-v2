<script lang="ts" setup>
  import { computed } from 'vue';
  import { VReaction } from './components/VReaction';
  import type { Reaction, ReactionEmoji } from '@/types/homework';
  import { groupBy } from 'lodash';
  import useUser from '@/stores/user';
  import type { VReactionsProps } from '.';
  import { ALLOWED_REACTIONS } from '.';

  const props = withDefaults(defineProps<VReactionsProps>(), {
    palette: false,
  });

  const emit = defineEmits<{
    add: [emoji: ReactionEmoji];
    remove: [reactionId: string];
    close: [];
  }>();

  const groupedReactions = computed(() => {
    return groupBy(props.reactions, (reaction) => reaction.emoji) as Record<
      ReactionEmoji,
      Reaction[]
    >;
  });

  const sortReactions = (reactions: ReactionEmoji[]) =>
    reactions.sort(
      (a, b) => ALLOWED_REACTIONS.indexOf(a) - ALLOWED_REACTIONS.indexOf(b),
    );

  const emojiSet = computed(() =>
    sortReactions(
      props.palette ? ALLOWED_REACTIONS : Object.keys(groupedReactions.value),
    ),
  );

  const userStore = useUser();
</script>

<template>
  <TransitionGroup name="reaction">
    <VReaction
      v-for="emoji in emojiSet"
      :emoji="emoji"
      :userId="userStore.uuid"
      @add="(emoji) => emit('add', emoji)"
      @remove="(reactionId) => emit('remove', reactionId)"
      :reactions="groupedReactions[emoji]"
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
