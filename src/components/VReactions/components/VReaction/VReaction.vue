<script lang="ts" setup>
  import { VAvatar } from '@/components/VAvatar';
  import type { ReactionAuthor } from '@/components/VReactions';

  defineProps<{
    reaction: { emoji: string; authors: ReactionAuthor[] };
  }>();
</script>

<template>
  <div
    class="emoji-button inline-flex items-center gap-16 rounded p-8 pr-16 text-[1.5em]">
    <div class="flex h-32 w-32 items-center justify-center">
      {{ reaction.emoji }}
    </div>
    <div class="flex items-center pr-16">
      <abbr
        class="relative -mr-[20px] transition-all hover:z-50 hover:scale-125"
        v-for="author in reaction.authors"
        :key="author.uuid"
        :title="`${author.firstName} ${author.lastName}`">
        <VAvatar :userId="author.uuid" />
      </abbr>
    </div>
  </div>
</template>
