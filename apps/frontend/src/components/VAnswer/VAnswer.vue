<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { relativeDate } from '@/utils/date';
  import { getName } from '@/utils/getName';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { computed, ref } from 'vue';
  import VReactions from '@/components/VReactions/VReactions.vue';
  import { MoodHappyIcon } from 'vue-tabler-icons';
  import { useAutoAnimate } from '@formkit/auto-animate/vue';
  import VButton from '@/components/VButton/VButton.vue';
  import {
    useRemoveHomeworkReactionMutation,
    useAddHomeworkReactionMutation,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import type { AnswerTree, UserSafe } from '@/api/generated-api';

  const props = defineProps<{
    answer: AnswerTree;
    user: UserSafe;
  }>();

  const isOwn = computed(() => {
    return props.answer.author.uuid === props.user.uuid;
  });

  const isPaletteOpen = ref(false);

  const queryClient = useQueryClient();

  const { mutateAsync: sendAddReaction } =
    useAddHomeworkReactionMutation(queryClient);

  const { mutateAsync: sendRemoveReaction } =
    useRemoveHomeworkReactionMutation(queryClient);

  const togglePalette = () => (isPaletteOpen.value = !isPaletteOpen.value);
  const closePalette = () => (isPaletteOpen.value = false);

  const [parent] = useAutoAnimate();
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-8">
      <VAvatar
        data-testid="avatar"
        :user-id="answer.author.uuid"
        :image="answer.author.avatar ?? undefined" />
      <div>
        <div
          class="font-bold text-black dark:text-white"
          :class="{ VAnswer__Name_Own: isOwn }"
          data-testid="name">
          {{ getName(answer.author.first_name, answer.author.last_name) }}
        </div>
      </div>
      <div class="flex-grow" />
      <slot name="header" />
    </div>
    <VHtmlContent :content="answer.text" data-testid="content" />
    <div class="flex justify-start flex-wrap items-center gap-8">
      <slot name="footer" />
      <div class="text-sub leading-tight text-gray" data-testid="date">
        {{ relativeDate(answer.created) }}
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div
        v-if="!isOwn"
        ref="parent"
        class="flex justify-start flex-wrap items-start gap-8">
        <VButton
          appearance="secondary"
          size="inline"
          class="flex px-16 h-32 items-center justify-center text-[1.5rem]"
          data-testid="open"
          @click="togglePalette">
          <MoodHappyIcon />
        </VButton>
        <VReactions
          :answer-id="answer.slug"
          :reactions="answer.reactions"
          :open="isPaletteOpen"
          :disabled="isOwn"
          @close="closePalette"
          @add="
            (emoji) =>
              sendAddReaction({ answerId: answer.slug, reaction: emoji })
          "
          @remove="
            (reactionId) =>
              sendRemoveReaction({ answerId: answer.slug, reactionId })
          " />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .VAnswer__Name_Own {
    @apply text-accent-orange;
  }
</style>
