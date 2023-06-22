<script lang="ts" setup>
  import { VAvatar } from '@/components/VAvatar';
  import type { Reaction } from '@/types/homework';
  import useUser from '@/stores/user';
  import { computed } from 'vue';
  import type { ReactionEmoji } from '../VReactionsPalette';

  const props = defineProps<{
    emoji: ReactionEmoji;
    reactions: Reaction[];
  }>();

  const userStore = useUser();

  const emit = defineEmits<{
    add: [reaction: ReactionEmoji];
    remove: [reactionId: string];
  }>();

  const ownReaction = computed(() => {
    return props.reactions.find(
      (reaction) => reaction.author.uuid === userStore.uuid,
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
        if (a.uuid === userStore.uuid) return -1;
        if (b.uuid === userStore.uuid) return 1;
        return 0;
      });
  });
</script>

<template>
  <div
    @click="handleClick"
    class="emoji-button inline-flex items-center gap-16 rounded p-8 pr-16 text-[1.5em]"
    :class="{
      '!bg-blue hover:!bg-blue-hover': ownReaction,
    }">
    <div class="flex h-32 w-32 items-center justify-center">
      {{ emoji }}
    </div>
    <div class="flex items-center pr-16">
      <abbr
        class="relative -mr-[20px] transition-all hover:z-50 hover:scale-125"
        v-for="author in orderedAuthors"
        :key="author.uuid"
        :title="`${author.firstName} ${author.lastName}`">
        <VAvatar :userId="author.uuid" />
      </abbr>
    </div>
  </div>
</template>
