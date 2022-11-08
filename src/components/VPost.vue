<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar.vue';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';

  defineProps({
    content: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: String, required: true },
  });
</script>

<template>
  <article>
    <div class="mb-16 flex items-center gap-8">
      <Avatar :first-name="firstName" :last-name="lastName" />
      <div class="font-bold">{{ getName(firstName, lastName) }}</div>
      <div class="text-gray">{{ relativeDate(date) }}</div>
    </div>
    <div v-html="content" class="prose" />
  </article>
</template>
