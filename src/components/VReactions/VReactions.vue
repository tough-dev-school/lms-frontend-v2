<script lang="ts">
  export interface VReactionsProps {
    answerId: string;
    disabled?: boolean;
    open?: boolean;
    reactions: Reaction[];
  }
</script>

<script lang="ts" setup>
  import type { Reaction, ReactionEmoji } from '@/types/homework';

  import useUser from '@/stores/user';
  import { groupBy } from 'lodash';
  import { computed } from 'vue';

  import { ALLOWED_REACTIONS } from '.';
  import { VReaction } from './components/VReaction';

  const props = withDefaults(defineProps<VReactionsProps>(), {
    disabled: false,
    open: false,
  });

  const emit = defineEmits<{
    add: [emoji: ReactionEmoji];
    close: [];
    remove: [reactionId: string];
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
    ) as ReactionEmoji[];

  const emojiSet = computed(() =>
    sortReactions(
      !props.disabled && props.open
        ? ALLOWED_REACTIONS
        : (Object.keys(groupedReactions.value) as ReactionEmoji[]),
    ),
  );

  const userStore = useUser();
</script>

<template>
  <VReaction
    v-for="emoji in emojiSet"
    :key="emoji"
    :disabled="disabled"
    :emoji="emoji"
    :userId="userStore.uuid"
    :reactions="groupedReactions[emoji]"
    @add="(emoji) => emit('add', emoji)"
    @remove="(reactionId) => emit('remove', reactionId)"
    data-testid="reaction" />
</template>
