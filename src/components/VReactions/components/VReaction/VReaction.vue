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
  <div class="emoji-button flex gap-16 rounded">
    <div class="flex h-40 w-40 items-center justify-center">
      {{ reaction.emoji }}
    </div>
    <div class="flex items-center pr-16">
      <abbr
        class="relative -mr-[16px] transition-all hover:z-50 hover:scale-125"
        v-for="author in reaction.authors"
        :key="author.uuid"
        :title="`${author.firstName} ${author.lastName}`">
        <VAvatar :userId="author.uuid" />
      </abbr>
    </div>
  </div>
</template>
