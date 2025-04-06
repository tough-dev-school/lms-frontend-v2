<script lang="ts">
  export interface VAnswerProps {
    answer: Answer;
  }
</script>

<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { relativeDate } from '@/utils/date';
  import getName from '@/utils/getName';
  import type { Answer } from '@/types/homework';
  import VCard from '@/components/VCard/VCard.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { onBeforeMount, ref } from 'vue';
  import VReactions from '@/components/VReactions/VReactions.vue';
  import type { ReactionEmoji } from '@/types/homework';
  import useHomework from '@/stores/homework';
  import { MoodHappyIcon } from 'vue-tabler-icons';
  import { useAutoAnimate } from '@formkit/auto-animate/vue';
  import { fetchUserQuery } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  const emit = defineEmits<{
    update: [];
    mounted: [slug: string]; //# FIXME Does nothing — needed to fix interface mismatch type error
  }>();

  const queryClient = useQueryClient();

  const homeworkStore = useHomework();
  const props = defineProps<VAnswerProps>();

  const isOwn = ref(false);

  const isPaletteOpen = ref(false);

  const addReaction = (emoji: ReactionEmoji, slug: string) => {
    homeworkStore.addReaction({ answerId: props.answer.slug, emoji, slug });
    emit('update');
  };

  const removeReaction = (reactionId: string) => {
    homeworkStore.removeReaction(props.answer.slug, reactionId);
    emit('update');
  };

  const togglePalette = () => (isPaletteOpen.value = !isPaletteOpen.value);
  const closePalette = () => (isPaletteOpen.value = false);

  const [parent] = useAutoAnimate();

  onBeforeMount(async () => {
    const yourUser = await fetchUserQuery(queryClient);

    isOwn.value = props.answer.author.uuid === yourUser.uuid;
  });
</script>

<template>
  <VCard class="pb-32">
    <div class="mb-16 flex items-center gap-8">
      <VAvatar data-testid="avatar" :user="answer.author" />
      <div>
        <div
          class="font-bold text-black dark:text-darkmode-white"
          data-testid="name">
          {{ getName(answer.author.firstName, answer.author.lastName) }}
          <span
            v-if="isOwn"
            class="h-16 rounded-8 bg-yellow px-4 text-sub font-normal text-white"
            data-testid="own-badge"
            >вы</span
          >
        </div>
        <div class="text-sub leading-tight text-gray" data-testid="date">
          {{ relativeDate(answer.created) }}
        </div>
      </div>
      <div class="flex-grow"></div>
      <slot name="header"></slot>
    </div>
    <VHtmlContent :content="answer.text" data-testid="content" />
    <div
      ref="parent"
      class="flex justify-start flex-wrap items-start gap-8 pt-16">
      <slot name="footer" />
      <button
        v-if="!isOwn"
        class="answer-action box-content flex items-center justify-center text-[1.5rem]"
        data-testid="open"
        @click="togglePalette">
        <MoodHappyIcon />
      </button>
      <VReactions
        :answer-id="answer.slug"
        :reactions="answer.reactions"
        :open="isPaletteOpen"
        :disabled="isOwn"
        @close="closePalette"
        @add="addReaction"
        @remove="removeReaction" />
    </div>
  </VCard>
</template>
