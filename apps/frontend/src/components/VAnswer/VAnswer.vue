<script lang="ts" setup>
  import VAvatar from '@/components/VAvatar/VAvatar.vue';
  import { relativeDate } from '@/utils/date';
  import { getName } from '@/utils/getName';
  import VAnswerContent from '@/components/VAnswerContent/VAnswerContent.vue';
  import { computed, ref } from 'vue';
  import VReactions from '@/components/VReactions/VReactions.vue';
  import { IconMoodHappy } from '@tabler/icons-vue';
  import { useAutoAnimate } from '@formkit/auto-animate/vue';
  import VButton from '@/components/VButton/VButton.vue';
  import {
    useHomeworkAnswersReactionsDestroy,
    useHomeworkAnswersReactionsCreate,
    homeworkAnswersRetrieveQueryKey,
  } from '@/api/generated';
  import { useQueryClient } from '@tanstack/vue-query';
  import type { AnswerTree, UserSafe } from '@/api/generated';

  const props = defineProps<{
    answer: AnswerTree;
    user: UserSafe;
  }>();

  const isOwn = computed(() => {
    return props.answer.author.uuid === props.user.uuid;
  });

  const isPaletteOpen = ref(false);

  const queryClient = useQueryClient();

  const { mutateAsync: sendAddReaction } = useHomeworkAnswersReactionsCreate({
    mutation: {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: homeworkAnswersRetrieveQueryKey(variables.answer_slug),
        });
      },
    },
  });

  const { mutateAsync: sendRemoveReaction } =
    useHomeworkAnswersReactionsDestroy({
      mutation: {
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({
            queryKey: homeworkAnswersRetrieveQueryKey(variables.slug),
          });
        },
      },
    });

  const togglePalette = () => (isPaletteOpen.value = !isPaletteOpen.value);
  const closePalette = () => (isPaletteOpen.value = false);

  const [parent] = useAutoAnimate();
</script>

<template>
  <div
    data-testid="answer-container"
    class="flex flex-col gap-8 rounded-8 p-8 tablet:p-16"
    :class="
      answer.author.rank_label_color
        ? 'text-black dark:text-black'
        : 'text-black dark:text-white'
    "
    :style="{
      backgroundColor: answer.author.rank_label_color ?? 'transparent',
    }"
  >
    <div class="flex items-center gap-8">
      <VAvatar
        data-testid="avatar"
        :user-id="answer.author.uuid"
        :image="answer.author.avatar ?? undefined"
      />
      <div>
        <div
          class="font-bold"
          data-testid="name"
        >
          {{
            getName({
              firstName: answer.author.first_name,
              lastName: answer.author.last_name,
              randomName: answer.author.random_name,
            })
          }}
        </div>
      </div>
      <div class="flex-grow" />
      <slot name="header" />
    </div>
    <VAnswerContent
      :answer="answer"
      data-testid="content"
    />
    <div class="mt-8 flex flex-wrap items-center justify-start gap-8">
      <slot name="footer" />
      <div
        class="text-sub leading-tight opacity-70"
        data-testid="date"
      >
        {{ relativeDate(answer.created) }}
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div
        v-if="!isOwn"
        ref="parent"
        class="flex flex-wrap items-start justify-start gap-8"
      >
        <VButton
          appearance="secondary"
          size="inline"
          class="flex h-32 items-center justify-center px-16 text-[1.5rem]"
          data-testid="open"
          @click="togglePalette"
        >
          <IconMoodHappy />
        </VButton>
        <VReactions
          :answer-id="answer.slug"
          :reactions="answer.reactions"
          :open="isPaletteOpen"
          :disabled="isOwn"
          @close="closePalette"
          @add="
            (emoji) =>
              sendAddReaction({
                answer_slug: answer.slug,
                data: { emoji },
              })
          "
          @remove="
            (reactionId) =>
              sendRemoveReaction({ answer_slug: answer.slug, slug: reactionId })
          "
        />
      </div>
    </div>
  </div>
</template>
