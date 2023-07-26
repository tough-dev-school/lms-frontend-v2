<script lang="ts">
  export interface VReactionsProps {
    answerId: string;
    reactions: Reaction[];
    open?: boolean;
    disabled?: boolean;
  }
</script>

<script lang="ts" setup>
  import { computed, watch, ref } from 'vue';
  import { VReaction } from './components/VReaction';
  import type { Reaction, ReactionEmoji } from '@/types/homework';
  import { groupBy } from 'lodash';
  import useUser from '@/stores/user';
  import { ALLOWED_REACTIONS, MAX_REACTIONS } from '.';
  import { uuid } from '@/utils/uuid';

  const props = withDefaults(defineProps<VReactionsProps>(), {
    open: false,
    disabled: false,
  });

  const emit = defineEmits<{
    add: [emoji: ReactionEmoji, slug: string];
    remove: [reactionId: string];
    close: [];
  }>();

  const userStore = useUser();

  const localReactions = ref<Reaction[]>([]);

  watch(
    () => props.reactions,
    () => {
      localReactions.value = props.reactions;
    },
    { immediate: true },
  );

  const isDisabled = (reactions: Reaction[] | undefined) => {
    if (reactions === undefined) reactions = [];

    // Reaction that is set can't be disabled
    if (reactions.find((reaction) => reaction.author.uuid === userStore.uuid)) {
      return false;
    }

    const isUnderLimit =
      localReactions.value.filter(
        (reaction) => reaction.author.uuid === userStore.uuid,
      ).length < MAX_REACTIONS;

    if (isUnderLimit) return false;

    return true;
  };

  const groupedReactions = computed(() => {
    return groupBy(
      localReactions.value,
      (reaction) => reaction.emoji,
    ) as Record<ReactionEmoji, Reaction[]>;
  });

  const emojiSet = computed(() => {
    const sortReactions = (reactions: ReactionEmoji[]) =>
      reactions.sort(
        (a, b) => ALLOWED_REACTIONS.indexOf(a) - ALLOWED_REACTIONS.indexOf(b),
      );

    const EXISTING_REACTIONS = Object.keys(
      groupedReactions.value,
    ) as ReactionEmoji[];

    return sortReactions(
      !props.disabled && props.open ? ALLOWED_REACTIONS : EXISTING_REACTIONS,
    );
  });

  const optimisticallyAdd = (emoji: ReactionEmoji, slug: string) => {
    const reaction: Reaction = {
      slug,
      author: {
        uuid: userStore.uuid,
        firstName: userStore.firstName,
        lastName: userStore.lastName,
      },
      emoji,
      answer: props.answerId,
    };

    localReactions.value = [...localReactions.value, reaction];
  };

  const handleAdd = (emoji: ReactionEmoji) => {
    const slug = uuid();

    optimisticallyAdd(emoji, slug);
    emit('add', emoji, slug);
  };

  const optimisticallyRemove = (reactionId: string) => {
    localReactions.value = localReactions.value.filter(
      (reaction) => reaction.slug !== reactionId,
    );
  };

  const handleRemove = (reactionId: string) => {
    optimisticallyRemove(reactionId);
    emit('remove', reactionId);
  };
</script>

<template>
  <VReaction
    v-for="emoji in emojiSet"
    :key="emoji"
    :disabled="isDisabled(groupedReactions[emoji])"
    :emoji="emoji"
    :userId="userStore.uuid"
    :reactions="groupedReactions[emoji]"
    @add="handleAdd"
    @remove="handleRemove"
    data-testid="reaction" />
</template>
