<script lang="ts" setup>
  import { VAvatar } from '@/components/VAvatar';
  import type { ReactionEmoji } from '@/types/homework';
  import { computed } from 'vue';
  import getName from '@/utils/getName';
  import type { VReactionProps } from '.';

  const props = defineProps<VReactionProps>();

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
    @click="handleClick"
    class="answer-action flex-row inline-flex items-center gap-16 pl-8 pr-4 text-[1.25rem]"
    :class="{
      '!border !border-gray': ownReaction,
    }">
    <div class="flex h-24 w-24 items-center justify-center" data-testid="emoji">
      {{ emoji }}
    </div>
    <div class="flex items-center pr-16">
      <abbr
        class="relative -mr-[12px] transition-all hover:z-50 hover:scale-125"
        v-for="author in orderedAuthors"
        :key="author.uuid"
        data-testid="author"
        :title="getName(author.firstName, author.lastName)">
        <VAvatar
          class="!w-24 !h-24"
          :userId="author.uuid"
          data-testid="avatar" />
      </abbr>
    </div>
  </div>
</template>
