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
</script>

<template>
  <div
    @click="handleClick"
    class="emoji-button inline-flex items-center gap-16 rounded p-8 pr-16 text-[1.5em]">
    <div class="flex h-32 w-32 items-center justify-center">
      {{ emoji }}
    </div>
    <div class="flex items-center pr-16">
      <abbr
        class="relative -mr-[20px] transition-all hover:z-50 hover:scale-125"
        v-for="reaction in reactions"
        :key="reaction.slug"
        :title="`${reaction.author.firstName} ${reaction.author.lastName}`">
        <VAvatar :userId="reaction.author.uuid" />
      </abbr>
    </div>
  </div>
</template>
