<script lang="ts" setup>
  import { VAvatar } from '@/components/VAvatar';

  defineProps<{
    reaction: {
      emoji: string;
      authors: { firstName: string; lastName: string; uuid: string }[];
    }[];
  }>();
</script>

<template>
  <div class="emoji-button flex items-center gap-16 rounded p-8 pr-16">
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