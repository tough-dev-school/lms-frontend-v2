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
  <div class="flex flex-wrap gap-16">
    <VReactionsPalette @click="addReaction" :usedReactions="usedReactions" />
    <TransitionGroup class="flex flex-wrap gap-16" name="reaction" tag="ul">
      <VReaction
        v-for="(reactions, emoji) in groupedReactions"
        :emoji="emoji"
        @remove="removeReaction"
        @add="addReaction"
        :reactions="reactions"
        :key="emoji" />
    </TransitionGroup>
  </div>
</template>

<style>
  .emoji-button {
    @apply box-content cursor-pointer bg-offwhite transition-colors hover:bg-lightgray disabled:hover:bg-offwhite disabled:opacity-50 disabled:cursor-not-allowed;
  }

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
