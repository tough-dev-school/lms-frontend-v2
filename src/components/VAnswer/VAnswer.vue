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
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { computed, ref } from 'vue';
  import useUser from '@/stores/user';
  import VReactions from '@/components/VReactions/VReactions.vue';
  import type { ReactionEmoji } from '@/types/homework';
  import useHomework from '@/stores/homework';
  import { MoodHappyIcon } from 'vue-tabler-icons';
  import { useAutoAnimate } from '@formkit/auto-animate/vue';
  import VButton from '@/components/VButton/VButton.vue';

  const emit = defineEmits<{
    update: [];
    mounted: [slug: string]; //# FIXME Does nothing — needed to fix interface mismatch type error
  }>();

  const homeworkStore = useHomework();
  const userStore = useUser();
  const props = defineProps<VAnswerProps>();

  const isOwn = computed(() => {
    return props.answer.author.uuid === userStore.uuid;
  });

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
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-8">
      <VAvatar
        data-testid="avatar"
        :user-id="answer.author.uuid"
        :image="answer.author.avatar" />
      <div>
        <div
          class="font-bold text-black dark:text-darkmode-white"
          :class="{ 'text-accent-orange': isOwn }"
          data-testid="name">
          {{ getName(answer.author.firstName, answer.author.lastName) }}
        </div>
      </div>
      <div class="flex-grow"></div>
      <slot name="header"></slot>
    </div>
    <VHtmlContent :content="answer.text" data-testid="content" />

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
          @add="addReaction"
          @remove="removeReaction" />
      </div>
      <div class="flex justify-start flex-wrap items-center gap-8">
        <slot name="footer" />
        <div class="text-sub leading-tight text-gray" data-testid="date">
          {{ relativeDate(answer.created) }}
        </div>
      </div>
    </div>
  </div>
</template>
