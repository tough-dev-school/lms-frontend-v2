<script lang="ts">
  import type { Reaction, ReactionEmoji } from '@/types/homework';

  export interface VReactionProps {
    userId: string;
    emoji: ReactionEmoji;
    reactions?: Reaction[];
    disabled: boolean;
  }
</script>

<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { computed } from 'vue';
  import getName from '@/utils/getName';

  const props = withDefaults(defineProps<VReactionProps>(), {
    reactions: () => [],
  });

  const emit = defineEmits<{
    add: [reaction: ReactionEmoji];
    remove: [reactionId: string];
  }>();

  const ownReaction = computed(() => {
    return props.reactions.find(
      (reaction) => reaction.author.uuid === props.userId,
    );
  });

  const handleClick = () => {
    if (props.disabled) return;
    if (ownReaction.value) {
      emit('remove', ownReaction.value.slug);
    } else {
      emit('add', props.emoji);
    }
  };

  const orderedAuthors = computed(() => {
    return props.reactions
      .map((reaction) => reaction.author)
      .sort((a, b) => {
        if (a.uuid === props.userId) return 1;
        if (b.uuid === props.userId) return -1;
        return 0;
      });
  });
</script>

<template>
  <div
    class="answer-action-base flex-row inline-flex items-center gap-16 pl-8 pr-4 text-[1.25rem] min-w-[64px]"
    :class="{
      'answer-action-hover': !disabled,
      'cursor-not-allowed': disabled,
      '!border !border-gray dark:!border-darkmode-border': ownReaction,
    }"
    @click="handleClick">
    <div class="flex h-24 w-24 items-center justify-center" data-testid="emoji">
      {{ emoji }}
    </div>
    <div v-if="reactions.length > 0" class="flex items-center pr-16">
      <abbr
        v-for="author in orderedAuthors"
        :key="author.uuid"
        class="relative -mr-[12px] transition-all hover:z-50 hover:scale-125"
        data-testid="author"
        :title="getName(author.firstName, author.lastName)">
        <VAvatar
          class="!w-24 !h-24"
          :user-id="author.uuid"
          :image="author.avatar"
          data-testid="avatar" />
      </abbr>
    </div>
  </div>
</template>
