<script lang="ts">
  import type { ReactionDetailed } from '@/api/generated-api';

  export enum ReactionEmoji {
    LIKE = '👍',
    DISLIKE = '👎',
    HAPPY = '😄',
    PARTY = '🎉',
    SAD = '😕',
    HEART = '❤️',
    ROCKET = '🚀',
    SEEN = '👀',
  }

  export interface VReactionsProps {
    answerId: string;
    reactions: ReactionDetailed[];
    open?: boolean;
    disabled?: boolean;
  }

  export const ALLOWED_REACTIONS = Object.values(ReactionEmoji);
  export const MAX_REACTIONS = 3;
</script>

<script lang="ts" setup>
  import { computed, watch, ref, onMounted } from 'vue';
  import VReaction from './components/VReaction/VReaction.vue';
  import { groupBy, debounce } from 'lodash-es';
  import { useUserQuery } from '@/query';
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

  const { data: user } = useUserQuery();

  const localReactions = ref<ReactionDetailed[]>([]);

  const actualizeReactions = () => (localReactions.value = props.reactions);
  const actualizeReactionsDebounced = debounce(actualizeReactions, 1500);

  watch(
    () => props.reactions,
    () => {
      actualizeReactionsDebounced();
    },
  );

  onMounted(() => {
    actualizeReactions();
  });

  const isDisabled = (reactions: ReactionDetailed[] | undefined) => {
    if (reactions === undefined) reactions = [];

    // Reaction that is set can't be disabled
    if (
      reactions.find((reaction) => reaction.author.uuid === user.value?.uuid)
    ) {
      return false;
    }

    const isUnderLimit =
      localReactions.value.filter(
        (reaction) => reaction.author.uuid === user.value?.uuid,
      ).length < MAX_REACTIONS;

    if (isUnderLimit) return false;

    return true;
  };

  const groupedReactions = computed(() => {
    return groupBy(localReactions.value, 'emoji') as Record<
      ReactionEmoji,
      ReactionDetailed[]
    >;
  });

  const handleAdd = (emoji: ReactionEmoji) => {
    emit('add', emoji, uuid());
  };

  const handleRemove = (reactionId: string) => {
    emit('remove', reactionId);
  };

  const handleClose = () => {
    emit('close');
  };
</script>

<template>
  <div class="flex flex-wrap items-start gap-8">
    <div v-if="open" class="flex flex-wrap items-start gap-8">
      <VReaction
        v-for="emoji in ALLOWED_REACTIONS"
        :key="emoji"
        :emoji="emoji"
        :user-id="user?.uuid ?? ''"
        :reactions="groupedReactions[emoji]"
        :disabled="isDisabled(groupedReactions[emoji])"
        @add="handleAdd"
        @remove="handleRemove" />
    </div>
    <div v-else class="flex flex-wrap items-start gap-8">
      <VReaction
        v-for="(reactions, emoji) in groupedReactions"
        :key="emoji"
        :emoji="emoji as ReactionEmoji"
        :user-id="user?.uuid ?? ''"
        :reactions="reactions"
        :disabled="isDisabled(reactions)"
        @add="handleAdd"
        @remove="handleRemove" />
    </div>
  </div>
</template>
