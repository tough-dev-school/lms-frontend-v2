<script lang="ts" setup>
  import { computed } from 'vue';
  import { VReaction } from './components/VReaction';
  import { VReactionsPalette } from './components/VReactionsPalette';
  import type { Reaction, ReactionEmoji } from '@/types/homework';
  import useHomework from '@/stores/homework';
  import { groupBy } from 'lodash';
  import useUser from '@/stores/user';

  const homeworkStore = useHomework();

  interface Props {
    answerId: string;
    reactions: Reaction[];
  }

  const props = withDefaults(defineProps<Props>(), {
    reactions: () => [],
  });

  const emit = defineEmits<{
    update: [];
  }>();

  const groupedReactions = computed(() => {
    return groupBy(props.reactions, (reaction) => reaction.emoji) as Record<
      ReactionEmoji,
      Reaction[]
    >;
  });

  const addReaction = (emoji: ReactionEmoji) => {
    homeworkStore.addReaction(props.answerId, emoji);
    emit('update');
  };

  const removeReaction = (reactionId: string) => {
    homeworkStore.removeReaction(props.answerId, reactionId);
    emit('update');
  };

  const userStore = useUser();

  const usedReactions = computed(() => {
    return props.reactions
      .filter((reaction) => reaction.author.uuid === userStore.uuid)
      .map((reaction) => reaction.emoji as ReactionEmoji);
  });
</script>

<template>
  <TransitionGroup
    name="reaction"
    tag="ul"
    class="flex flex-wrap flex-row gap-8 text-[1.5rem]">
    <VReactionsPalette
      @click="addReaction"
      :usedReactions="usedReactions"
      data-testid="palette" />
    <VReaction
      v-for="(reactions, emoji) in groupedReactions"
      :emoji="emoji"
      :userId="userStore.uuid"
      @remove="removeReaction"
      @add="addReaction"
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
